import React from 'react';

// Views
import {View,Image,Dimensions} from 'react-native';

// Services
import {env} from '../../../constants'

export default ({item}) => {
    let {height} = Dimensions.get("screen")
     return (
        <View style={{ height: height / 3, backgroundColor: 'white'}}>
            <Image source={{uri:env.server + env.itemImageSource + item.image }} style={{height:'100%',width:'100%'}} resizeMode="contain" />
        </View>
     )
}