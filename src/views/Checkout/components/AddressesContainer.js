import React from 'react';
import { View,Dimensions,TouchableOpacity } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {colors} from '../../../constants'
import {OrdersActions} from '../../../stores'

let AddressesContainer = (props) => {
    let {addresses} = props.user
    let {width,height} = Dimensions.get("screen")
    let {setSelectedAddress,closeBottomSheet} = props
    let {address} = props.orders
    let AddressBox = (props) => (
        <TouchableOpacity onPress={() => {setSelectedAddress(props.address);closeBottomSheet()}} style={{borderRadius:5,borderWidth:1,borderColor:colors.moreWhite,marginTop:5}}>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1,borderColor:colors.moreWhite,borderWidth:1,justifyContent:'center',padding:5,alignItems:'center'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:14,fontFamily:'openSansBold',textAlign:'center'}}>{props.address.city}</Text>
                        <Text style={{fontSize:10,fontFamily:'OpenSans',textAlign:'center'}}>المدينة</Text>
                    </View>
                </View>
                <View style={{flex:1,borderColor:colors.moreWhite,borderWidth:1,justifyContent:'center',padding:5,alignItems:'center'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:14,fontFamily:'openSansBold',textAlign:'center'}}>{props.address.area}</Text>
                        <Text style={{fontSize:10,fontFamily:'OpenSans',textAlign:'center'}}>المنطقة</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1,borderColor:colors.moreWhite,borderWidth:1,justifyContent:'center',padding:5,alignItems:'center'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:14,fontFamily:'openSansBold',textAlign:'center'}}>{props.address.address}</Text>
                        <Text style={{fontSize:10,fontFamily:'OpenSans',textAlign:'center'}}>العنوان</Text>
                    </View>
                </View>
                <View style={{flex:1,borderColor:colors.moreWhite,borderWidth:1,justifyContent:'center',padding:5,alignItems:'center'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:14,fontFamily:'openSansBold',textAlign:'center'}}>{props.address.note}</Text>
                        <Text style={{fontSize:10,fontFamily:'OpenSans',textAlign:'center'}}>ملاحظة</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
     return(
        <Layout level="1" style={{height:height / 1.25,padding:15,borderColor:'black',borderWidth:1,borderTopRightRadius:15,borderTopLeftRadius:15}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:50,height:1,backgroundColor:'black'}}></View>
        </View>
            <Text style={{fontFamily:'CairoBold',textAlign:'left',marginBottom:15}}>أختر عنوان</Text>
            {addresses.map((trg,index) => (
                <AddressBox key={index} address={trg} />
            ))}
        </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user,
         orders:state.orders
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setSelectedAddress:item => dispatch(OrdersActions.setSelectedAddress(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesContainer);