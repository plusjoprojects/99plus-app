import React from "react";
import { View } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import {useNavigation} from '@react-navigation/native'
import {translate} from '../../../translations'
import {TranslationsMethods} from '../../../services'
export default () => {
  let navigation = useNavigation()
  const BackIcon = (props) => <Icon {...props} name={TranslationsMethods.ReturnIconArrowNav()} />;

  const BackAction = () => <TopNavigationAction onPress={() => {navigation.goBack()}} icon={BackIcon} />;


  return (
    <TopNavigation accessoryLeft={BackAction} title={translate("back")} />
  );
};
