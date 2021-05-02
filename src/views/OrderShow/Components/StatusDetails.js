import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Layout,Text,Icon,useTheme} from '@ui-kitten/components'
import { translate } from '../../../translations';
import { LinearGradient } from 'expo-linear-gradient';
import {TranslationsMethods} from '../../../services'
export default ({order}) => {
    let theme = useTheme()
    let styles = StyleSheet.create({
        box:{
            marginTop:10,
            padding:15
        },
        title:{
            fontSize:14,fontFamily:TranslationsMethods.ReturnFont("Bold"),
            textAlign:'left'
        },
        detailBox:{
            width:'100%',height:50,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        }
    })
    let height = 50

    let DiverBox = ({status = 'display'}) => (
        <View style={styles.detailBox}>
            <View style={{height:height,width:height,justifyContent:'center',alignItems:'center'}}>
                <View style={{height:'100%',width:1,backgroundColor:status == 'active' ?theme['color-primary-500']:theme['color-info-300']}}></View>
            </View>
            <View style={{width:50}}></View>
            <View style={{width:150}}>
            </View>
        </View>
    )
    let DetailBox = ({icon,value,value2,status = 'display'}) => (
        <View style={styles.detailBox}>
            <View style={{height:height,width:height,borderRadius:height / 2,overflow:'hidden'}}>
      <LinearGradient colors={status == 'active'?[theme['color-success-500'], theme['color-primary-500']]:[theme['color-info-100'],theme['color-info-200']]} style={{height:height,width:height,justifyContent:'center',alignItems:'center'}} >
                <Icon name={icon} fill="white" style={{width:height / 2,height:height /2}}/>
                </LinearGradient>
            </View>
            <View style={{width:50}}></View>
            <View style={{width:150}}>
                <Text style={{color:status == 'active' ?theme['text-primary-color']:theme['text-hint-color'],fontFamily:TranslationsMethods.ReturnFont("Bold"),fontSize:16,textAlign:'left'}}>{value}</Text>
                {status == 'active' &&
                <Text style={{color:theme['text-hint-color'],fontSize:12,textAlign:'left'}}>{value2}</Text>
                }
            </View>
        </View>
    )
     return (
        <View style={styles.box}>
            <Text style={styles.title}>{translate("order.order_status")}</Text>
            <View style={{flexDirection:'column',marginTop:15}}>
                <DetailBox status={order.status >= 0 ?'active':'display'} icon={'shopping-cart-outline'} value={translate("order.order_set")} value2={translate("order.order_set_done")}/>
                <DiverBox status={order.status >= 1 ?'active':'display'}/>
                <DetailBox status={order.status >= 1 ?'active':'display'} icon={'checkmark-square-outline'} value={translate("order.order_approve")} value2={translate("order.order_approve_done")}/>
                <DiverBox status={order.status >= 2 ?'active':'display'}/>
                <DetailBox status={order.status >= 2 ?'active':'display'} icon={'car-outline'} value={translate("order.order_delivery")} value2={translate("order.order_delivery_done")}/>
                <DiverBox status={order.status >= 3 ?'active':'display'} />
                <DetailBox status={order.status >= 3 ?'active':'display'} icon={'checkmark-outline'} value={translate("order.order_end")} value2={translate("order.order_end_done")}/>
            </View>
        </View>
     )
}