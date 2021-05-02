import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


/** Screens */
import BottomTapNavigation from './BottomTapNavigation'
import { AdShow,Category,Item,ItemsShow,Search,Checkout,CheckoutDone } from '../views'
import {InternalRegister,InternalLogin} from '../views/InternalAuth'

/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import { Animations } from '../constants'

// Basket Screen Call
import { BasketClass } from '../services'
import BottomSheet from '@gorhom/bottom-sheet';
import CheckoutWithBottom from '../views/Home/CheckoutWithBottom'


/** Render() */
export default function MainNavigation(props) {
  // variables
  const snapPoints = React.useMemo(() => [0, '90%'], []);
  return [
    <Stack.Navigator
      key={"Screens"}
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"BottomTapNavigation"}
    >
      <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
      <Stack.Screen name="AdShow" component={AdShow} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen name="ItemsShow" component={ItemsShow} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="CheckoutDone" component={CheckoutDone} />
      <Stack.Screen name="InternalRegister" component={InternalRegister} />
      <Stack.Screen name="InternalLogin" component={InternalLogin} />
    </Stack.Navigator>,
    <BottomSheet
      key={"BottomSheet"}
      ref={(ref) => BasketClass.setRef(ref)}
      index={0}
      snapPoints={snapPoints}
    >
      <CheckoutWithBottom />
    </BottomSheet>
  ];
}
