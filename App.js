/**
 * App JS 
 * Load All Assets Before Call any Screens
 * Make By Ahmed Altommy
 * #Main App Bootstrap.
 */

import * as SplashScreen from "expo-splash-screen";
import Root from './src/Root.js'
import { FontsLoader, LocaleLoader } from "./src/services";

import React from "react";


export default function App(props) {
  // Constants
  const [isLoadingComplete, setLoadingComplete] = React.useState(false); // Async Loading

  // Install
  let install = async () => {
    try {
      // Splash Screen
      await SplashScreen.preventAutoHideAsync();

      // Load Fonts
      await FontsLoader();

      // Locale Loader
      await LocaleLoader();

      // End
    } catch (error) {
      // On Error
      console.log(error);
    } finally {
      // When Complete
      await SplashScreen.hideAsync();
      setLoadingComplete(true);

    }
  };

  React.useEffect(() => {
    // Call Install Function
    install();
  }, []);

  // --------------- Return -------------- //

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Root />
    );
  }
}