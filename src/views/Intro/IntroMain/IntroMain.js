import React from "react";
import { View, Image, Dimensions,ImageBackground } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

export default (props) => {
  let { width, height } = Dimensions.get("window");
  return (
    <ImageBackground
    source={require('../../../assets/backgrounds/Background.jpg')}
      level="3"
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../../assets/logo/logo.png")}
        style={{ width: width / 2, height: width / 2 }}
        resizeMode="cover"
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: "10%",
          marginTop:30
        }}
      >
        <Text style={{ fontSize: 22, fontFamily: "CairoBold" }}>
          من الأن, نحن متجرك المفضل !
        </Text>
        <Text style={{ textAlign: "center",marginTop:15 }}>
          يمكنك أن تحصل على أرخص الأسعار لدينا, بأجود الأنواع وبكل سهولة قم بالشراء.
        </Text>
      </View>
      <View style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}>
        <Button
          onPress={() => {
            props.navigation.navigate("IntroLogin");
          }}
          style={{
            backgroundColor: "black",
            borderRadius: 0,
            borderColor: "black",
          }}
        >
          التالي
        </Button>
      </View>
    </ImageBackground>
  );
};
