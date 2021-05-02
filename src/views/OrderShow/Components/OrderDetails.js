import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Text,useTheme} from '@ui-kitten/components'
import { translate } from '../../../translations';
import {TranslationsMethods} from '../../../services'
export default ({order}) => {
    let theme = useTheme()
    let styles = StyleSheet.create({
        orderDetailsBox:{
            backgroundColor:'white',
            padding:15,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        },
        flex1:{
            flex:1
        },
        orderDetailsText:{
            color:theme['text-hint-color'],
            fontFamily:TranslationsMethods.ReturnFont("Bold")
        }
    })
     return (
        <View style={styles.orderDetailsBox}>
                <View>
                    <Text style={styles.orderDetailsText}>#{order.ID}</Text>
                </View>
                <View >
                    <Text style={styles.orderDetailsText}>{order.payment_method}</Text>
                </View>
                <View >
                    <Text style={styles.orderDetailsText}>{"القيمة"}: {order.total} {translate("jod")}</Text>
                </View>
            </View>
     )
}