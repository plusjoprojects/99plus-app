import React from "react";
import { ImageBackground, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message'

// Services
import { LocaleLoader, FontsLoader, apis, WishList } from "../../services";
import { StorageToken } from '../../constants'
import { translate } from "../../translations";
import styles from "./styles";

// Stores
import { connect } from "react-redux";
import { UserActions, ItemsActions, CategoriesActions } from "../../stores";

let Loading = (props) => {
    /**
     *
     * @checker {Checker is about check the things inside our app}
     * @installIndex {install index from server}
     */

    // Call When Start the app
    useFocusEffect(
        React.useCallback(() => {
            // Call Installer Method
            installer()
        }, [])
    );


    // on End The methods what ever is it from skip or register
    // Navigate to the main Navigation
    let End = () => {
        props.navigation.navigate("MainNavigation")
    }



    // Auth Check
    // Check if user has userToken or not.
    // And navigate to the main navigation or intro
    let AuthCheck = async () => {
        let userToken = await AsyncStorage.getItem(StorageToken.userToken)
        if (userToken) {
            let authSuccess = (res) => {
                props.setUser(res.user)
                props.setOrders(res.orders)
                props.setAddresses(res.addresses)
                End();
            }
            let authError = (err) => {
                console.log("Auth Error:", err);
                End();
            }

            let token = "Bearer " + userToken;
            apis.auth.auth(token, authSuccess, authError)
        } else {
            End();
        }
    }

    // global Checker
    let checker = async () => {
        let hasFirstTime = await AsyncStorage.getItem(StorageToken.firstTime)

        if (!hasFirstTime) {
            // If Not have first time 
            // navigate to intro
            props.navigation.navigate("IntroNavigation")
        } else {
            // Auth Check
            AuthCheck();
        }
    }


    // Install Index
    let installIndex = () => {
        // On success Load
        let onSuccess = async (res) => {
            props.setSelectForYouItemsFirst(res.selectForYouItemsFirst)
            props.setSelectForYouItemsSecond(res.selectForYouItemsSecond)
            props.setNewItems(res.newItems)
            props.setCategoriesWithItems(res.categoriesWithItems)
            props.setCategories(res.categories)
            props.setAds(res.ads)
            let wishlist = await WishList.IndexWishListItems();
            props.setWishListItems(wishlist)
            checker();
        }
        // On error
        let onError = (err) => {
            console.log("Install Index Error :", err)
            Toast.show({
                text1: translate("error"),
                text2: translate("network_error"),
                type: 'error',
                autoHide: false
            });
        }
        apis.main.index(onSuccess, onError)

    }

    let installer = async () => {
        await LocaleLoader();
        await FontsLoader();
        // After Load Locale Loader And Fonts Loader 
        // Call Install Index
        installIndex()
    };

    return (
        <ImageBackground
            style={styles.container}
            source={require("../../assets/backgrounds/loading.png")}
        >
            <View style={styles.pt30}>
                <Spinner status="basic" />
            </View>
        </ImageBackground>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (item) => dispatch(UserActions.setUser(item)),
        setSelectForYouItemsFirst: item => dispatch(ItemsActions.setSelectForYouItemsFirst(item)),
        setSelectForYouItemsSecond: item => dispatch(ItemsActions.setSelectForYouItemsSecond(item)),
        setNewItems: item => dispatch(ItemsActions.setNewItems(item)),
        setCategoriesWithItems: item => dispatch(ItemsActions.setCategoriesWithItems(item)),
        setCategories: item => dispatch(CategoriesActions.setCategories(item)),
        setWishListItems: item => dispatch(ItemsActions.setWishListItems(item)),
        setOrders: item => dispatch(UserActions.setOrders(item)),
        setAds: item => dispatch(ItemsActions.setAds(item)),
        setAddresses: item => dispatch(UserActions.setAddresses(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
