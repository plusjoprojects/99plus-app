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
import { StorageToken } from "../../../constants";
import { UserActions } from "../../../stores";
import { apis } from "../../../services";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";

let Register = (props) => {
  let { control, handleSubmit, errors } = useForm();
  let { width, height } = Dimensions.get("window");
  let { setUser } = props;
  let theme = useTheme();
  let [localUser, setLocalUser] = React.useState({
    phone: "",
    password: "",
    name: "",
    role_id: 1000,
  });

  let onSkipAuth = async () => {
    await AsyncStorage.setItem(StorageToken.firstTime, "false");
    props.navigation.navigate("MainNavigation");
  };

  let _Register = (data) => {
    let registerSuccess = async (res) => {
      // Set User And Token
      setUser(res.user);
      let token = res.token;
      await AsyncStorage.setItem(StorageToken.userToken, token);
      await AsyncStorage.setItem(StorageToken.firstTime, "false");
      Toast.show({
           text1:"تم انشاء حساب جديد بنجاح",
           text2:'لقد قمت بانشاء حساب جديد لدينا',
           type:'success',
           onHide:() => {
               props.navigation.navigate("MainNavigation");
           },
           visibilityTime:2000
      })
    };

    let registerError = (err) => {
     //  console.log("Register error:", err, "\n", err.response.data);
      let error = { text1: "يوجد خطا غير معروف", text2: "الرجاء التأكد من المعلومات والمحاولة مرة أخرى" };
      let message = err.response.data.error;
      if(message.includes("Error 1062:")) {
           error.text1 = "يوجد مستخدم بهذا الرقم"
           error.text2 = "الرجاء التاكد من رقم الهاتف او قم بتسجيل الدخول"
      }
      Toast.show({
        text1: error.text1,
        text2: error.text2,
        type: "error",
        autoHide: true,
      });
    };

    apis.auth.register(data, registerSuccess, registerError);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/backgrounds/Background.jpg")}
        style={{ flex: 1, flexDirection: "column" }}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../../../assets/logo/logo.png")}
              style={{ width: width / 3, height: width / 3 }}
              resizeMode="cover"
            />
            <View style={{ marginTop: "5%", paddingHorizontal: "10%" }}>
            <Controller
                control={control}
                name="name"
                render={({ onChange, onBlur, value }) => (
                  <Input
                    onBlur={onBlur}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    placeholder="الأسم"
                    textStyle={{ textAlign: "right" }}
                    placeholderTextColor="black"
                    style={{ width: "100%", borderRadius: 50 }}
                    status={errors.name ? "danger" : "default"}
                    caption={errors.name ? "هذا الحقل مطلوب" : ""}
                  />
                )}
                defaultValue=""
                rules={{ required: true }}
              />
            <Controller
                control={control}
                name="phone"
                render={({ onChange, onBlur, value }) => (
                  <Input
                    onBlur={onBlur}
                    value={value}
                    keyboardType="phone-pad"
                    onChangeText={(value) => onChange(value)}
                    placeholder="رقم الهاتف"
                    textStyle={{ textAlign: "right" }}
                    placeholderTextColor="black"
                    style={{ width: "100%", borderRadius: 50 }}
                    status={errors.phone ? "danger" : "default"}
                    caption={errors.phone ? "هذا الحقل مطلوب" : ""}
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
                    placeholder="رمز المرور"
                    textStyle={{ textAlign: "right" }}
                    placeholderTextColor="black"
                    style={{ width: "100%", borderRadius: 50 }}
                    status={errors.password ? "danger" : "default"}
                    caption={errors.password ? "هذا الحقل مطلوب" : ""}
                  />
                )}
                defaultValue=""
                rules={{ required: true }}
              />
            </View>
            <View style={{ marginTop: "5%", width: "50%" }}>
              <Button
                onPress={handleSubmit(_Register)}
                status="primary"
                style={{ borderRadius: 50 }}
              >
                حساب جديد
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
              <TouchableOpacity
                onPress={() => {
                  onSkipAuth();
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: width / 5,
                    width: width / 5,
                    borderRadius: width / 5 / 2,
                    backgroundColor: theme["color-primary-500"],
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.5,
                    borderColor: "#f7f7f7",
                  }}
                >
                  <Text
                    style={{ textAlign: "center", fontFamily: "CairoBold" }}
                  >
                    تخطي
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <Text>هل تملك حساب ؟</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("IntroLogin");
                }}
              >
                <Text style={{ fontFamily: "CairoBold" }}> تسجيل الدخول</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
