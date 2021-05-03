/**
 * Router.js
 * Call Navigation And Other Stuffs
 * Make By Ahmed Altommy
 * #Main Navigation Handler.
 */

import { Platform, SafeAreaView, View,LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { Animations } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";


// Navigation Screens
import {Loading} from './views' // App Loader
import MainNavigation from "./navigation/MainNavigation"; // Call Main Navigation after complete Intro or loading
import IntroNavigation from "./navigation/IntroNavigation"; // Intro with first time has open the app 

const Stack = createStackNavigator(); // Create the stack


LogBox.ignoreLogs(["Accessing the 'state' property of the 'route' object is not supported. If you want to get the focused route name, use the 'getFocusedRouteNameFromRoute' helper instead: https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state"]);
// Theme And Components
import { ApplicationProvider, IconRegistry, } from "@ui-kitten/components"; // UI Application Provider
import { EvaIconsPack } from "@ui-kitten/eva-icons"; // Icons Pack
import { default as mapping } from "./assets/theme/mapping.json"; // Register mapping -> Has FontFamily and other props
import { default as theme } from "./assets/theme/theme.json"; // There for the application
import * as eva from "@eva-design/eva"; //Design System
export default () => {

  
  let RouterComponents = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Animations.screenOptionsHome}
        initialRouteName={"Loading"}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
        <Stack.Screen name="IntroNavigation" component={IntroNavigation} />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
  return (
    <View style={{ flex: 1 }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping} >
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.os == "ios" ? 0 : 52 }}>
          <StatusBar style="inverted" backgroundColor={theme['color-info-500']} />
          <RouterComponents />
        </SafeAreaView>
      </ApplicationProvider>
    </View>
  );
};
