import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Layout, Text, TopNavigation, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import AddressBox from './AddressBox'
import AddAddress from './AddAddress'
import Toast from 'react-native-toast-message'

import BottomSheet from "reanimated-bottom-sheet";
import { UserActions } from '../../../stores'
import { apis } from '../../../services';
import { translate } from '../../../translations';
import { Headers } from '../../../components'

let Addresses = (props) => {

    let { addresses } = props.user

    let { height, width } = Dimensions.get("screen")

    let ShowAddAddressContent = () => (
        <AddAddress closeBottomSheet={closeBottomSheet} />
    );



    let BottomSheetRef = React.useRef(null);
    let closeBottomSheet = () => {
        BottomSheetRef.current.snapTo(2);
    };
    let openBottomSheet = () => {
        BottomSheetRef.current.snapTo(0);
    };


    let removeAddress = (id) => {
        let success = (res) => {
            let _addresses = addresses
            _addresses.forEach((trg, index) => {
                if (id == trg.ID) {
                    _addresses.splice(index, 1)
                }
            })
            props.setAddresses(_addresses)
            Toast.show({
                text1: translate("success"),
                text2: translate("addresses.address_deleted"),
                visibilityTime: 1500
            })
        }

        let error = (err) => {
            console.log("Remove Address error:", err, "\n", err.response.data)
            Toast.show({
                text1: translate("error"),
                text2: translate("network_error"),
                type: 'danger'
            })
        }

        apis.address.removeAddress(id, success, error)
    }

    return (
        <Layout level="1" style={{ flex: 1 }}>
            <Headers.HeaderNav />
            <View style={{ paddingHorizontal: 43 }}>
                <Button size="small" status="info" onPress={openBottomSheet}>+ {translate("addresses.add_new_address")}</Button>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {addresses.map((trg, index) => (
                    <AddressBox removeAddress={removeAddress} data={trg} key={index} />
                ))}
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <BottomSheet
                ref={BottomSheetRef}
                initialSnap={2}
                snapPoints={[height / 1.25, height / 1.25, 0]}
                borderRadius={15}
                renderContent={ShowAddAddressContent}
                enabledInnerScrolling={true}
            />
        </Layout>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAddresses: item => dispatch(UserActions.setAddresses(item))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);