import React from "react";
import { View } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { translate } from "../../../../translations";
import {MaterialIcons,Ionicons} from '@expo/vector-icons'

export default () => {
  const BackIcon = (props) => <Icon {...props} name="settings-2-outline" />;

  const BackAction = () => (
    <View style={{marginHorizontal:5}}>
      <Ionicons name="person-outline" style={{fontSize:22}} color={"black"} />
    </View>
  );


  return (
    <View style={{padding:15}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Ionicons name="person-outline" style={{fontSize:22}} color={"black"} />
        <View style={{width:10}}></View>
        <Text style={{fontSize:18}}>الأعدادات</Text>
      </View>
    </View>
  );
};
