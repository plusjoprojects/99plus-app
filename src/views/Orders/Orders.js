import React from "react";


// Views
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { AntDesign } from '@expo/vector-icons'
import HeaderNav from "./Components/HeaderNav";
import DetailCard from '../../components/Cards/DetailCard'
import OrderBox from "./Components/OrderBox";
import { TextBanner } from '../../components'


// Services
import { translate } from "../../translations";

// Stores
import { connect } from "react-redux";


// My Orders
let MyOrders = (props) => {
  let { orders } = props.user
  let { navigation } = props
  let theme = useTheme();

  let OrdersFilter = () => {
    /**
     * @return
     * paymentTotal
     * ordersTotal
     * successOrdersTotal
     */

    let paymentTotal = 0;
    let successOrdersTotal = 0;
    let ordersTotal = orders.length
    orders.forEach((trg, index) => {
      if (trg.status == 1) {
        successOrdersTotal = successOrdersTotal + 1;
      }
      paymentTotal = paymentTotal + trg.total
    })
    paymentTotal = paymentTotal.toFixed(2)
    return {
      paymentTotal,
      successOrdersTotal,
      ordersTotal
    }
  }

  let Details = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 5,
      }}
    >
    <View style={{ flex: 1 }}>
        <DetailCard value={OrdersFilter().ordersTotal} title={translate("order.order_total")} />
      </View>
      <View style={{ width: 0.50,height:'35%',backgroundColor:theme['color-info-200']   }}></View>
      <View style={{ flex: 1 }}>
        <DetailCard value={OrdersFilter().successOrdersTotal} title={translate("order.ended_order")} />
      </View>
      <View style={{ width: 0.50,height:'35%',backgroundColor:theme['color-info-200']  }}></View>
      <View style={{ flex: 1 }}>
        <DetailCard value={18} title={"عدد المنتجات"} />
      </View>
      
    </View>
  );
  let MoreDetails = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        paddingHorizontal: 5,
        paddingBottom:10
      }}
    >
      <View style={{ flex: 1 }}>
        <DetailCard value={OrdersFilter().paymentTotal} valueSubTitle={translate("jod")} title={"القيمة الأصلية"} />
      </View>
      <View style={{ width: 0.50,height:'35%',backgroundColor:theme['color-info-200'] }}></View>
      <View style={{ flex: 1 }}>
        <DetailCard value={OrdersFilter().paymentTotal} valueSubTitle={translate("jod")} title={"قيمة المشتريات"} />
      </View>
      <View style={{ width: 0.50,height:'35%',backgroundColor:theme['color-info-200']  }}></View>
      <View style={{ flex: 1 }}>
        <DetailCard value={OrdersFilter().paymentTotal} valueSubTitle={"20%"} valueSubTitleStyle={{color:theme['color-primary-500']}} title={"قيمة التوفير"} />
      </View>
    </View>
  )

  let HasOrders = () => (
    <View style={{ margin: 10,marginTop:40 }}>
      <TextBanner text={translate("order.order_list")} />
      {orders.map((trg, index) => (
        <OrderBox key={index} data={trg} />
      ))}
    </View>
  )

  let NoOrders = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AntDesign name="meh" style={{ fontSize: 64, color: theme['text-hint-color'] }} />
      <Text style={{ textAlign: 'center', fontSize: 18, color: theme['text-hint-color'] }}>
        {translate("order.no_old_orders")}
      </Text>
    </View>
  )


  let [pendingOrdersList, setPendingOrdersList] = React.useState([])
  let PendingOrders = () => {
    let _pendingOrders = []
    orders.forEach((_order, index) => {
      if (_order.status !== 3) {
        _pendingOrders.push(_order)
      }
    })

    setPendingOrdersList(_pendingOrders)
  }


  React.useEffect(() => {
    PendingOrders()
  }, [])

  return (
    <Layout style={{ flex: 1 }} level="1">
      <HeaderNav />
      <View style={{height:10}}></View>
      <Details />
        <MoreDetails />
      <ScrollView showsVerticalScrollIndicator={false}>
        {pendingOrdersList.length > 0 &&
          <View style={{ padding: 15,marginBottom:5 }}>
          <View style={{height:15}}></View>
          <TextBanner text="طلبات معلقة"></TextBanner>
            {pendingOrdersList.map((trg, index) => (
              <View key={index} style={{ padding: 15, paddingBottom: 5, marginTop: 5, backgroundColor: 'white',borderColor:theme['color-info-100'],borderWidth:1,borderRadius:5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                  <DetailCard value={trg.total.toFixed(2)} valueSubTitle={translate("jod")} valueStyle={{color:'black'}} title="مجموع الفاتورة" />
                  <DetailCard value={2}  title="عدد المواد" />
                  <DetailCard value={"48"} valueSubTitle={"ساعه"}  title="التوصيل خلال" />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("OrderShow", { orderID: trg.ID }) }} style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 8,textDecorationLine:'underline',textDecorationColor:theme['text-primary-color'],textDecorationStyle:'solid', fontFamily: 'CairoBold', color: theme['text-primary-color'] }}>التفاصيل</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        
        {orders.length > 0 &&
          <HasOrders />
        }
        {orders.length == 0 &&
          <NoOrders />
        }
        <View style={{ height: 75 }}></View>
      </ScrollView>

    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);