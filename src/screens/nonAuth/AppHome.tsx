import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import AppRoutes from "../../routes/RouteKeys/appRoutes";

interface HomeProps {
  navigation: any;
}

const AppHome: React.FC<HomeProps> = ({ navigation }) => {
  const agenda = require("../../assets/icons/Agenda.png");
  const add = require("../../assets/icons/Add.png");
  const addd = require("../../assets/icons/Addd.png");
  const frame = require("../../assets/icons/Frame.png");
  const folder = require('../../assets/icons/Folder.png');

  const dispatch = useDispatch();
  const [isGymdeckModalVisible, setIsGymdeckModalVisible] = useState(false);
  const [isBlankPlanModalVisible, setIsBlankPlanModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const exercises = [
    "Upright Row",
    "Reverse Wrist Curl",
    "Chest Supported Row",
    "Single Arm Lat Pulldown",
    "Machine Chest Press",
    "Pull-ups",
    "Arnold Press",
    "Clean Pull",
    "Shoulder Press",
    "Bicep Curl",
    "Tricep Extension",
    "Leg Press",
  ];

  const filteredExercises = exercises.filter(exercise =>
    exercise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openGymdeckModal = () => setIsGymdeckModalVisible(true);
  const closeGymdeckModal = () => setIsGymdeckModalVisible(false);

  const openBlankPlanModal = () => setIsBlankPlanModalVisible(true);
  const closeBlankPlanModal = () => setIsBlankPlanModalVisible(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.parent}>
        <StatusBar animated={true} backgroundColor="white" barStyle="dark-content" hidden={false} />

        {isGymdeckModalVisible && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        )}

        {isBlankPlanModalVisible && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        )}

        <View style={styles.TextContainer}>
          <Pressable style={styles.agendaImgView}>
            <Image source={agenda} style={styles.agendaImg} />
          </Pressable>
          <Text style={styles.textHome} onPress={() => dispatch(setAuth(false))}>
            No workout data
          </Text>
          <Text style={styles.textSubtext}>
            Start with a blank plan or template to track{"\n"} your performance!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openBlankPlanModal}>
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
              <Image source={add} style={styles.btnImg} />
              <Text style={styles.btnText}>Start with a{"\n"} Blank Plan</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={openGymdeckModal}>
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
              <Image source={frame} style={styles.btnImg} />
              <Text style={styles.btnText}>Start with a{"\n"} Gymdeck</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isGymdeckModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeGymdeckModal}
        >
          <View style={styles.modalContainer}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType='light'
              blurAmount={3}
              reducedTransparencyFallbackColor="white"
            />
            <View style={styles.modalContent}>
              <Pressable style={styles.modalImgView}>
                <Image source={folder} style={styles.modalImg} />
              </Pressable>
              <Text style={styles.modalText}>Empty Gymdeck</Text>
              <Text style={styles.modalSubText}>
                Create your first template to organize{'\n'} your workouts!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  closeGymdeckModal();
                  setTimeout(() => {
                    navigation.navigate(AppRoutes.GymDeck);
                  }, 1000);
                }}
                style={styles.closeButton}
              >
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                  <Image source={addd} style={styles.btnImg} />
                  <Text style={styles.btnText}>Create{"\n"} Gymdeck</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isBlankPlanModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeBlankPlanModal}
        >
          <View style={styles.modalContainer}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType='light'
              blurAmount={3}
              reducedTransparencyFallbackColor="white"
            />
            <View style={styles.blankPlanModalContent}>
              <Text style={styles.blankPlanModalHeading}>Select Exercise</Text>
              <TextInput
                style={styles.searchBar}
                placeholder="Search exercises..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <FlatList
                data={filteredExercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.exerciseItem} onPress={closeBlankPlanModal}>
                    <View>
                      <Text style={styles.exerciseText}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                style={styles.exerciseList}
              />
              <TouchableOpacity onPress={closeBlankPlanModal} style={styles.closeBlankPlanModalButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
  },
  TextContainer: {
    flex: 1,
    justifyContent: "center",
    top: 50,
  },
  agendaImgView: {
    height: 64,
    width: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  agendaImg: {
    height: 32,
    width: 32,
    alignSelf: "center",
  },
  textHome: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 12,
  },
  textSubtext: {
    fontFamily: "Poppins-Light",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 28,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  button: {
    width: 160,
    height: 130,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderColor: "#DBDBDB",
  },
  btnImg: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  btnText: {
    fontFamily: "Poppins-Light",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "300",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 2,
    alignItems: "center",
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
    lineHeight: 32,
    marginBottom: 16,
    fontWeight: "500",
    textAlign: 'center',
  },
  modalImgView: {
    height: 64,
    width: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#F2F2F2",
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 15,
  },
  modalImg: {
    height: 32,
    width: 32,
    alignSelf: "center",
  },
  closeButton: {
    width: 160,
    height: 130,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderColor: "#DBDBDB",
    marginVertical: 18,
  },
  closeButtonText: {
    fontFamily:'Poppins-Medium',
    color: "#000",
  },
  modalSubText: {
    fontFamily: "Poppins-Light",
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
  },
  blankPlanModalContent: {
    width: "100%",
    height: "100%",
    paddingHorizontal:10,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 2,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  blankPlanModalHeading: {
    fontFamily: "Poppins-Regular",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
  },
  searchBar: {
    width: "95%",
    height: 50,
    borderColor: "#DBDBDB",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
  exerciseList: {
    width: "95%",
    flex: 1,
  },
  exerciseItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    width: '100%',
  },
  exerciseText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333",
  },
  closeBlankPlanModalButton: {
    marginTop:20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
});

export default AppHome;
