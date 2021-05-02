import React from "react";


// Views
import { Feather,MaterialCommunityIcons,Ionicons,Foundation } from "@expo/vector-icons";
import { Home,Wishlist,Settings } from "../views";
import OrdersNavigation from './OrdersNavigation'
import SettingsNavigation from './SettingsNavigation'

// Services
import { useTheme } from "@ui-kitten/components";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import {TranslationsMethods} from '../services'
// Stores
import { connect } from "react-redux";

const Tab = AnimatedTabBarNavigator();

let BottomTapNavigation = (props) => {
  let theme = useTheme();
  let { auth } = props.user;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === TranslationsMethods.ReturnBottomTitle("home")) {
            return (
              <Ionicons name={"ios-home-outline"} size={size} color={color} />
            )
          } 
          else if(route.name === TranslationsMethods.ReturnBottomTitle("MyOrders")) {
            return (
              <Ionicons name="reader-outline" size={size + 1} color={color}></Ionicons>
            )
          }else if(route.name === TranslationsMethods.ReturnBottomTitle("Wishlist")) {
            return (
              <Ionicons name="heart-outline" size={size + 3} color={color}></Ionicons>
            )
          }else if(route.name === TranslationsMethods.ReturnBottomTitle("Settings")) {
            return (
              <Ionicons name="person-outline" size={size + 1} color={color}></Ionicons>
            )
          }

          // You can return any component that you like here!
          return (
              <Feather name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: "gray",
        showLabel: false,
        
      }}
      appearance={{
        floating:true,
        activeTabBackgrounds:theme['color-info-500']
      }}
      initialRouteName={TranslationsMethods.ReturnBottomTitle("home")}
    >
      <Tab.Screen name={TranslationsMethods.ReturnBottomTitle("home")} component={Home} />
      <Tab.Screen name={TranslationsMethods.ReturnBottomTitle("MyOrders")} component={OrdersNavigation} />
      <Tab.Screen name={TranslationsMethods.ReturnBottomTitle("Wishlist")} component={Wishlist} />
      <Tab.Screen name={TranslationsMethods.ReturnBottomTitle("Settings")} component={SettingsNavigation} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomTapNavigation);
