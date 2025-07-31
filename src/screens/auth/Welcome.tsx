import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import AppRoutes from "../../routes/RouteKeys/appRoutes";

const Welcome: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const logo = require('../../assets/logo.png');
  const googleLogo = require('../../assets/icons/Google.png');
  const appleLogo = require('../../assets/icons/Apple.png');

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleSelected, setIsGoogleSelected] = useState(false);
  const [isAppleSelected, setIsAppleSelected] = useState(false);
  const isEmailInputFilled = email.length > 0;

  const handleContinue = async () => {
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Please Enter A Email Address.');
      return;
    }

    try {
      const methods = await auth().fetchSignInMethodsForEmail(email);
      if (methods && methods.length > 0) {
        navigation.navigate(AppRoutes.Login, { email });
      } else {
        navigation.navigate(AppRoutes.SignUp, { email });
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('The Email Address Is Not Valid.');
      } else {
        setErrorMessage('An Error Cccurred. Please Try Again.');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
          hidden={false}
        />
        <View style={styles.parent}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcomeText}> Log in or sign up</Text>
          <Text style={styles.emailText}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: errorMessage ? '#DF3A3A' : (isEmailInputFilled ? '#757575' : '#DBDBDB') }
            ]}
            placeholder="Your email..."
            placeholderTextColor='#757575'
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            style={[styles.button,
              { backgroundColor: isEmailInputFilled ? '#242528' : '#DBDBDB' }
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={[
              styles.googleButton,
              { borderColor: isGoogleSelected ? '#757575' : '#DBDBDB' }
            ]}
            onPress={() => setIsGoogleSelected(!isGoogleSelected)}
          >
            <Image source={googleLogo} style={styles.buttonlogo} />
            <Text style={{
              color: '#050505',
              fontSize: 15,
              fontFamily: 'Poppins-Medium',
              textAlign: 'center',
              alignSelf: 'center',
              lineHeight: 25,
              right: 15,
            }}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.appleButton,
              { borderColor: isAppleSelected ? '#757575' : '#DBDBDB' }
            ]}
            onPress={() => setIsAppleSelected(!isAppleSelected)}
          >
            <Image source={appleLogo} style={styles.buttonlogo} />
            <Text style={{
              color: '#050505',
              fontSize: 15,
              fontFamily: 'Poppins-Medium',
              textAlign: 'center',
              alignSelf: 'center',
              lineHeight: 25,
              right: 15,
            }}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  logo: {
    height: 124,
    width: 124,
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Poppins-Regular',
    lineHeight: 35,
  },
  emailText: {
    fontFamily: 'Poppins-Light',
    alignSelf: 'flex-start',
    fontSize: 14,
    lineHeight: 24,
    marginVertical: 10,
  },
  input: {
    borderRadius: 15,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: 55,
    padding: 12,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 15,
    padding: 12,
    marginVertical: 22,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  orText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    lineHeight: 30,
  },
  googleButton: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: 55,
    borderRadius: 15,
    padding: 12,
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  appleButton: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: 55,
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonlogo: {
    height: 24,
    width: 24,
    alignSelf: 'center',
    left: 23,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});

export default Welcome;
