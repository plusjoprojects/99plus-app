import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "@ui-kitten/components";
import { LinearGradient } from 'expo-linear-gradient';

export default ({count,size = "default"}) => {
  let theme = useTheme();
  let cs = {
    size: size == "default" ? 22:16,
    color: theme["color-primary-500"],
  };

  let styles = StyleSheet.create({
    box: {
      position: "absolute",
      left: -15,
      top: -5,
      borderRadius: cs.size / 2,
      overflow:'hidden'
    },
  });
  return (
  <View style={styles.box}>
      <LinearGradient colors={[theme['color-success-500'], theme['color-primary-500']]} style={{width:cs.size,height:cs.size,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:size == "default"?12:10,textAlign:'center',alignItems:'center',fontFamily:'CairoBold'}}>{count}</Text>
    </LinearGradient>
  </View>
  );
};
