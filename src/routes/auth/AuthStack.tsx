import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../../screens/auth/Splash";
import Welcome from "../../screens/auth/Welcome";
import SignUp from "../../screens/auth/SignUp";
import Login from "../../screens/auth/Login";
import AppRoutes from "../RouteKeys/appRoutes";

export default function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Splash} component={Splash} />
      <Stack.Screen name={AppRoutes.Welcome} component={Welcome} />
      <Stack.Screen name={AppRoutes.SignUp} component={SignUp} />
      <Stack.Screen name={AppRoutes.Login} component={Login} />
    </Stack.Navigator>
  );
}
