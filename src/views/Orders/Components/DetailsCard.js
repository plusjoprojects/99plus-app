import React from 'react';
import {View,} from 'react-native';
import {Text,useTheme} from '@ui-kitten/components'
import {TranslationsMethods} from '../../../services'
export default ({title,value}) => {
    let theme = useTheme()
     return (
        <View style={{padding:5,borderRadius:5,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Text  style={{fontSize:18,textAlign:'center',color:theme['text-hint-color'],fontFamily:TranslationsMethods.ReturnFont("Bold")}}>{title}</Text>
            <Text style={{fontSize:10,fontFamily:'OpenSans',textAlign:'center',color:theme['text-hint-color']}}>{value}</Text>
        </View>
     )
}