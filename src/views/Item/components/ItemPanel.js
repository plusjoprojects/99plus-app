import React from 'react';

// views
import {View,ScrollView,Dimensions} from 'react-native';
import { Layout} from "@ui-kitten/components";

// Services
import {colors} from '../../../constants'


export default (props) => {
    let {width,height} = Dimensions.get("screen")
     return (
        <View style={{position:'absolute',left:0,top:0,height:'100%',height:'100%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height:height / 3,width:'100%'}}></View>
                <Layout style={{width:width,borderTopLeftRadius: 30, borderTopRightRadius: 30,borderColor:colors.moreWhite,borderWidth:1}}>
                    {props.children}
                </Layout>
            </ScrollView>
        </View>
     )
}