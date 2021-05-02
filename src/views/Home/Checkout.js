import React from "react";

// Views
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { CardCheckout } from '../../components'


// Services
import { useNavigation } from '@react-navigation/native';
import { translate } from '../../translations'


// Stores
import { connect } from "react-redux";
import { OrdersActions } from '../../stores'
let Checkout = (props) => {
  let { width } = Dimensions.get("screen");
  let { closePanel, orders, user } = props;
  let navigation = useNavigation()

  let { orderItems } = orders
  let theme = useTheme();


  let EmptyContent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AntDesign name="meh" style={{ fontSize: 64, color: theme['text-hint-color'] }} />
      <Text style={{ color: theme['text-hint-color'], marginTop: 15, fontSize: 14, textAlign: 'center' }}>{translate("main.basket_empty")}</Text>
    </View>
  )


  let CategoryTotal = (items) => {
    let total = 0
    items.forEach((trg) => {
      let itemTotal = trg.item.price * trg.qty
      total = total + itemTotal
    })

    return total.toFixed(2)
  }

  let CategoryTitleView = ({ title, items, color = theme['color-primary-500'] }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
      <View style={{ height: '100%', width: 4, backgroundColor: color, borderRadius: 1 }}></View>
      <View style={{ width: 5 }}></View>
      <Text style={{ fontFamily: 'CairoBold' }}>{title}</Text>
      <View style={{ paddingHorizontal: 5 }}>
        <Text style={{ color: theme['text-hint-color'], fontSize: 12 }}>({CategoryTotal(items) + ' ' + translate("jod")})</Text>
      </View>
    </View>
  )

  let BillTotal = () => {
    let total = 0
    orderItems.forEach((trg) => {
      trg.items.forEach((item) => {
        let ItemTotal = item.item.price * item.qty
        total = total + ItemTotal
      })
    })

    return total.toFixed(2);
  }


  let ItemsCount = () => {
    let length = 0
    orderItems.forEach((trg) => {
      trg.items.forEach((item) => {
        length = length + item.qty
      })
    })

    return length;
  }


  let TotalOriginalPrice = () => {
    let total = 0
    orderItems.forEach((trg) => {
      trg.items.forEach((item) => {
        let ItemTotal = item.item.original_price * item.qty
        total = total + ItemTotal
      })
    })

    return total.toFixed(2);
  }


  let ProvideTotal = () => {
    let TotalOriginal = TotalOriginalPrice()
    let _BillTotal = BillTotal()


    let provide = TotalOriginal - _BillTotal

    return provide.toFixed(2)
  }

  let PTotal = () => {
    let TotalOriginal = TotalOriginalPrice()
    let _BillTotal = BillTotal()

    let provide = TotalOriginal - _BillTotal

    let p = provide / TotalOriginal
    p = p * 100

    return p.toFixed(0);
  }

  let ActionsBox = () => (
    <View>
      <View style={{ width: '100%', justifyContent: 'center', backgroundColor: 'white', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 24, color: theme['text-info-color'] }}>{BillTotal()}</Text>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 8, color: theme['text-hint-color'] }}>دينار</Text>
          </View>
          <Text style={{ fontFamily: 'OpenSans', color: theme['text-hint-color'], fontSize: 10 }}>مجموع الفاتورة</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 14, color: theme['text-hint-color'] }}>{ItemsCount()}</Text>
          </View>
          <Text style={{ fontFamily: 'OpenSans', color: theme['text-hint-color'], fontSize: 10 }}>مجموع المواد</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 14, color: theme['text-hint-color'], textDecorationStyle: 'solid', textDecorationColor: theme['text-hint-color'], textDecorationLine: 'line-through' }}>{TotalOriginalPrice()}</Text>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 8, color: theme['text-hint-color'] }}>دينار</Text>
          </View>
          <Text style={{ fontFamily: 'OpenSans', color: theme['text-hint-color'], fontSize: 10 }}>السعر الحقيقي</Text>
        </View>
      </View>
      <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 14, color: theme['text-hint-color'] }}>{ProvideTotal()}</Text>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 8, color: theme['text-hint-color'] }}>دينار</Text>
            <Text style={{ fontFamily: 'openSansBold', fontSize: 8, color: theme['text-danger-color'], position: "absolute", left: 45, top: 0 }}>(-{PTotal() + '%'})</Text>
          </View>
          <Text style={{ fontFamily: 'OpenSans', color: theme['text-hint-color'], fontSize: 10 }}>قيمة التوفير</Text>
        </View>
        <View style={{ paddingTop: 5, flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'openSansBold', fontSize: 14, color: theme['text-hint-color'] }}>48 ساعه</Text>
          <Text style={{ fontFamily: 'OpenSans', color: theme['text-hint-color'], fontSize: 10 }}>التوصيل خلال</Text>
        </View>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 5, paddingHorizontal: 43 }}>
        <Button size="small" status="info" onPress={() => { navigation.navigate(user.auth ? "Checkout" : "InternalLogin") }}>الدفع</Button>
      </View>
    </View>
  )
  return (
    <BlurView intensity={75} style={styles.fullContainer}>
      <Layout level="1" style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="ios-cart-outline"
              style={{ color: "black", fontSize: 26 }}
            />
            <View style={{ width: 6.1 }}></View>
            <Text style={{ color: "black", fontSize: 22 }}>{translate("main.basket")}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              closePanel();
            }}
          >
            <Feather
              name="minus-square"
              style={{ color: theme["color-danger-500"], fontSize: 22 }}
            />
          </TouchableOpacity>
        </View>
        {orderItems.length == 0 &&
          <EmptyContent />
        }
        {orderItems.length > 0 &&
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <ActionsBox />
            </View>
            <View style={{ flex: 2 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {orderItems.map((trg) => (
                    <View key={trg.category} style={{ paddingBottom: '3.2%', paddingTop: 10 }}>
                      <CategoryTitleView color={trg.category == "أدوات منزلية" ? theme['color-warning-500'] : theme['color-primary-500']} title={trg.category} items={trg.items} />
                      <ScrollView contentContainerStyle={{ paddingTop: 5 }} showsHorizontalScrollIndicator={false} horizontal={true}>
                        {trg.items.map((item, index) => (
                          <View key={index} style={{ width: width / 2.6, marginHorizontal: 2 }}>
                            <CardCheckout item={item} />
                          </View>
                        ))}
                      </ScrollView>

                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        }
      </Layout>
    </BlurView>
  );
};

let styles = StyleSheet.create({
  fullContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    zIndex: 100,
  },
  container: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "87%",
    padding: 1,
    paddingHorizontal: 10,
    borderColor: "#f7f7f7",
    borderWidth: 0.5,
    borderRadius: 5,
    zIndex: 104,
  },
});

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderItems: item => dispatch(OrdersActions.setOrderItems(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);