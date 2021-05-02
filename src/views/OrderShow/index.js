import React from "react";
import { ScrollView,View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { OrderDetails, ItemsShow, StatusDetails } from "./Components";
import {apis} from '../../services'
import {HeaderNav} from '../../components'



export default (props) => {
  let { route } = props;
  let { orderID } = route.params;

  let [order, setOrder] = React.useState({});
  let [orderItems, setOrderItems] = React.useState([]);

  let Install = () => {
    let success = res => {
      setOrder(res.order),
      setOrderItems(res.orderItems)
    }
    let error = err => {
      console.log("Install Order Error",err,"\n",err.response.data)
    }

    apis.orders.showOrder(orderID,success,error)
  };

  React.useEffect(() => {
    Install();
  },[])

  return (
    <Layout style={{ flex: 1 }} level="1">
      <HeaderNav hasCart={false} />
      <OrderDetails order={order} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsShow orderItems={orderItems} />
        <StatusDetails order={order} />
        <View style={{height:100}}></View>
      </ScrollView>
    </Layout>
  );
};
