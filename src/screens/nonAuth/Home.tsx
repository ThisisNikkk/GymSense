import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, StatusBar, TouchableOpacity, Image, TextInput, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppRoutes from "../../routes/RouteKeys/appRoutes";

interface HomeProps {
  navigation: any;
}

const bg = require('../../assets/avatarbg.png')
const template = require('../../assets/icons/Template.png')

const Home: React.FC<HomeProps> = ({navigation}) => {

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [name, setName] = useState('');


  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.parent}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
          hidden={false}
        />
        <Pressable style={styles.btn} onPress={() => dispatch(setAuth(false))}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <View style={styles.content}>
          <Image
            source={bg}
            style={styles.bg}
          />
        </View>
        <View style={styles.whiteContainer}>
          <View style={{ alignItems: 'center', marginVertical: 32 }}>
            <Text style={styles.avatarText}>Create your avatar</Text>
            <Text style={styles.avText}>Create your avatar and unlock new gear{'\n'} as you crush your workouts!</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Your nickname..."
                placeholderTextColor="#757575"
                value={name}
                onChangeText={setName}
              />
              <Image source={template} style={styles.inputIcon} />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: '#242528' }
              ]}
              onPress={ () => navigation.navigate(AppRoutes.Avatar,{name})}
            >
              <Text style={styles.buttonText}>Configure Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
    flex:0.6,
    alignItems: 'center',
  },
  bg: {
    height: 499,
    width: 375,
  },
  whiteContainer: {
    flex: 0.42,
    marginBottom: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 16,
    elevation: 5,
  },
  avatarText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    lineHeight: 32,
  },
  avText: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    fontWeight:300,
    lineHeight: 24,
    marginVertical: 10,
    paddingHorizontal: 24,
    textAlign: 'center'
  },
  inputWrapper: {
    position: 'relative',
    width: 350,
    height: 55,
    marginVertical: 12,
  },

  input: {
    borderRadius: 18,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: '100%',
    paddingLeft: 16,
    paddingRight: 45, // leave space for icon
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },

  inputIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  button: {
    width: 350,
    height: 55,
    borderRadius: 18,
    padding: 12,
    marginVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default Home;
