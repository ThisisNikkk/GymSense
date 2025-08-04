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
} from "react-native";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";

const AppHome: React.FC = () => {
  const agenda = require("../../assets/icons/Agenda.png");
  const add = require("../../assets/icons/Add.png");
  const addd = require("../../assets/icons/Addd.png");
  const frame = require("../../assets/icons/Frame.png");
  const folder = require('../../assets/icons/Folder.png')

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.parent}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
          hidden={false}
        />
        {isModalVisible && (
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
          <TouchableOpacity style={styles.button}>
            <Image source={add} style={styles.btnImg} />
            <Text style={styles.btnText}>Start with a{"\n"} Blank Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Image source={frame} style={styles.btnImg} />
            <Text style={styles.btnText}>Start with a{"\n"} Gymdeck</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
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
              <Image source={folder} style={styles.modalImg}/>
              </Pressable>
              <Text style={styles.modalText}>Empty Gymdeck</Text>
              <Text style={styles.modalSubText}>Create your first template to organize{'\n'} your workouts!</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Image source={addd} style={styles.btnImg} />
                <Text style={styles.btnText}>Create{"\n"} Gymdeck</Text>
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
    marginVertical: 15,
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
    marginVertical: 10,
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
    justifyContent: "space-between",
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
    elevation:2,
    alignItems: "center",
  },
  modalText: {
    fontFamily:'Poppins-Regular',
    fontSize: 30,
    lineHeight:32,
    marginBottom: 16,
    fontWeight: "500",
    textAlign:'center',
    
  },
  modalImgView:{
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
  modalImg:{
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
    marginVertical:18,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalSubText:{
    fontFamily: "Poppins-Light",
    textAlign:'center',
    fontSize: 14,
    lineHeight: 24,
  },
});

export default AppHome;
