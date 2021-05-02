import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native'
import { translate } from '../../../translations';
export default ({data}) => {
    let navigation = useNavigation()
    let ListView = ({ title, value, bold = false }) => (
        <View
          style={{
            paddingVertical: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor:"#7e7e7e",
            borderBottomWidth: bold ? 0 : 0.5,
          }}
        >
          <Text category="s1" style={{ fontWeight: bold ? "bold" : "500",fontSize:12 }}>
            {title}
          </Text>
          <Text category="s1" style={{ fontWeight: bold ? "bold" : "500",fontFamily:'CairoBold',fontSize:12 }}>
            {value}
          </Text>
        </View>
      );
     return (
        <TouchableOpacity onPress={() => {navigation.navigate("OrderShow",{orderID:data.ID})}} style={{backgroundColor:'white',paddingHorizontal:15,paddingTop:25,marginTop:15,borderRadius:10}}>
            <ListView title={translate("order.date")} value={data.CreatedAt} bold={true}></ListView>
            <ListView title={translate("order.bill_id")} value={data.ID}></ListView>
            <ListView title={translate("order.status")} value={"مكتمل"}></ListView>
            <ListView title={translate("order.bill_total")} value={data.total.toFixed(2) + " " + translate("jod")}></ListView>
            <ListView title={translate("order.note")} value={data.note == "" ? "ـــــ":data.note}></ListView>
        </TouchableOpacity>
     )
}