import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import { Text, Input, useTheme, Button,Icon } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { TextBanner } from '../../../components'
import {OrdersActions} from '../../../stores'
import {translate} from '../../../translations'
import Toast from 'react-native-toast-message'
import * as Location from 'expo-location';
let Shipping = (props) => {
    let [ship, setShip] = React.useState({
        name: '',
        phone: ''
    })

    let [load,setLoad] = React.useState(false)
    let {setSelectedAddress} = props
    let {address} = props.orders
    let {addresses,user} = props.user

    let install = () => {
        setShip({
            name:user.name,
            phone:user.phone
        })
        if(addresses.length >= 1) {
            let lastAddress = addresses[addresses.length - 1]
            setSelectedAddress(lastAddress)
        }
    }

    React.useEffect(() => {
        install()
    },[])
    let theme = useTheme()
    let TakeMyLocation = async () => {
        setLoad(true)
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Toast.show({
            text1: translate("error"),
            text2: translate("addresses.location_error"),
            type: 'danger'
          })
          setLoad(false)
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setLoad(false)
        setSelectedAddress({...address,ID:0,lat:location.coords.latitude,long:location.coords.longitude})
        Toast.show({
          text1: translate("success"),
          text2: translate("addresses.location_success")
        })
      }
    return (
        <View >
            <TextBanner text={'المعلومات'} />
            <View style={{ padding: 10 }}>
                <Input
                    placeholder="الأسم"
                    label="الأسم"
                    value={ship.name}
                    textStyle={{ textAlign: "right" }}
                    onChangeText={(val) => { setShip({ ...ship, name: val }) }}
                />
                <Input
                    placeholder="رقم الهاتف"
                    label="رقم الهاتف"
                    value={ship.phone}
                    textStyle={{ textAlign: "right" }}
                    onChangeText={(val) => { setShip({ ...ship, phone: val }) }}
                />
                <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'CairoBold', textAlign: 'left' }}>العنوان</Text>
                    <TouchableOpacity onPress={props.openBottomSheet}>
                        <Text style={{ fontSize: 12, color: theme['text-hint-color'] }}>تغير العنوان</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center',paddingTop:10 }}>
                    <View style={{ flex: 1 }}>
                        <Input
                            value={address.city}
                            textStyle={{ textAlign: 'right' }}
                            placeholder="المدينة"
                            onChangeText={(val) => setSelectedAddress({ ...address, city: val,ID:0 })}
                        />
                    </View>
                    <View style={{ width: 5 }}></View>
                    <View style={{ flex: 1 }}>
                        <Input
                            value={address.area}
                            textStyle={{ textAlign: 'right' }}
                            placeholder="المنطقة"
                            onChangeText={(val) => setSelectedAddress({ ...address, area: val,ID:0 })}
                        />
                    </View>
                </View>
                <View style={{paddingTop:5}}></View>
                <Input
                    value={address.address}
                    textStyle={{ textAlign: 'right' }}
                    placeholder="العنوان"
                    onChangeText={(val) => setSelectedAddress({ ...address, address: val,ID:0 })}
                />
                <View style={{paddingTop:5}}></View>
                {address.lat !== 0 ?
                <Button status="primary" onPress={() => {TakeMyLocation()}} disabled={load ? true:false} accessoryLeft={(props) => (<Icon {...props} name="checkmark-circle" />)} size="large">تمت اضافة الموقع</Button>
                :
                <Button status="info" onPress={() => {TakeMyLocation()}} disabled={load ? true:false} size="large">اضافة الموقع الحالي</Button>
                }
                
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{flex:1,}}>
                    <Input
                        value={address.apt}
                        textStyle={{ textAlign: 'right' }}
                        placeholder="الشقة\المنزل"
                        onChangeText={(val) => setSelectedAddress({ ...address, address: val,ID:0 })}
                    />
                    </View>
                    <View style={{ width: 5 }}></View>
                    <View style={{flex:1,}}>
                    <Input
                        value={address.floor}
                        textStyle={{ textAlign: 'right' }}
                        placeholder="الطابق"
                        onChangeText={(val) => setSelectedAddress({ ...address, address: val,ID:0 })}
                    />
                    </View>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Input
                        value={address.note}
                        textStyle={{ textAlign: 'right' }}
                        placeholder="ملاحظة"
                        onChangeText={(val) => setSelectedAddress({ ...address, note: val,ID:0 })}
                    />
                </View>
            </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);