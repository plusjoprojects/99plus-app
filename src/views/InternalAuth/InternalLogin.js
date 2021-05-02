import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Layout, Text, Button, Input, useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageToken } from "../../constants";
import { UserActions } from "../../stores";
import { apis } from "../../services";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import {translate} from '../../translations'
let InternalLogin = (props) => {
  let { width, height } = Dimensions.get("window");
  let { control, handleSubmit, errors } = useForm();
  let { setUser } = props;
  let theme = useTheme()

  let _Login = (data) => {
    let loginSuccess = async (res) => {
      // Set User And Token
      setUser(res.user);
      let token = res.token;
      await AsyncStorage.setItem(StorageToken.userToken, token);
      await AsyncStorage.setItem(StorageToken.firstTime, "false");
      Toast.show({
        text1: translate("success"),
        text2: translate("auth.login_success"),
        type: "success",
        onHide: () => {
          props.navigation.navigate("Checkout");
        },
        visibilityTime: 2000,
      });
    };

    let loginError = (err) => {
      console.log("login error:", err, "\n", err.response.data);
      let error = {
        text1: translate("error"),
        text2: translate("network_error"),
      };
      let message = err.response.data.message;
      if (message == "record not found") {
        error.text1 = translate("error");
        error.text2 = translate("auth.no_user");
      }
      if (
        message ==
        "crypto/bcrypt: hashedPassword is not the hash of the given password"
      ) {
        error.text1 = translate("error");
        error.text2 = translate("auth.register_error");
      }
      Toast.show({
        text1: error.text1,
        text2: error.text2,
        type: "error",
        autoHide: true,
      });
    };

    apis.auth.login(data, loginSuccess, loginError);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/logo/logo.png")}
              style={{ width: width / 3, height: width / 3 }}
              resizeMode="cover"
            />
            <View style={{ marginTop: "5%", paddingHorizontal: "10%" }}>
              <Controller
                control={control}
                name="phone"
                render={({ onChange, onBlur, value }) => (
                  <Input
                    onBlur={onBlur}
                    value={value}
                    keyboardType="phone-pad"
                    onChangeText={(value) => onChange(value)}
                    placeholder={translate("auth.phone")}
                    textStyle={{ textAlign: "right" }}
                    placeholderTextColor="black"
                    style={{ width: "100%", borderRadius: 50 }}
                    status={errors.phone ? "danger" : "default"}
                    caption={errors.phone ? translate("field_required") : ""}
                  />
                )}
                defaultValue=""
                rules={{ required: true }}
              />
              <Controller
                control={control}
                name="password"
                render={({ onChange, onBlur, value }) => (
                  <Input
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    onChangeText={(value) => onChange(value)}
                    placeholder={translate("auth.password")}
                    textStyle={{ textAlign: "right" }}
                    placeholderTextColor="black"
                    style={{ width: "100%", borderRadius: 50 }}
                    status={errors.password ? "danger" : "default"}
                    caption={errors.password ? translate("field_required") : ""}
                  />
                )}
                defaultValue=""
                rules={{ required: true }}
              />
            </View>
            <View style={{ marginTop: "5%", width: "50%" }}>
              <Button
                onPress={handleSubmit(_Login)}
                status="primary"
                style={{ borderRadius: 50 }}
              >
                {translate("auth.login")}
              </Button>
            </View>
            <View
              style={{
                position: "relative",
                height: "15%",
                width: "100%",
                marginTop: "5%",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{ height: 0.5, backgroundColor: "#f7f7f7" }}
                ></View>
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
            </View>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <Text> {translate("auth.not_have")}</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("InternalRegister");
                }}
              >
                <Text style={{ fontFamily: "CairoBold" }}> {translate("auth.register")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InternalLogin);
