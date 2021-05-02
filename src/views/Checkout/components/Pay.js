import React from "react";
import { View } from "react-native";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { connect } from "react-redux";
import { TextBanner } from "../../../components";
import { apis } from '../../../services'
import { OrdersActions, UserActions } from '../../../stores'
import Toast from 'react-native-toast-message'
import { translate } from '../../../translations'
import { colors } from "../../../constants";
import { useNavigation } from '@react-navigation/native'
let Pay = (props) => {

    let { orderItems, address, orderDiscountCode } = props.orders;
    let { setOrderDiscountCode } = props
    let { user, orders } = props.user
    let [load, setLoad] = React.useState(false)

    let navigation = useNavigation()

    // Discount Code Methods
    let [discountCode, setDiscountCode] = React.useState()

    let GetTotal = () => {
        let total = 0;
        orderItems.forEach((trg, index) => {
            trg.items.forEach((item) => {
                let itemTotal = item.item.price * item.qty
                total = total + itemTotal
            })
        })

        total = total.toFixed(2)

        if (orderDiscountCode) {
            let fixedDiscountValue = orderDiscountCode.value * 0.01
            let discountValue = total * fixedDiscountValue
            total = total - discountValue
        }
        return total
    }

    let ReturnTotalBeforeTax = () => {
        let total = GetTotal()
        let tax = total * 0.16
        total = total - tax

        return total.toFixed(2);
    }

    let Store = () => {
        setLoad(true)
        let total = GetTotal()
        total = parseFloat(total)
        console.log("Store Total", total)
        let Order = {
            user_id: user.ID,
            total: total,
            address_id: address.ID,
            type: 'Application',
            discount_id: orderDiscountCode ? orderDiscountCode.ID : 0,
            note: '',
            payment_method: 'paid on delivery'
        }
        let _orderItemsList = []
        orderItems.forEach((trg, index) => {
            trg.items.forEach((item) => {
                _orderItemsList.push({ item_id: item.item.ID, qty: item.qty, total: item.item.price * item.qty })
            })
        })

        let onSuccess = (res) => {
            props.resetOrders()
            props.setOrders([...orders, res.order])
            setLoad(false)
            navigation.navigate("CheckoutDone")
        }

        let onError = (err) => {
            console.log("Error Store Order:", err, "\n",)
            setLoad(false)
            Toast.show({
                text1: translate("error"),
                text2: translate("network_error"),
                type: 'error'
            })
        }
        apis.orders.storeOrder({ order: Order, order_items: _orderItemsList, address: address }, onSuccess, onError)
    }

    let checkDiscountValid = () => {
        let _data = {
            user_id: user.ID,
            code: discountCode
        }

        let success = (res) => {
            let status = res.status
            if (status == 0) {
                Toast.show({
                    text1: translate("newOrder.code_error"),
                    text2: translate("newOrder.code_error_2"),
                    type: 'error'
                })
                return;
            }

            if (status == 1) {
                setOrderDiscountCode(res.code)
                Toast.show({
                    text1: translate("success"),
                    text2: translate("newOrder.code_success")
                })
            }

            if (status == 2) {
                Toast.show({
                    text1: translate("error"),
                    text2: translate("newOrder.code_error_used"),
                    type: 'error'
                })
            }
        }

        let error = err => {
            console.log("error check code valid ", err, "\n", err.response.data)
            Toast.show({
                text1: translate("error"),
                text2: translate("network_error"),
                type: 'error'
            })
        }

        apis.orders.checkDiscountCode(_data, success, error)
    }



    let ReturnTotal = () => {
        let total = 0;
        // All Total
        orderItems.forEach((trg, index) => {
            trg.items.forEach((item) => {
                let itemTotal = item.item.price * item.qty
                total = total + itemTotal
            })
        })

        total = total.toFixed(2) // Total 
        
        let TaxValue = total / 1.16 // مجموع الفاتورة قبل الخصم
        let TotalBeforeTax = total - TaxValue // قيمة الضريبة 
        



        if (orderDiscountCode) {
            // let fixedDiscountValue = orderDiscountCode.value * 0.01
            // let discountValue = TaxValue * fixedDiscountValue
            // let totalAfterDiscount = TaxValue - discountValue
            // let FullTotal = totalAfterDiscount + TaxValue

            let fixedDiscountValue = orderDiscountCode.value * 0.01
            let discountValue = TaxValue * fixedDiscountValue
            let totalAfterDiscount = TaxValue - discountValue
            
            // xs
            let TaxValueFull = totalAfterDiscount * 0.16
            let TaxValueWithDiscount = totalAfterDiscount * 0.16 + totalAfterDiscount

            return (
                <View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                        <View>
                            <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}> الخصم</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{orderDiscountCode.value}</Text>
                            <Text style={{ fontSize: 8 }}>%</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                        <View>
                            <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}>مجموع الفاتورة</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{totalAfterDiscount.toFixed(3)}</Text>
                            <Text style={{ fontSize: 8 }}>{translate("jod")}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                        <View>
                            <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}> الضريبة</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{TaxValueFull.toFixed(3)}</Text>
                            <Text style={{ fontSize: 8 }}>دينار</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                        <View>
                            <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}>قيمة الفاتورة</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{TaxValueWithDiscount.toFixed(2)}</Text>
                            <Text style={{ fontSize: 8 }}>{translate("jod")}</Text>
                        </View>
                    </View>
                </View>

            )
        }
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                    <View>
                        <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}>مجموع الفاتورة</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{TaxValue.toFixed(3)}</Text>
                        <Text style={{ fontSize: 8 }}>{translate("jod")}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                    <View>
                        <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}> الضريبة</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{TotalBeforeTax.toFixed(3)}</Text>
                        <Text style={{ fontSize: 8 }}>دينار</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 2, borderColor: colors.moreWhite, borderWidth: 1 }}>
                    <View>
                        <Text style={{ fontFamily: 'CairoBold', fontSize: 14 }}>قيمة الفاتورة</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontFamily: "openSansBold" }}>{total}</Text>
                        <Text style={{ fontSize: 8 }}>{translate("jod")}</Text>
                    </View>
                </View>
            </View>

        )
    }

    return (
        <View>
            <TextBanner text="الفاتورة" />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <View style={{ flex: 3 }}>
                    <Input label={translate("newOrder.add_discount_code")} placeholder={translate("newOrder.code")} textStyle={{ textAlign: 'right' }} value={discountCode} onChangeText={(val) => { setDiscountCode(val) }} />
                </View>
                <View style={{ width: 3 }}></View>
                <View style={{ flex: 1 }}>
                    <Button onPress={checkDiscountValid} status="info" size="small" style={{ top: 11 }}>{translate("newOrder.add")}</Button>
                </View>
            </View>
            <View style={{ paddingTop: 15 }}>
                {ReturnTotal()}
            </View>
            <View style={{ paddingVertical: 25,paddingHorizontal:15}}>
                <Button onPress={Store} disabled={load ? true : false} status="info">التأكيد والمتابعة</Button>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderDiscountCode: item => dispatch(OrdersActions.setOrderDiscountCode(item)),
        resetOrders: () => dispatch(OrdersActions.resetOrders()),
        setOrders: item => dispatch(UserActions.setOrders(item))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pay);