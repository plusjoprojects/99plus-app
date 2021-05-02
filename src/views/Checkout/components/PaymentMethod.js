import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { TextBanner } from '../../../components'
import { translate } from "../../../translations";
import Toast from 'react-native-toast-message'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TranslationsMethods } from '../../../services'
let PaymentMethod = () => {

    let theme = useTheme()

    let PaymentCard = ({ paymentType, status, type,icon }) => (
        <TouchableOpacity onPress={() => { PressPaymentType(type) }} style={{ backgroundColor: status == 'success' ? theme['color-success-400'] : 'white', paddingVertical: 10, marginTop: 5, paddingHorizontal: 16, borderRadius: 5, borderColor: status == 'success' ? theme['color-success-600'] : theme['color-basic-400'], borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name={icon} size={24} color="black" />
                <Text style={{ textAlign: 'left', fontSize: 14, fontFamily: TranslationsMethods.ReturnFont("Bold") }}>{paymentType}</Text>
            </View>
            <View>
                {status == 'success' &&
                    <MaterialIcons name="done-outline" size={24} color="black" />
                }
            </View>
        </TouchableOpacity>
    )
    let [selectedPaymentType, setSelectedPaymentType] = React.useState(0)
    let PressPaymentType = (type) => {
        if (type == 1) {
            Toast.show({
                text1: translate("error"),
                text2: translate("newOrder.not_include"),
                type: 'error'
            })
        }
    }
    return (
        <View>
            <TextBanner text="طريقة الدفع" />
            <View style={{ padding: 15 }}>
                <PaymentCard icon={'cash-marker'} status={selectedPaymentType == 0 ? 'success' : 'basic'} type={0} paymentType={translate('newOrder.on_delivery')} />
                <PaymentCard icon={'credit-card-marker-outline'} status={selectedPaymentType == 1 ? 'success' : 'basic'} type={1} paymentType={"الدفع Visa / Master Card عند التوصيل"} />
                <PaymentCard icon={'credit-card-outline'} status={selectedPaymentType == 2 ? 'success' : 'basic'} type={1} paymentType={translate("newOrder.visa")} />
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);