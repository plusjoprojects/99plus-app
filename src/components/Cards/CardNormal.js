import React from "react";

// Views
import { View, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Text, Icon, Layout, useTheme, Button } from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import {Ionicons} from '@expo/vector-icons'

// Services
import { colors, env } from "../../constants";
import { Basket, WishList, TranslationsMethods } from "../../services";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import { translate } from '../../translations'
import DetailCard from './DetailCard'
import {connect} from 'react-redux'

let CardNormal = ({ data,wishListItems }) => {
    // Global Props
    let navigation = useNavigation();
    let theme = useTheme();
    let [inWishList, setInWishList] = React.useState(false);

    let animatedAddButton = React.useRef(new Animated.Value(1)).current

    // Check its in the wish List
    let installWishListChecker = () => {
        setInWishList(WishList.CheckIsInWishList(data.ID))
    }

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

    let ReturnPrice = () => {
        let _price = data.price
        return _price.toFixed(2)
    }



    useFocusEffect(
        React.useCallback(() => {
            installWishListChecker();
            installBasketChecker();
        }, [])
    );

    let styles = StyleSheet.create({
        box: {
            width: "100%",
            backgroundColor: "white",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.moreWhite
        },
        imageContainer: {
            borderRadius: 5,
            padding: 0,
        },
        imageBox: {
            width: "100%",
            height: 125,
            borderRadius: 5,
        },
        title: {
            color: theme['text-basic-color'],
            fontSize: 10,
            textAlign: "center",
            marginTop: 3,
            fontFamily: TranslationsMethods.ReturnFont("Bold")
        },
        qtyBox: {
            marginTop: 5,
            paddingVertical: 1,
            paddingHorizontal: 5,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
        },
        qtyText: {
            color: theme["text-hint-color"],
            textAlign: "center",
            fontSize: 10,
            fontFamily: TranslationsMethods.ReturnFont("Bold"),
        },
        actionsPanel: {
            marginTop: 5,
            paddingHorizontal: 5
        },
        priceText: {
            fontSize: 14,
            fontFamily: TranslationsMethods.ReturnFont("Bold"),
        },
        addButton: {
            width: 30,
            height: 30,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: "black",
        },
        plusIcon: {
            width: 15,
            height: 15,
        },
        heartIconBox: {
            position: "absolute",
            right: 0,
            top: 0,
            padding: 2,
        },
        heartIcon: {
            fontSize:22
        },
    });
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
                            <Button onPress={() => { ChangeQtyLocal("+") }} size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 18, color: theme['color-success-700'], fontFamily: 'CairoBold' }}>+</Text>}</Button>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Button size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 18, color: theme['color-info-400'], fontFamily: 'CairoBold' }}>{qty}</Text>}</Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button onPress={() => { ChangeQtyLocal("-") }} size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 20, color: theme['color-danger-700'], fontFamily: 'CairoBold' }}>-</Text>}</Button>
                        </View>
                    </View>
                }
                {!added &&
                    <Button
                        status="info"
                        size="tiny"
                        disabled={data.storagesItems.qty == 0 ?true:false}
                        onPress={TryAnimated}
                        style={{ borderRadius: 5, height: 30, paddingVertical: 0 }}
                    >
                        {evaProps => <Text {...evaProps} style={{ fontSize: 12, color: 'white', fontFamily: 'CairoBold' }}>{data.storagesItems.qty == 0 ?"نفذ من المخزون":"اضافة الى السلة"}</Text>}
                    </Button>
                }

            </Animated.View>
        )
    }
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Item", { itemID: data.ID });
            }}
            style={styles.box}
        >
            <Layout level="1" style={styles.imageContainer}>
                <Image
                    source={{ uri: env.server + env.itemImageSource + data.image }}
                    style={styles.imageBox}
                    resizeMode="contain"
                ></Image>
                <TouchableOpacity
                    onPress={async () => {
                        if (!inWishList) {
                            setInWishList(true);
                            await WishList.StoreWishListItem(data.ID);
                        } else {
                            setInWishList(false);
                            await WishList.RemoveItemFromWishList(data.ID);
                        }
                    }}
                    style={styles.heartIconBox}
                >
                    <Ionicons
                        name={wishListItems.includes(data.ID) ? "heart" : "heart-outline"}
                        style={styles.heartIcon}
                        color={wishListItems.includes(data.ID) ? theme['text-danger-color'] : theme['text-hint-color']}
                    />
                </TouchableOpacity>
                <View style={{ position: 'absolute', left: 0, top: 0, padding: 2 }}>
                    <Icon
                        name={"share-outline"}
                        fill={theme['text-hint-color']}
                        style={{ width: 18, height: 18 }}
                    />
                </View>
            </Layout>
            <View style={{ padding: 5 }}>
                <Text style={styles.title}>{TranslationsMethods.ReturnValue("title", data.translations, data.title)}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Item", { itemID: data.ID }); }} style={{ paddingHorizontal: 2, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <DetailCard size="small" value={data.original_price.toFixed(2)} title="السعر الاصلي" valueSubTitle={translate("jod")} valueStyle={{textDecorationStyle: 'solid', textDecorationLine: 'line-through', textDecorationColor:theme['text-hint-color']}} />
                    <DetailCard size="small" value={data.storagesItems.qty} title="الكمية المتبقية" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Item", { itemID: data.ID }); }} style={{ width: '100%', paddingTop: 10 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2 }}>
                        <DetailCard value={ReturnPrice()} valueStyle={{color:'black'}} valueSubTitle={translate("jod")}></DetailCard>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </TouchableOpacity>
                <View style={{ height: 5 }}></View>
                <ActionButtons />
            </View>

        </TouchableOpacity>
    );
};


const mapStateToProps = (state) => {
    return {
      wishListItems: state.items.wishListItems
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardNormal);