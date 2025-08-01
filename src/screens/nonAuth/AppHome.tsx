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

const AppHome: React.FC<HomeProps> = ({navigation}) => {

    const dispatch = useDispatch();

    return(
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:28,fontFamily:'Poppins-Medium'}}
            onPress={() => dispatch(setAuth(false))}
          >
            Hello World!
          </Text>
        </SafeAreaView>
      </SafeAreaProvider>  
    );
}


export default AppHome;