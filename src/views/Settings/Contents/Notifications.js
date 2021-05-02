import React from 'react';
import { View, Dimensions } from 'react-native';
import { Layout, Text, Button, Toggle } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message'
import {apis,TranslationsMethods} from '../../../services'
import {UserActions} from '../../../stores'
import {translate} from '../../../translations'
let EditUser = (props) => {
    let { width, height } = Dimensions.get("screen")
    let { user,notificationToken } = props.user;

    let [allNotification, setAllNotification] = React.useState(true)
    let [orderNotification, setOrderNotification] = React.useState(true)

    let _Save = () => {
        let _data = {
            ...notificationToken,
            all_notification:allNotification,
            orders_notification:orderNotification
        }

        let success = (res) => {
            // If need to do something 
        }

        let error = err => {
            console.log("Error update Notification Token:",err,"\n",err.response.data)
        }

        apis.main.UpdateNotificationToken(_data,success,error)
        Toast.show({
            text1: translate("success"),
            text2: translate("settings_saved"),
            visibilityTime: 2000,
        })
        props.closeBottomSheet();
    }

    React.useEffect(() => {
        setAllNotification(notificationToken.all_notification)
        setOrderNotification(notificationToken.orders_notification)
    },[])

    return (
        <View style={{ height: height / 1.25, width: '100%', backgroundColor: 'white' }}>
            <View style={{ padding: 15 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, fontFamily: TranslationsMethods.ReturnFont("Bold")}}>{translate("notification.notification_settings")}</Text>
                <View style={{ marginTop: 30, width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Toggle checked={allNotification} onChange={(val) => { setAllNotification(val) }}>
                            {translate("notification.all_notification")}
                        </Toggle>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Toggle checked={orderNotification} onChange={(val) => { setOrderNotification(val) }}>
                            {translate("notification.order_notification")}
                        </Toggle>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Button onPress={_Save}>{translate("save")}</Button>
                    </View>
                </View>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);