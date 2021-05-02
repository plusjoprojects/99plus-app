import React from "react";
import { View } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme
} from "@ui-kitten/components";
import { translate } from "../../../translations";
import {MaterialIcons,Ionicons} from '@expo/vector-icons'

export default () => {
  const BackIcon = (props) => <Icon {...props} name="archive-outline" />;
  let theme = useTheme()
  const BackAction = () => (
    <View style={{marginHorizontal:5}}>
      <Ionicons name="clipboard-outline" style={{fontSize:22}} color={"black"} />
    </View>
  );

  const RightContent = () => (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Text style={{ color: theme['color-success-500'],fontFamily:'openSansBold',fontSize:22,marginHorizontal:1 }}>
        3
    </Text>
    <View style={{paddingTop:2}}>
    <MaterialIcons name="pending-actions" style={{fontSize:22}} color={"black"} />

    </View>
    </View>
    <View style={{width:3}}></View>
      <Text style={{paddingTop:2,fontSize:8,color:theme['text-hint-color'],marginBottom:2}}>قيد التنفيذ</Text>
    </View>
  )

  return (
    <TopNavigation accessoryRight={RightContent} accessoryLeft={BackAction} title="طلباتي" />
  );
};
