import React from 'react';
import {View,} from 'react-native';
import {Layout,Text,Button} from '@ui-kitten/components'
import { translate } from '../../translations';
import {TranslationsMethods} from '../../services'
export default (props) => {
     return (
        <Layout style={{flex:1,justifyContent:'center',alignItems:'center'}} level="2">
            <Text style={{textAlign:'center', fontSize:24,fontFamily:TranslationsMethods.ReturnFont("Bold")}}>{translate("success")}</Text>
            <View style={{padding:10}}>
                <Text style={{textAlign:'center',fontSize:12}}>{translate("newOrder.order_success_1")}</Text>
                <Text style={{textAlign:'center',fontSize:12}}>{translate("newOrder.order_success_2")}</Text>
            </View>
            <View style={{marginTop:10,width:'61.6%'}}>
                <Button status="primary" size="small" onPress={() => {props.navigation.navigate("BottomTapNavigation")}} style={{backgroundColor:'black',borderColor:'black'}}>{translate("newOrder.main")}</Button>
            </View>
        </Layout>
     )
}