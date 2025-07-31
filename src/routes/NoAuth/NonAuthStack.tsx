import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/nonAuth/Home";
import Avatar from "../../screens/nonAuth/Avatar"
import WelcomeApp from "../../screens/nonAuth/WelcomeApp";
import AppRoutes from "../RouteKeys/appRoutes";

export default function NonAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Home} component={Home} />
      <Stack.Screen name={AppRoutes.Avatar} component={Avatar}/>
      <Stack.Screen name={AppRoutes.WelcomeApp} component={WelcomeApp}/>
    </Stack.Navigator>
  );
}
