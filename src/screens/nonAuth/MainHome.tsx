import React from 'react'; 
import { View, Text, StyleSheet, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface ExerciseSet {
  weight: string;
  reps: string;
}

interface ExerciseData {
  exerciseName: string;
  sets: ExerciseSet[];
}

interface MainHomeRouteParams {
  exerciseData?: ExerciseData;
}

const MainHome: React.FC = () => {
  const route = useRoute();
  const { exerciseData } = route.params as MainHomeRouteParams;

  return (
    <SafeAreaView style={mainHomeStyles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
      />
      {exerciseData ? (
        <View style={mainHomeStyles.exerciseCard}>
          <Text style={mainHomeStyles.exerciseName}>{exerciseData.exerciseName}</Text>
          <FlatList
            data={exerciseData.sets}
            keyExtractor={(item, index) => `set-${index}-${item.weight}-${item.reps}`}
            renderItem={({ item, index }) => (
              <View style={mainHomeStyles.setTextContainer}>
                <Text style={mainHomeStyles.setTextValue}>
                  {item.weight} lbs
                </Text>
                <Text style={mainHomeStyles.setTextValue}>
                  {item.reps}r
                </Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={mainHomeStyles.noSetsText}>No sets entered for this exercise.</Text>
            )}
            contentContainerStyle={mainHomeStyles.flatListContent}
          />
        </View>
      ) : (
        <Text style={mainHomeStyles.noDataText}>No exercise data received yet. Go back and add a plan!</Text>
      )}
    </SafeAreaView>
  );
};

const mainHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 24, // Adjust size as needed for actual icon
    marginRight: 10,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    fontSize: 24, // Adjust size as needed for actual icons
  },
  exerciseCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  exerciseName: {
    fontFamily: "Poppins-Medium",
    fontSize: 20, // Adjusted font size
    fontWeight: '600',
    marginBottom: 10, // Reduced margin
    color: '#333',
    textAlign: 'left', // Aligned left as in image
  },
  setTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'center',
    paddingVertical: 2, // Reduced padding
  },
  setTextValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: '#333',
    fontWeight: '400', // Adjusted weight
    marginRight: 20, // Space between weight and reps
  },
  noSetsText: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  noDataText: {
    fontFamily: "Poppins-Light",
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  flatListContent: {
    paddingLeft: 10, // Indent sets slightly
  }
});

export default MainHome;
