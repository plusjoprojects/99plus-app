import React from "react";


// Views
import { View, ScrollView, } from "react-native";
import { Layout, Icon,Button, Text, useTheme } from "@ui-kitten/components";
import { CardNormal } from '../../components'
import HeaderNav from './HeaderNav'
import Toast from "react-native-toast-message";
import DetailCard from '../../components/Cards/DetailCard'
import {Ionicons} from '@expo/vector-icons'

// Services
import { apis, WishList, Basket } from "../../services";
import { translate } from "../../translations";
import { useFocusEffect } from '@react-navigation/native'


// Stores
import { connect } from "react-redux";


// ------- Wish List ------------ //
let Wishlist = (props) => {
  let { items } = props;
  let { wishListItems } = items;
  let [itemsList, setItemsList] = React.useState([]);
  let theme = useTheme()

  let install = () => {
    let success = (res) => {
      setItemsList(res.items);
    };
    let error = (err) => {
      console.log("Install Index WishList Error", err, "\n", err.response.data);
    };

    if (wishListItems.length > 0) {
      apis.main.indexItemsWithIDS({ ids: wishListItems }, success, error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      install()
    }, [])
  );


  let AddAllToBasket = async () => {
    itemsList.forEach((trg) => {
      Basket.AddToBasket(trg, 1)
    })
    Toast.show({
      text1:'تمت العملية بنجاح',
      text2:'تم اضافة جميع المواد الى السلة',
      visibilityTime:3000
    })
    await WishList.RemoveAllItems()
    setItemsList([])
  }

  let BillTotal = () => {
    let total = 0
    itemsList.forEach((trg) => {
      total = total + trg.price
    })
    return total.toFixed(2);
  }
  let TotalOriginalPrice = () => {
    let total = 0
    itemsList.forEach((trg) => {
      total = total + trg.original_price
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


  return (
    <Layout style={{ flex: 1 }} level="1">
      <HeaderNav  />
      {itemsList.length > 0 &&
        <View style={{ padding: 5, paddingTop: 0, paddingHorizontal: 30, backgroundColor: "white" }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{flex:1}}>
            <DetailCard title="مجموع المواد" value={itemsList.length} />
          </View>
          <View style={{flex:1}}>
            <DetailCard title="السعر الأصلي" valueSubTitle={"دينار"} valueStyle={{textDecorationStyle:'solid',textDecorationColor:theme['color-primary-500'],textDecorationLine:'line-through'}} value={TotalOriginalPrice()} />
          </View>
          <View style={{flex:1}}>
            <DetailCard title="قيمة التوفير"  valueSubTitle={"دينار"} value={ProvideTotal()} />
          </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10,paddingBottom:8 }}>
            <DetailCard value={BillTotal()} title="قيمة المواد" valueSubTitle={"دينار"} valueStyle={{color:'black'}} size="x-large" />
          </View>
          <View style={{paddingTop:5,paddingHorizontal:43,paddingBottom:10}}>
            <Button size="tiny" onPress={AddAllToBasket} status="info">اضافة الكل الى السلة</Button>
          </View>
        </View>
      }
      {itemsList.length == 0 &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <Ionicons name="heart-outline" style={{fontSize:24}} color="black" />
          <Text style={{ textAlign: 'center', fontSize: 16, color: theme['text-hint-color'] }}>{translate("wishlist.no_items")}</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: theme['text-hint-color'] }}>{translate("wishlist.add_some_items")}</Text>
        </View>
      }
      {itemsList.length > 0 &&
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {itemsList.map((trg, index) => (
              <View style={{ width: "49%", marginHorizontal: 1, marginTop: 15 }} key={index}>
                <CardNormal data={trg} />
              </View>
            ))}
          </View>
          <View style={{height:100}}></View>
        </ScrollView>
      }
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
