/**
 * Register Toast and Stores And Routers Section
 * Make By Ahmed Altommy
 * #Main App Bootstrap.
 */

import * as SplashScreen from "expo-splash-screen";

import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';

import { Provider } from "react-redux";
import React from "react";
import Router from "./Router";
import store from "./stores/store";

export default function Root(props) {
    return (
      <Provider store={store} style={styles.container}>
        <Router />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
}

// ---------- Styles --------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});