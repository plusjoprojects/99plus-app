import React from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import {Text,useTheme} from '@ui-kitten/components'
import {translate} from '../../../translations'
import { colors } from '../../../constants';
export default (props) => {
    let {data,removeAddress} = props;
    let theme = useTheme()
    let ListView = ({ title, value, bold = false }) => (
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor:theme['color-info-200'],
            borderBottomWidth: bold ? 0 : 0.5,
          }}
        >
          <Text category="s1" style={{ fontWeight: bold ? "bold" : "500" }}>
            {title}
          </Text>
          <Text category="s1" style={{ fontWeight: bold ? "bold" : "500" }}>
            {value}
          </Text>
        </View>
      );
     return (
        <View
      style={{
        marginTop: 15,
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        borderColor:theme['color-info-200'],
        borderWidth: 1,
        backgroundColor:'white',
        marginHorizontal:10
      }}
    >
      <ListView
        title={translate("addresses.city")}
        value={data.city}
      />
      <ListView
        title={translate("addresses.area")}
        value={data.area}
      />
      <ListView
        title={translate("addresses.address")}
        value={data.address}
      />
      <ListView
        title={translate("addresses.note")}
        value={data.note}
      />
      <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor:theme['text-hint-color'],
            borderBottomWidth: 0
          }}
        >
        <TouchableOpacity onPress={() => {removeAddress(data.ID)}}>
        <Text category="s1" style={{ fontWeight: "bold",color:theme['text-danger-color'] }}>
           {translate("addresses.remove")}
          </Text>
        </TouchableOpacity>
          <Text category="s1" style={{ fontWeight: "bold",}}>
          </Text>
        </View>
    </View>
     )
}