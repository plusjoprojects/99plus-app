import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


// Intros
import {Intro} from '../views'

/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function IntroNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"IntroMain"}
    >
     <Stack.Screen name="IntroMain" component={Intro.IntroMain} />
     <Stack.Screen name="IntroLogin" component={Intro.Login} />
     <Stack.Screen name="IntroRegister" component={Intro.Register} />
    </Stack.Navigator>
  );
}
