import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect} from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { LocalizationContext } from "../../localization/localization";
import { setAuth } from "../../redux/Reducers/userData";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import AppUtils from "../../utils/appUtils";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Welcome: React.FC = () => {
  const { colors } = useTheme();
  const { localization } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const logo = require('../../assets/logo.png')
  const googleLogo = require('../../assets/icons/Google.png')
  const appleLogo = require('../../assets/icons/Apple.png')

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.parent}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.welcomeText}> Log in or sign up</Text>
          <Text style={styles.emailText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email..."
            placeholderTextColor='#757575'
          >  
          </TextInput>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity style={styles.googleButton}>
            <Image source={googleLogo} style={styles.buttonlogo} />
            <Text style={{color:'#050505', fontSize:15, fontFamily:'Poppins-Medium',textAlign:'center', alignSelf:'center', lineHeight:25, right:15,}}>
              Continue with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appleButton}>
            <Image source={appleLogo} style={styles.buttonlogo}/>
            <Text style={{color:'#050505',fontSize:15, fontFamily:'Poppins-Medium', textAlign:'center', alignSelf:'center', lineHeight:25, right:15}}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  parent:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  logo:{
    height:124,
    width:124,
  },
  welcomeText:{
    fontSize:28,
    fontFamily:'Poppins-Regular',
  },
  emailText:{
    fontFamily:'Poppins-Light',
    alignSelf:'flex-start',
    fontSize:14,
    marginVertical:10,
  },
  input:{
    borderRadius:15,
    borderColor:'#DBDBDB',
    borderWidth:1,
    width:'100%',
    height:55,
    padding:12,
    fontFamily:'Poppins-Regular',
  },
  button:{
    backgroundColor:'#DBDBDB',
    width:'100%',
    height:55,
    borderRadius:15,
    padding:12,
    marginVertical:24,
  },
  buttonText :{
    fontSize:15,
    fontFamily:'Poppins-Medium',
    lineHeight:30,
    color:'#FFFFFF',
    textAlign:'center',
    alignSelf:'center',
  },
  orText:{
    fontFamily:'Poppins-Light',
    fontSize:14,
    lineHeight:30,
  },
  googleButton:{
    borderColor:'#DBDBDB',
    borderWidth:1,
    width:'100%',
    height:55,
    borderRadius:15,
    padding:12,
    marginVertical:24,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  appleButton:{
    borderColor:'#DBDBDB',
    borderWidth:1,
    width:'100%',
    height:55,
    borderRadius:15,
    padding:12,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  buttonlogo:{
    height:24,
    width:24,
    alignSelf:'center',
    left:23,
  },
});
export default Welcome;
