import React, { FC, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

// --- IMPORT YOUR LOCAL IMAGE ASSETS ---
const img1 = require('../../assets/icons/1.png');
const img2 = require('../../assets/icons/2.png');
const img3 = require('../../assets/icons/3.png');
const img4 = require('../../assets/icons/4.png');
const img5 = require('../../assets/icons/5.png');
const img6 = require('../../assets/icons/6.png');
const img7 = require('../../assets/icons/7.png');
const img8 = require('../../assets/icons/8.png');
const dumbbell = require('../../assets/icons/Dumbell.png');
const search = require('../../assets/icons/Search.png');

// --- MOCK DATA FOR THE APP ---
const EXERCISES_DATA = [
  { id: '1', name: 'Upright Row', icon: img1 },
  { id: '2', name: 'Reverse Wrist Curl', icon: img2 },
  { id: '3', name: 'Chest Supported Row', icon: img3 },
  { id: '4', name: 'Single Arm Lat Pulldown', icon: img4 },
  { id: '5', name: 'Machine Chest Press', icon: img5 },
  { id: '6', name: 'Pull-ups', icon: img6 },
  { id: '7', name: 'Arnold Press', icon: img7 },
  { id: '8', name: 'Clean Pull', icon: img8 },
  { id: '9', name: 'Shoulder Press', icon: img3 },
  { id: '10', name: 'Bicep Curl', icon: img5 },
  { id: '11', name: 'Tricep Extension', icon: img7 },
  { id: '12', name: 'Leg Press', icon: img2 },
];

const FILTER_ICONS = [
  { id: 'search', icon: search },
  { id: 'dumbbell', icon: dumbbell },
  { id: 'barbell', icon: dumbbell },
  { id: 'machine', icon: dumbbell },
  { id: 'bodyweight', icon: dumbbell },
  { id: 'cables1', icon: dumbbell },
  { id: 'cables2', icon: dumbbell },
  { id: 'cables3', icon: dumbbell },
];

interface GymDeckProps {
  navigation: any;
}

const GymDeck: FC<GymDeckProps> = ({ navigation }) => {
  // State to manage the exercises and their selection status.
  const [exercises, setExercises] = useState(
    EXERCISES_DATA.map(item => ({ ...item, isSelected: false }))
  );
  // State to manage the current page number for the pagination component.
  const [currentPage, setCurrentPage] = useState(48);
  const totalPages = 93;

  // Function to toggle the selection state of an exercise card.
  const handleSelectExercise = (id: string) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === id
          ? { ...exercise, isSelected: !exercise.isSelected }
          : exercise
      )
    );
  };

  // --- RENDER FUNCTIONS ---

  // Combines the top navigation and the filter bar into a single component.
  const renderHeaderAndFilters = () => (
    <View>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Cancel pressed')}>
          <Text style={styles.headerButtonText} onPress={() => navigation.goBack()}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Exercises</Text>
        <TouchableOpacity onPress={() => console.log('Next pressed')}>
          <Text style={[styles.headerButtonText, styles.nextButtonText]}>Next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Image source={search} style={styles.searchIcon} resizeMode="contain" />
        </TouchableOpacity>
        {FILTER_ICONS.slice(1).map(filter => (
          <TouchableOpacity key={filter.id} style={styles.filterButton}>
            {typeof filter.icon === 'number' ? (
              <Image source={filter.icon} style={styles.filterImage} resizeMode="contain" />
            ) : (
              <Text style={styles.filterIconText}>{filter.icon}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderExerciseCard = ({ item }: { item: any }) => {
    const cardStyle = item.isSelected ? styles.selectedCard : styles.card;
    const textColor = item.isSelected ? '#050505' : '#000';

    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={() => handleSelectExercise(item.id)}
      >
        {typeof item.icon === 'number' ? (
          <Image source={item.icon} style={styles.cardImage} resizeMode="contain" />
        ) : (
          <Text style={styles.cardIconText}>{item.icon}</Text>
        )}
        <Text style={[styles.cardText, { color: textColor }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderPagination = () => {
    const selectedExercises = exercises.filter(e => e.isSelected);
    const totalSlots = 8;
    const paginationGridData = selectedExercises
      .concat(Array(Math.max(0, totalSlots - selectedExercises.length)).fill(null));

    const renderDotsRow = () => (
      <View style={styles.dotsRow}>
        {[...Array(4)].map((_, index) => (
          <View key={`dot-${index}`} style={styles.dot} />
        ))}
      </View>
    );

    const renderGridItem = ({ item }: { item: any }) => {
      if (item) {
        return (
          <View style={styles.selectedIconWrapper}>
            {typeof item.icon === 'number' ? (
              <Image source={item.icon} style={styles.selectedIconImage} resizeMode="contain" />
            ) : (
              <Text style={styles.selectedIconText}>{item.icon}</Text>
            )}
          </View>
        );
      }
      return null;
    };

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}>
          <Text style={styles.paginationIcon}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.paginationCenterContainer}>
          <FlatList
            data={paginationGridData}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => item?.id || `dot-${index}`}
            numColumns={4}
            contentContainerStyle={styles.paginationGrid}
            scrollEnabled={false} 
          />
          {selectedExercises.length === 0 && (
            <View style={styles.dotsOverlay}>
              {renderDotsRow()}
              {renderDotsRow()}
            </View>
          )}
        </View>

        <TouchableOpacity onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
          <Text style={styles.paginationIcon}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // --- MAIN RENDER LOGIC ---
  return (
    <SafeAreaView style={styles.container}>
      {renderHeaderAndFilters()}
      <FlatList
        data={exercises}
        renderItem={renderExerciseCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      {renderPagination()}
    </SafeAreaView>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#4A4B4F',
    fontSize: 14,
  },
  nextButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#00804A',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 13,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    flexDirection: 'row',
  },
  searchBar: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  filterImage: {
    width: 24,
    height: 24,
  },
  filterIconText: {
    fontSize: 24,
  },
  listContainer: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  selectedCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#F0FFF9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A4B4F',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  cardImage: {
    width: 40,
    height: 40,
  },
  cardIconText: {
    fontSize: 40,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 18,
  },
  paginationCenterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  paginationGrid: {
    height: 170,
    justifyContent: 'center',
  },
  selectedIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B5FFD6',
    backgroundColor: '#F0FFF9',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  selectedIconImage: {
    width: 32,
    height: 32,
  },
  selectedIconText: {
    fontSize: 32,
  },
  paginationIcon: {
    fontSize: 30,
    color: '#050505',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E6E6E6',
    margin: 4,
  },
  dotsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent:'space-around'
  },
});

export default GymDeck;
