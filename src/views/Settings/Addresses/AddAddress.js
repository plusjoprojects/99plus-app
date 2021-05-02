import React from "react";
import {
  View,
  InputAccessoryView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon, Text, Input, Button, Layout, Spinner } from "@ui-kitten/components";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message'
import * as Location from 'expo-location';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { apis } from '../../../services'
import { UserActions } from '../../../stores'
import {translate} from '../../../translations'
let AddAddress = ({ user, closeBottomSheet, setAddresses }) => {
  let { control, handleSubmit, errors, reset } = useForm();
  let cityRef = React.useRef();
  let areaRef = React.useRef();
  let addressRef = React.useRef()
  let noteRef = React.useRef()

  let [lat, setLat] = React.useState(0)
  let [long, setLong] = React.useState(0)
  let [load, setLoad] = React.useState(false)


  // Store New Address
  let Store = (data) => {
    setLoad(true)
    data = { ...data, user_id: user.user.ID, lat: lat, long: long }
    let onSuccess = (res) => {
      setAddresses([...user.addresses, res.address])
      Toast.show({
        text1: translate("success") ,
        text2: translate("add_success"),
        visibilityTime: 1000,
        type: 'success'
      })

      setLoad(false)
      reset()
      closeBottomSheet()
    }
    let onError = (err) => {
      console.log("Add Address Error", err, "\n", err.response.data)
      Toast.show({
        text1: translate("error"),
        text2: translate("network_error"),
        visibilityTime: 2000,
        type: 'error'
      })
      setLoad(false)
    }
    apis.address.storeAddress(data, onSuccess, onError)
  };


  let TakeMyLocation = async () => {
    setLoad(true)
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        text1: translate("error"),
        text2: translate("addresses.location_error"),
        type: 'error'
      })
      setLoad(false)
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLoad(false)
    setLat(location.coords.latitude)
    setLong(location.coords.longitude)
    Toast.show({
      text1: translate("success"),
      text2: translate("addresses.location_success")
    })
  }


  return (
    <View style={{ height: "100%", backgroundColor: "white", padding: 15 }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontSize: 18,
            fontFamily: "CairoBold",
          }}
        >
          {translate("addresses.add_new_address")}
        </Text>
        <View style={{ marginTop: "5%" }}></View>
        <Controller
          control={control}
          name="city"
          render={({ onChange, onBlur, value }) => (
            <Input
              onBlur={onBlur}
              value={value}
              autoCorrect={false}
              onChangeText={(value) => onChange(value)}
              placeholder={translate("addresses.city")}
              textStyle={{ textAlign: "right" }}
              placeholderTextColor="black"
              status={errors.city ? "danger" : "default"}
              caption={errors.city ? translate("field_required"): ""}
              inputAccessoryViewID="cityAccessory"
              ref={cityRef}
            />
          )}
          defaultValue=""
          rules={{ required: true }}
        />
        <InputAccessoryView nativeID="cityAccessory">
          <Layout level="3" style={styles.accessory}>
            <View style={{ width: 5 }}></View>
            <TouchableOpacity
              onPress={() => {
                areaRef.current.focus();
              }}
            >
              <Icon
                name="arrow-ios-downward-outline"
                style={{ width: 38, height: 38 }}
                fill="black"
              />
            </TouchableOpacity>
          </Layout>
        </InputAccessoryView>
        <Controller
          control={control}
          name="area"
          render={({ onChange, onBlur, value }) => (
            <Input
              onBlur={onBlur}
              value={value}
              autoCorrect={false}
              onChangeText={(value) => onChange(value)}
              placeholder={translate("addresses.area")}
              ref={areaRef}
              textStyle={{ textAlign: "right" }}
              placeholderTextColor="black"
              status={errors.area ? "danger" : "default"}
              caption={errors.area ? translate("field_required") : ""}
              inputAccessoryViewID="areaID"
            />
          )}
          defaultValue=""
          rules={{ required: true }}
        />
        <InputAccessoryView nativeID="areaID">
          <Layout level="3" style={styles.accessory}>
            <TouchableOpacity
              onPress={() => {
                cityRef.current.focus();
              }}
            >
              <Icon
                name="arrow-ios-upward-outline"
                style={{ width: 38, height: 38 }}
                fill="black"
              />
            </TouchableOpacity>

            <View style={{ width: 5 }}></View>
            <TouchableOpacity
              onPress={() => {
                addressRef.current.focus();
              }}
            >
              <Icon
                name="arrow-ios-downward-outline"
                style={{ width: 38, height: 38 }}
                fill="black"
              />
            </TouchableOpacity>
          </Layout>
        </InputAccessoryView>
        <Controller
          control={control}
          name="address"
          render={({ onChange, onBlur, value }) => (
            <Input
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              placeholder={translate("addresses.address")}
              textStyle={{ textAlign: "right" }}
              placeholderTextColor="black"
              status={errors.address ? "danger" : "default"}
              caption={errors.address ? translate("field_required") : ""}
              inputAccessoryViewID="addressID"
              autoCorrect={false}
              ref={addressRef}
            />
          )}
          defaultValue=""
          rules={{ required: false }}
        />
        <InputAccessoryView nativeID="addressID">
          <Layout level="3" style={styles.accessory}>
            <TouchableOpacity
              onPress={() => {
                areaRef.current.focus();
              }}
            >
              <Icon
                name="arrow-ios-upward-outline"
                style={{ width: 38, height: 38 }}
                fill="black"
              />
            </TouchableOpacity>

            <View style={{ width: 5 }}></View>
            <TouchableOpacity
              onPress={() => {
                noteRef.current.focus();
              }}
            >
              <Icon
                name="arrow-ios-downward-outline"
                style={{ width: 38, height: 38 }}
                fill="black"
              />
            </TouchableOpacity>
          </Layout>
        </InputAccessoryView>
        <Controller
          control={control}
          name="note"
          render={({ onChange, onBlur, value }) => (
            <Input
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              placeholder={translate("addresses.note")}
              textStyle={{ textAlign: "right" }}
              placeholderTextColor="black"
              autoCorrect={false}
              ref={noteRef}
              inputAccessoryViewID="noteID"
            />
          )}
          defaultValue=""
          rules={{ required: false }}
        />
        <InputAccessoryView nativeID="noteID">
          <Layout level="3" style={styles.accessory}>
            <TouchableOpacity
              onPress={() => {
                addressRef.current.focus();
              }}
            >
              <Icon
                name="arrow-ios-upward-outline"
                style={{ width: 38, height: 38 }}
                fill="black"
              />
            </TouchableOpacity>

            <View style={{ width: 5 }}></View>
          </Layout>
        </InputAccessoryView>

        <View style={{ marginVertical: 15, flexDirection: 'row' }}>
          <Button accessoryLeft={(props) => (<Icon {...props} name="navigation-2-outline" />)} onPress={TakeMyLocation} status="primary">{translate("addresses.take_location")}</Button>
        </View>

        <Button
          style={{ marginTop: 30 }}
          status="info"
          onPress={handleSubmit(Store)}
        >
          {translate("addresses.add")}
        </Button>
      </KeyboardAwareScrollView>
      {load &&
        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.01)', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner status="primary" />
        </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  accessory: {
    width: Dimensions.get("window").width,
    height: 48,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 8,
    zIndex: 104,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAddresses: item => dispatch(UserActions.setAddresses(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
