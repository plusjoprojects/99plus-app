import React from "react";

// Views
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { CardCheckout,Badge } from '../../components'
import DetailCard from '../../components/Cards/DetailCard'
import {ScrollView} from 'react-native-gesture-handler'


// Services
import { useNavigation } from '@react-navigation/native';
import { translate } from '../../translations'
import {BasketClass} from '../../services'

// Stores
import { connect } from "react-redux";
import { OrdersActions } from '../../stores'
let CheckoutWithBottom = (props) => {
    let { width } = Dimensions.get("screen");
    let { closePanel, orders, user } = props;
    let navigation = useNavigation()

    let { orderItems } = orders
    let theme = useTheme();


    let EmptyContent = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="meh" style={{ fontSize: 64, color: theme['text-hint-color'] }} />
            <Text style={{ color: theme['text-hint-color'], marginTop: 15, fontSize: 14, textAlign: 'center' }}>{translate("main.basket_empty")}</Text>
        </View>
    )


    let CategoryTotal = (items) => {
        let total = 0
        items.forEach((trg) => {
            let itemTotal = trg.item.price * trg.qty
            total = total + itemTotal
        })

        return total.toFixed(2)
    }

    let CategoryTitleView = ({ title, items, color = theme['color-primary-500'] }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
            <View style={{ height: '100%', width: 4, backgroundColor: color, borderRadius: 1 }}></View>
            <View style={{ width: 5 }}></View>
            <View style={{flexDirection:'row'}}>
            <Text style={{ fontFamily: 'CairoBold' }}>{title}</Text>
            <View style={{ paddingHorizontal: 2,position:'absolute',right:-15,top:-2 }}>
                {/* <Text style={{ color: theme['text-hint-color'], fontSize: 12 }}>({items.length})</Text> */}
                <Badge size="small" count={items.length} />
            </View>
            </View>

            <View style={{ paddingHorizontal: 7 }}>
                <Text style={{ color: theme['text-hint-color'], fontSize: 12 }}>({CategoryTotal(items) + ' ' + translate("jod")})</Text>
            </View>
        </View>
    )

    let BillTotal = () => {
        let total = 0
        orderItems.forEach((trg) => {
            trg.items.forEach((item) => {
                let ItemTotal = item.item.price * item.qty
                total = total + ItemTotal
            })
        })

        return total.toFixed(2);
    }


    let ItemsCount = () => {
        let length = 0
        orderItems.forEach((trg) => {
            trg.items.forEach((item) => {
                length = length + item.qty
            })
        })

        return length;
    }


    let TotalOriginalPrice = () => {
        let total = 0
        orderItems.forEach((trg) => {
            trg.items.forEach((item) => {
                let ItemTotal = item.item.original_price * item.qty
                total = total + ItemTotal
            })
        })

        return total.toFixed(2);
    }


    let ProvideTotal = () => {
        let TotalOriginal = TotalOriginalPrice()
        let _BillTotal = BillTotal()


        let provide = TotalOriginal - _BillTotal

        return provide.toFixed(2)
    }

    let PTotal = () => {
        let TotalOriginal = TotalOriginalPrice()
        let _BillTotal = BillTotal()

        let provide = TotalOriginal - _BillTotal

        let p = provide / TotalOriginal
        p = p * 100

        return p.toFixed(0);
    }

    let ActionsBox = () => (
        <View>
            <View style={{ justifyContent: 'center', backgroundColor: 'white', alignItems: 'center' }}>
                <DetailCard size="x-large" value={BillTotal()} valueSubTitle={translate("jod")} valueStyle={{ color: 'black' }} title={'مجموع الفاتورة'} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <DetailCard value={ItemsCount()} title={'مجموع المواد'}></DetailCard>
                <DetailCard value={TotalOriginalPrice()} valueStyle={{ textDecorationStyle: 'solid', textDecorationColor: theme['text-hint-color'], textDecorationLine: 'line-through' }} title={'السعر الاصلي'}></DetailCard>
            </View>
            <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <DetailCard value={ProvideTotal()} valueSubTitle={'-' + PTotal() + '%'} title={'قيمة التوفير'}></DetailCard>
            <DetailCard value={"48"} valueSubTitle={"ساعه"} title={'التوصيل خلال'}></DetailCard>
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 5, paddingHorizontal: 43 }}>
                <Button size="small" status="info" onPress={() => { 
                    BasketClass.closeBottom()
                    navigation.navigate(user.auth ? "Checkout" : "InternalLogin") 
                    }}>تنفيذ العملية</Button>
            </View>
        </View>
    )
    return (
        <Layout level="1" style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop:2,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                    <Ionicons
                        name="ios-cart-outline"
                        style={{ color: "black", fontSize: 24 }}
                    />
                    <View style={{ width: 1 }}></View>
                    <Text style={{ color: "black", fontSize: 20,fontFamily:'openSansBold' }}>{translate("main.basket")}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        BasketClass.closeBottom()
                    }}
                >
                    <Feather
                        name="minus-square"
                        style={{ color: theme["color-danger-500"], fontSize: 20 }}
                    />
                </TouchableOpacity>
            </View>
            {orderItems.length == 0 &&
                <EmptyContent />
            }
            {orderItems.length > 0 &&
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            justifyContent: 'center'
                        }}
                    >
                        <ActionsBox />
                    </View>
                    <View >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {orderItems.map((trg) => (
                                    <View key={trg.category} style={{ paddingBottom: '3%', paddingTop: '5%', width: '100%' }}>
                                        <CategoryTitleView color={trg.category == "أدوات منزلية" ? theme['color-warning-500'] : theme['color-primary-500']} title={trg.category} items={trg.items} />
                                        <ScrollView contentContainerStyle={{ paddingTop: 5 }} showsHorizontalScrollIndicator={false} horizontal={true}>
                                            {trg.items.map((item, index) => (
                                                <View key={index} style={{ width: width / 2, marginHorizontal: 2 }}>
                                                    <CardCheckout item={item} />
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                ))}
                            </View>
                            <View style={{ height: width / 2 }}></View>
                        </ScrollView>
                    </View>
                </View>
            }
        </Layout>
    );
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        paddingHorizontal: 10,
        borderColor: "#f7f7f7",
        borderWidth: 0.5,
        zIndex: 104,
    },
});

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderItems: item => dispatch(OrdersActions.setOrderItems(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWithBottom);
