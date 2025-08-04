import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/nonAuth/Home";
import Avatar from "../../screens/nonAuth/Avatar"
import WelcomeApp from "../../screens/nonAuth/WelcomeApp";
import AppHome from "../../screens/nonAuth/AppHome";
import Tabs from "../../navigation/Tab";
import AppRoutes from "../RouteKeys/appRoutes";
import GymDeck from "../../screens/nonAuth/GymDeck";

export default function NonAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Home} component={Home} />
      <Stack.Screen name={AppRoutes.Avatar} component={Avatar} />
      <Stack.Screen name={AppRoutes.WelcomeApp} component={WelcomeApp} />
      <Stack.Screen name={AppRoutes.GymDeck} component={GymDeck} />
      <Stack.Screen name={AppRoutes.Tabs} component={Tabs} />

    </Stack.Navigator>
  );
}
