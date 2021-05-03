import React from "react";
import { View, Image, Dimensions, Pressable, TouchableOpacity, Animated } from "react-native";
import { Text, Button, Icon, Layout, useTheme, ButtonGroup } from "@ui-kitten/components";
import { colors, env } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { WishList, Basket, TranslationsMethods } from '../../services'
import Toast from 'react-native-toast-message'
import { translate } from '../../translations'
import { useFocusEffect } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'
import DetailCard from './DetailCard'
import {connect} from 'react-redux'



let CardSpecial = (props) => {
  // Global Props //
  let navigation = useNavigation();
  let theme = useTheme();
  let { height, width } = Dimensions.get("window");
  // Item Props
  let { data,wishListItems } = props;
  let [inWishList, setInWishList] = React.useState(false)
  let [added, setAdded] = React.useState(false)
  let [qty, setQty] = React.useState(1)
  let cs = {
    fullWidth: width / 2.9,
    borderRadius: 10,
  };
  // Animation Props
  let animatedAddButton = React.useRef(new Animated.Value(1)).current

  // Check its in the wish List
  let installWishListChecker = () => {
    setInWishList(WishList.CheckIsInWishList(data.ID))
  }

  // Check is item in basket
  let installBasketChecker = async () => {
    let item = await Basket.CheckItemInBasket(data.ID)
    if (item) {
      setAdded(true)
      setQty(item.qty)
    }
  }

  // Add Item To Basket
  let AddToBasket = () => {
    Toast.show({
      text1: translate("success"),
      text2: translate("item.added_success"),
      type: 'success',
      visibilityTime: 500,
      position: 'bottom'
    })
    Basket.AddToBasket(data, 1)
  }
  // Add Locale Function
  let TryAnimated = () => {
    AddToBasket()
    Animated.timing(animatedAddButton, {
      toValue: 0, duration: 300, useNativeDriver: true
    }).start()
    setTimeout(() => {
      setAdded(true)
      Animated.timing(animatedAddButton, {
        toValue: 1, duration: 300, useNativeDriver: true
      }).start()
    }, 300);
  }


  useFocusEffect(
    React.useCallback(() => {
      installWishListChecker();
      installBasketChecker();
    }, [])
  );

  // Views Functions 
  let ReturnPrice = () => {
    let _price = data.price
    return _price.toFixed(2)
  }

  let ItemBanner = () => {
    if (data.discount !== 0) {
      return (
        <View style={{ position: 'absolute', left: 0, top: 10 }}>
          <View style={{ paddingHorizontal: 7, paddingVertical: 3, backgroundColor: theme['color-danger-500'], borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
            <Text style={{ color: 'white', fontFamily: TranslationsMethods.ReturnFont("Bold"), textAlign: 'center', fontSize: 10 }}>{translate("discount")} %</Text>
          </View>
        </View>
      )
    }
    if (data.new == true) {
      return (
        <View style={{ position: 'absolute', left: 0, top: 10 }}>
          <View style={{ paddingHorizontal: 7, paddingVertical: 3, backgroundColor: theme['color-success-700'], borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
            <Text style={{ color: 'white', fontFamily: TranslationsMethods.ReturnFont("Bold"), textAlign: 'center', fontSize: 10 }}>{translate("new")} +</Text>
          </View>
        </View>
      )
    }
    return null;
  }

  // Add Locale Function
  let BackAnimation = () => {
    Basket.RemoveItemFromBasket(data.ID)
    Animated.timing(animatedAddButton, {
      toValue: 0, duration: 300, useNativeDriver: true
    }).start()
    setTimeout(() => {
      setAdded(false)
      Animated.timing(animatedAddButton, {
        toValue: 1, duration: 300, useNativeDriver: true
      }).start()
    }, 300);
  }

  let ChangeQtyLocal = (type) => {
    if (type == "+") {
      if (data.storagesItems.qty > qty) {
        setQty(qty + 1)
        Basket.ChangeQty(data.ID, "+")
      }
    } else {
      if (qty !== 1) {
        setQty(qty - 1)
        Basket.ChangeQty(data.ID, "-")
      } else {
        BackAnimation()
      }
    }
  }




  let ActionButtons = () => {
    return (
      <Animated.View style={{ paddingTop: '4%', transform: [{ scaleX: animatedAddButton }] }}>
        {added &&
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Button onPress={() => { ChangeQtyLocal("+") }} size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 18, color: theme['color-success-700'], fontFamily: 'CairoBold' }}>+</Text>}</Button>
            </View>
            <View style={{ flex: 2 }}>
              <Button size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 16, color: theme['color-info-400'], fontFamily: 'CairoBold' }}>{qty}</Text>}</Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button onPress={() => { ChangeQtyLocal("-") }} size="tiny" status="info" style={{ height: 30, paddingVertical: 0, borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'white', borderColor: colors.moreWhite }}>{evaProps => <Text {...evaProps} style={{ fontSize: 20, color: theme['color-danger-700'], fontFamily: 'CairoBold' }}>-</Text>}</Button>
            </View>
          </View>
        }
        {!added &&
          <Button
            status="info"
            size="tiny"
            // onPress={AddToBasket}
            onPress={TryAnimated}
            disabled={data.storagesItems.qty == 0 ?true:false}
            style={{ borderRadius: 5, height: 30, paddingVertical: 0 }}
          >
            {evaProps => <Text {...evaProps} style={{ fontSize: 12, color: 'white', fontFamily: 'CairoBold' }}>{data.storagesItems.qty == 0 ?"نفذ من المخزون":"اضافة الى السلة"}</Text>}
          </Button>
        }
        

      </Animated.View>
    )
  }


  return (
    <View
      style={{
        padding: 5,
        borderRadius: 5,
        backgroundColor: "white",
        marginHorizontal: 2,
        borderWidth: 1,
        borderColor: colors.moreWhite
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Layout level="2" style={{ flex: 1, padding: 2, borderRadius: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Item", { itemID: data.ID });
            }}
          >
            <Image
              source={{ uri: env.server + env.itemImageSource + data.image }}
              style={{ width: cs.fullWidth, height: cs.fullWidth, borderRadius: 5 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </Layout>
        <View
          style={{
            flex: 2,
            width: width / 2,
            paddingLeft: 2
          }}
        >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View>
              <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, }}>
                  {/* <Icon
                    name={"share-outline"}
                    fill={theme['text-hint-color']}
                    style={{ width: 22, height: 22 }}
                  /> */}
                </View>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("Item", { itemID: data.ID });
                }} style={{ flex: 2, paddingHorizontal: 5 }}>
                  <Text style={{
                    color: theme["text-basic-color"],
                    fontFamily: TranslationsMethods.ReturnFont("Bold"),
                    textAlign: "center",
                    overflow: "hidden",
                    fontSize: 10
                  }}>{TranslationsMethods.ReturnValue("title", data.translations, data.title)}</Text>
                </TouchableOpacity>
                <Pressable onPress={async () => {
                  if (!inWishList) {
                    setInWishList(true)
                    await WishList.StoreWishListItem(data.ID)
                  } else {
                    setInWishList(false)
                    await WishList.RemoveItemFromWishList(data.ID)
                  }
                }} style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Ionicons
                    name={wishListItems.includes(data.ID) ? "heart" : "heart-outline"}
                    color={wishListItems.includes(data.ID) ? theme['text-danger-color'] : theme['text-hint-color']}
                    style={{ fontSize:22}}
                  />
                </Pressable>
              </View>
              <View>
                <TouchableOpacity onPress={() => { navigation.navigate("Item", { itemID: data.ID }); }} style={{ paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <DetailCard size="small" value={data.original_price.toFixed(2)} title="السعر الاصلي" valueSubTitle={translate("jod")} valueStyle={{ textDecorationStyle: 'solid', textDecorationLine: 'line-through', textDecorationColor: theme['text-primary-color'] }} />
                  <DetailCard size="small" value={data.storagesItems.qty} title="الكمية المتبقية" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate("Item", { itemID: data.ID }); }} style={{ width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 2 }}>
              <DetailCard value={ReturnPrice()} valueStyle={{ color: 'black' }} valueSubTitle={translate("jod")}></DetailCard>
            </View>
            <View style={{ flex: 1 }}></View>
          </TouchableOpacity>
          <ActionButtons />
        </View>
      </View>
      {ItemBanner()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    wishListItems: state.items.wishListItems
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSpecial);