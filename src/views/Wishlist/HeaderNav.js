import React from "react";
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import {Ionicons} from '@expo/vector-icons'
import {View} from 'react-native'
import { translate } from "../../translations"

export default () => {
  const BackIcon = (props) => <Icon {...props} name="heart-outline" />;

  const BackAction = () => (
    <View style={{marginHorizontal:5}}>
      <Ionicons name={"heart-outline"} style={{fontSize:22}} color="black" />
    </View>
  );


  return (
    <TopNavigation accessoryLeft={BackAction} title={translate("wishlist.title")} />
  );
};
