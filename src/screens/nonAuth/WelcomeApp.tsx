import { useRoute, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppRoutes from "../../routes/RouteKeys/appRoutes";

// Image imports
const bg = require('../../assets/avatarbg.png');
const male = require('../../assets/male.png');
const female = require('../../assets/female.png');

interface HomeProps {
  navigation: any;
}

const WelcomeApp: React.FC<HomeProps> = ({ navigation }) => {
  const route = useRoute();
  const { name, avatar } = route.params as { name: string, avatar: any };
  console.log(name)
  const { colors } = useTheme();
  const dispatch = useDispatch();

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.parent}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
          hidden={false}
        />

        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Back</Text>
        </Pressable>

        <View style={styles.content}>
          <Image
            source={avatar}
            style={styles.bg}
            resizeMode="contain"
          />
        </View>

        <View style={styles.whiteContainer}>
          <View style={{marginVertical: 32 , alignItems:'center'}}>
            <Text style={styles.avatarText}>Welcome to {'\n'}
                GymSense,{name}
            </Text>
            <Text style={styles.avText}>
              Start your fitness journey with us! Celebrate{'\n'}
              and share every gain.
            </Text>


            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#242528' }]}
            >
              <Text style={styles.buttonText}>Continue to App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#DBFFF0',
  },
  btn: {
    position: 'absolute',
    paddingTop: 48,
    paddingHorizontal: 25,
    zIndex: 10,
  },
  cancelText: {
    fontFamily: "Poppins-Medium",
    color: '#757575',
    fontSize: 14,
    lineHeight: 24,
  },
  content: {
    flex: 0.7,
    alignItems: 'center',
  },
  bg: {
    height: 499,
    width: 375,
  },
  whiteContainer: {
    flex: 0.44,
    marginBottom: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 16,
    elevation: 5,
    paddingVertical:20,
  },
  avatarText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    lineHeight: 32,
    textAlign:'center'
  },
  avText: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 24,
    marginVertical: 15,
    textAlign: 'center',
  },
  avatarSelectionButton: {
    flexDirection: 'row',
    gap: 50,
  },
  selectorbutton: {
    width: 150,
    height: 55,
    borderRadius: 18,
    padding: 12,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 350,
    height: 55,
    borderRadius: 18,
    padding: 12,
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default WelcomeApp;
