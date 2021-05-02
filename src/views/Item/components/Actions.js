import React from "react";

// Views
import { View, StyleSheet, Animated } from "react-native";
import { Text, useTheme, Button } from "@ui-kitten/components";
import Toast from "react-native-toast-message";

// Services
import { colors } from "../../../constants";
import { Basket, TranslationsMethods } from "../../../services";
import { useFocusEffect } from '@react-navigation/native';
import { translate } from '../../../translations'


// Stores 
import { connect } from 'react-redux';


let Actions = ({ data }) => {

    // Global Props
    let theme = useTheme();

    let animatedAddButton = React.useRef(new Animated.Value(1)).current


    let [added, setAdded] = React.useState(false)
    let [qty, setQty] = React.useState(1)

    // Check is item in basket
    let installBasketChecker = async () => {
        let item = await Basket.CheckItemInBasket(data.ID)
        if (item) {
            setAdded(true)
            setQty(item.qty)
        }
    }
    // Add Item To Basket
    let AddToBasket = () => {
        Toast.show({
            text1: translate("success"),
            text2: translate("item.added_success"),
            type: 'success',
            visibilityTime: 500,
            position: 'bottom'
        })
        Basket.AddToBasket(data, 1)
    }
    // Add Locale Function
    let TryAnimated = () => {
        AddToBasket()
        Animated.timing(animatedAddButton, {
            toValue: 0, duration: 300, useNativeDriver: true
        }).start()
        setTimeout(() => {
            setAdded(true)
            Animated.timing(animatedAddButton, {
                toValue: 1, duration: 300, useNativeDriver: true
            }).start()
        }, 300);
    }

    // Add Locale Function
    let BackAnimation = () => {
        Basket.RemoveItemFromBasket(data.ID)
        Animated.timing(animatedAddButton, {
            toValue: 0, duration: 300, useNativeDriver: true
        }).start()
        setTimeout(() => {
            setAdded(false)
            Animated.timing(animatedAddButton, {
                toValue: 1, duration: 300, useNativeDriver: true
            }).start()
        }, 300);
    }



    useFocusEffect(
        React.useCallback(() => {
            installBasketChecker();
        }, [])
    );

    let ChangeQtyLocal = (type) => {
        if (type == "+") {
            if (data.storagesItems.qty > qty) {
                setQty(qty + 1)
                Basket.ChangeQty(data.ID, "+")
            }
        } else {
            if (qty !== 1) {
                setQty(qty - 1)
                Basket.ChangeQty(data.ID, "-")
            } else {
                BackAnimation()
            }
        }
    }

    let ActionButtons = () => {
        return (
            <Animated.View style={{ paddingTop: '4%', transform: [{ scaleX: animatedAddButton }] }}>
                {added &&
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Button onPress={() => { ChangeQtyLocal("+") }} status="info" style={{ borderRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 18, color: theme['color-success-700'], fontFamily: 'CairoBold' }}>+</Text>}</Button>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Button  status="info" style={{borderRadius: 0, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 18, color: theme['color-info-400'], fontFamily: 'CairoBold' }}>{qty}</Text>}</Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button onPress={() => { ChangeQtyLocal("-") }} status="info" style={{borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 20, color: theme['color-danger-700'], fontFamily: 'CairoBold' }}>-</Text>}</Button>
                        </View>
                    </View>
                }
                {!added &&
                    <Button
                        status="info"
                        onPress={TryAnimated}
                        style={{ borderRadius: 5}}
                        disabled={data.storagesItems.qty == 0 ?true:false}
                    >
                        {evaProps => <Text {...evaProps} style={{ fontSize: 12, color: 'white', fontFamily: 'CairoBold' }}>{data.storagesItems.qty == 0 ?"نفذ من المخزون":"اضافة الى السلة"}</Text>}
                    </Button>
                }

            </Animated.View>
        )
    }
    return (
        <View style={{ padding: 15 }}>
            <ActionButtons />
        </View>
    )
}


const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);