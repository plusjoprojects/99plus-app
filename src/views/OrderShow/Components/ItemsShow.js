import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Text,Layout,useTheme,} from '@ui-kitten/components'
import ItemBox from './ItemBox'
import { translate } from '../../../translations';
import {TranslationsMethods} from '../../../services'
export default ({orderItems}) => {
    let theme = useTheme()
    let styles = StyleSheet.create({
        box:{
            padding:15
        },
        title:{
            fontSize:14,fontFamily:TranslationsMethods.ReturnFont("Bold"),
            textAlign:'left'
        }
    })
     return (
        <View style={styles.box}>
            <Text style={styles.title}>{translate("order.items")}</Text>
            {orderItems.map((trg,index) => (
                <ItemBox key={index} data={trg} />
            ))}
        </View>
     )
}