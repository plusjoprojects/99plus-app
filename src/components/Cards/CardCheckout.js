import React from "react";

//Views
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, Layout, useTheme, Button } from "@ui-kitten/components";

// Services
import { colors, env } from "../../constants";
import { Basket, TranslationsMethods } from "../../services";
import { useNavigation } from "@react-navigation/native";
import { translate } from '../../translations'

import DetailCard from './DetailCard'

export default (props) => {
    let navigation = useNavigation();
    let theme = useTheme();
    let { item, qty } = props.item

    let ReturnPrice = () => {
        let _price = item.price
        return _price.toFixed(2)
    }

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
            color: theme['text-hint-color'],
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
            left: 0,
            top: 0,
            padding: 2,
            borderRadius: 3
        },
        heartIcon: {
            width: 20,
            height: 20,
        },
    });
    let ChangeQtyLocal = (type) => {
        if (type == "+") {
            if (item.storagesItems.qty > qty) {
                Basket.ChangeQty(item.ID, "+")
            }
        } else {
            if (qty !== 1) {
                Basket.ChangeQty(item.ID, "-")
            }
        }
    }

    let ActionButtons = () => {
        return (
            <View style={{ paddingTop: '4%' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Button onPress={() => { ChangeQtyLocal("+") }} size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 18, color: theme['color-success-700'], fontFamily: 'CairoBold' }}>+</Text>}</Button>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Button size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 16, color: theme['color-info-400'], fontFamily: 'CairoBold' }}>{qty}</Text>}</Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button onPress={() => { ChangeQtyLocal("-") }} size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 20, color: theme['color-danger-700'], fontFamily: 'CairoBold' }}>-</Text>}</Button>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View
            onPress={() => {
                navigation.navigate("Item", { itemID: item.ID });
            }}
            style={styles.box}
        >
            <Layout level="1" style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => { navigation.navigate("Item", { itemID: item.ID }); }}
                >
                    <Image
                        source={{ uri: env.server + env.itemImageSource + item.image }}
                        style={styles.imageBox}
                        resizeMode="contain"
                    ></Image>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { Basket.RemoveItemFromBasket(item.ID) }}
                    style={styles.heartIconBox}
                >
                    <Icon
                        name={"close-outline"}
                        style={styles.heartIcon}
                        fill={theme['text-hint-color']}
                    />
                </TouchableOpacity>
            </Layout>
            <View style={{ padding: 5 }}>
                <Text style={styles.title}>{TranslationsMethods.ReturnValue("title", item.translations, item.title)}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Item", { itemID: item.ID }); }} style={{ paddingHorizontal: 2, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <DetailCard size="small" value={item.original_price.toFixed(2)} title="السعر الاصلي" valueSubTitle={translate("jod")} valueStyle={{ textDecorationStyle: 'solid', textDecorationLine: 'line-through', textDecorationColor: theme['text-hint-color'] }} />
                <DetailCard size="small" value={item.storagesItems.qty} title="الكمية المتبقية" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Item", { itemID: item.ID }); }} style={{ width: '100%', paddingTop: 10 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2 }}>
                        <DetailCard value={ReturnPrice()} valueStyle={{color:'black'}} valueSubTitle={translate("jod")}></DetailCard>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </TouchableOpacity>
                <ActionButtons />
            </View>
        </View>
    );
};
