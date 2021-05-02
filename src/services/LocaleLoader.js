/** LocaleLoader */

import React from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { setI18nConfig, SetFirstTime } from '../translations';

// Constants
import {StorageToken} from '../constants'

//
import store from '../stores/store'
import {SettingsActions} from '../stores'

let setLocale = item => store.dispatch(SettingsActions.setLocale(item))
async function LocaleLoader() {

        /* Load Locale and translation from storage  */
        const locale = await AsyncStorage.getItem(StorageToken.localeToken);
        // Check If the first time is load
        if (!locale) {
            // Set it to english if the first time
            SetFirstTime("ar", true);
            setLocale({lang:"ar",rtl:true})
        } else {
            if (locale == "en") {
                await SetFirstTime("en", false);
                setLocale({lang:"en",rtl:false})
            } else if (locale == "ar") {
               await setI18nConfig("ar", true);
               setLocale({lang:"ar",rtl:true})
            }
        }

        return 'Done';
}

export default LocaleLoader;