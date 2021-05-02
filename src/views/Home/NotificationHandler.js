import React from 'react';


import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { apis } from '../../services'
import { connect } from 'react-redux'
import { UserActions } from '../../stores'
import {useNavigation} from '@react-navigation/native'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


let NotificationHandler = (props) => {
    let navigation = useNavigation()
    let { user, auth } = props.user
    let { setNotificationToken } = props;

    const notificationListener = React.useRef();
    const responseListener = React.useRef();

    let Action = (type,id) => {
        if(type == "Order") {
            navigation.navigate("OrderShow",{orderID:id})
        }

        if(type == "Category") {
            navigation.navigate("Category",{categoryID:id})
        }

        if(type == "Ad") {
            navigation.navigate("AdShow",{adID:id})
        }
    }

    let Install = (token) => {
        let user_id = 0
        if (auth) {
            user_id = user.ID
        }

        let _data = {
            token: token,
            user_id: user_id
        }

        let success = (res) => {
            setNotificationToken(res.notificationToken)
        }

        let error = err => {
            console.log("Error Store Notification Token:", err, "\n", err.response.data)
        }

        apis.main.StoreNotificationToken(_data, success, error)
    }


    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            Install(token)
        })

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            let data = notification.notification.request.content.data
            Action(data.type,data.id)
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            let data = response.notification.request.content.data
            Action(data.type,data.id)
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, [])

    return (
        <>
        </>
    )
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#98ded9',
        });
    }

    return token;
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNotificationToken: item => dispatch(UserActions.setNotificationToken(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHandler);
