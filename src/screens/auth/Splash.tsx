import React, { useEffect } from "react";
import { View, StyleSheet, Image, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../../routes/RouteKeys/appRoutes";

const Splash: React.FC = () => {
  const auth = useSelector((state: any) => state.userData.auth);
  const navigation: any = useNavigation();
  const bg = require('../../assets/bg.png');
  const logo = require('../../assets/splash-logo.png');
  const isAuth = useSelector((state: any) => state.userData.isAuth);

  useEffect(() => {
    setTimeout(() => {
      if (isAuth) {
        navigation.replace(AppRoutes.NonAuthStack);
      } else {
        navigation.replace(AppRoutes.Welcome);
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.parent}>
      <Image source={bg} style={styles.image} />
      <Image source={logo} style={styles.logo}/>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
  },
  image: {
    width: "100%",
    height:"100%",
    resizeMode: "contain",
    position:'absolute',
  },
  logo : {
    width:124,
    height:124,
    resizeMode:'contain',
  },
});
export default Splash;