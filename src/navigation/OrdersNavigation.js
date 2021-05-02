import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


import {Orders,OrderShow} from '../views'

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
      initialRouteName={"Orders"}
    >
     <Stack.Screen name="Orders" component={Orders} />
     <Stack.Screen name="OrderShow" component={OrderShow} />
    </Stack.Navigator>
  );
}
