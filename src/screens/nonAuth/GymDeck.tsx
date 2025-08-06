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
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  const [exercises, setExercises] = useState(
    EXERCISES_DATA.map(item => ({ ...item, isSelected: false }))
  );
  const [currentPage, setCurrentPage] = useState(0);

  const handleSelectExercise = (id: string) => {
    setExercises(prevExercises => {
      const newExercises = prevExercises.map(exercise =>
        exercise.id === id
          ? { ...exercise, isSelected: !exercise.isSelected }
          : exercise
      );

      const toggledExercise = newExercises.find(ex => ex.id === id);
      const wasSelected = toggledExercise?.isSelected;
      const selectedCount = newExercises.filter(ex => ex.isSelected).length;
      const newTotalPages = Math.max(1, Math.ceil(selectedCount / 8));

      if (wasSelected) {

        const newPage = Math.floor((selectedCount - 1) / 8);
        setCurrentPage(newPage);
      } else {
        if (currentPage >= newTotalPages) {
          setCurrentPage(Math.max(0, newTotalPages - 1));
        }
      }

      return newExercises;
    });
  };

  const renderHeaderAndFilters = () => (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButtonText}>Cancel</Text>
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
            <Image source={filter.icon} style={styles.filterImage} resizeMode="contain" />
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
        <Image source={item.icon} style={styles.cardImage} resizeMode="contain" />
        <Text style={[styles.cardText, { color: textColor }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderPagination = () => {
    const selectedExercises = exercises.filter(ex => ex.isSelected);
    const totalSelectedCount = selectedExercises.length;
    const totalPages = Math.max(1, Math.ceil(totalSelectedCount / 8));

    const exercisesForPage = selectedExercises.slice(currentPage * 8, (currentPage + 1) * 8);

    const renderDotsRow = (startIndex: number) => {
      const dotsInRow = 4;
      return Array.from({ length: dotsInRow }, (_, index) => {
        const absoluteIndex = startIndex + index;
        const selectedIcon = exercisesForPage[absoluteIndex] ? exercisesForPage[absoluteIndex].icon : null;

        return (
          <View key={absoluteIndex} style={[styles.paginationItem, selectedIcon && styles.paginationItemSelected]}>
            {selectedIcon ? (
              <Image source={selectedIcon} style={styles.paginationDotImage} />
            ) : (
              <View style={styles.paginationDot} />
            )}
          </View>
        );
      });
    };

    const leftArrowActive = currentPage > 0;
    const rightArrowActive = currentPage < totalPages - 1;

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={!leftArrowActive}
        >
          <Text style={[styles.paginationArrow, leftArrowActive && styles.paginationArrowActive]}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.paginationGrid}>
          <View style={styles.paginationRow}>{renderDotsRow(0)}</View>
          <View style={styles.paginationRow}>{renderDotsRow(4)}</View>
        </View>

        <TouchableOpacity
          onPress={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
          disabled={!rightArrowActive}
        >
          <Text style={[styles.paginationArrow, rightArrowActive && styles.paginationArrowActive]}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {renderHeaderAndFilters()}
        <FlatList
          data={exercises}
          renderItem={renderExerciseCard}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
        />
        {renderPagination()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

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
    overflow: 'hidden',
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
    overflow: 'hidden',
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
  row: {
    justifyContent: 'space-between',
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
    paddingVertical: 50,
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    borderWidth: 1,
  },
  paginationGrid: {
    alignItems: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  paginationArrow: {
    fontSize: 24,
    color: '#D1D5DB',
    paddingHorizontal: 10,
  },
  paginationArrowActive: {
    color: '#4A4B4F',
  },
  paginationItem: {
    width: 56,
    height: 56,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationItemSelected: {
    backgroundColor: '#F0FFF9',
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  paginationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
  },
  paginationDotImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default GymDeck;