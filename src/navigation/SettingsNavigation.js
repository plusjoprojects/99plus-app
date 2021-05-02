import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


import {SettingsMain,Addresses} from '../views/Settings'

/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function OrdersNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"SettingsMain"}
    >
     <Stack.Screen name="SettingsMain" component={SettingsMain} />
     <Stack.Screen name="Addresses" component={Addresses} />
    </Stack.Navigator>
  );
}
