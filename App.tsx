import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import StartupScreen from "./src/screens/StartupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LighthouseScreen from "./src/screens/LighthouseScreen";
import RewardMarketScreen from "./src/screens/RewardMarketScreen";
import MainTabs from "./src/navigation/MainTabs";

export type RootStackParamList = {
  Startup: undefined;
  Login: undefined;
  Tabs: undefined;           // bottom tabs (Island is inside this)
  Lighthouse: undefined;
  RewardMarket: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={MainTabs} />
          <Stack.Screen name="Lighthouse" component={LighthouseScreen} />
          <Stack.Screen name="RewardMarket" component={RewardMarketScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
