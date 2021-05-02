import React from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Text, Icon, Layout, useTheme } from "@ui-kitten/components";
import { env } from "../../constants";
import { Basket, WishList,TranslationsMethods } from "../../services";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { translate } from "../../translations";
export default ({ data }) => {
  let theme = useTheme();
  let navigation = useNavigation();
  let AddToBasket = () => {
    Toast.show({
      text1: translate("success"),
      text2: translate("added_to_basket"),
    });
    // TODO: Fix itemStorageCount
    Basket.AddToBasket(data, 1);
  };

  let styles = StyleSheet.create({
    box: {
      width: "100%",
      padding: 10,
      backgroundColor: "white",
      borderRadius: 15,
    },
    imageContainer: {
      borderRadius: 10,
      padding: 5,
    },
    imageBox: {
      width: "100%",
      height: 100,
      borderRadius: 5,
    },
    title: {
      color: "black",
      fontSize: 14,
      textAlign: "left",
      marginTop: 3,
    },
    qtyBox: {
      marginTop: 5,
      paddingVertical: 1,
      paddingHorizontal: 5,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
    },
    qtyText: {
      color: theme["text-hint-color"],
      textAlign: "center",
      fontSize: 10,
      fontFamily: TranslationsMethods.ReturnFont("Bold"),
    },
    actionsPanel: {
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    priceText: {
      fontSize: 14,
      fontFamily: TranslationsMethods.ReturnFont("Bold"),
    },
    addButton: {
      width: 30,
      height: 30,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: "black",
    },
    plusIcon: {
      width: 15,
      height: 15,
    },
    heartIconBox: {
      position: "absolute",
      left: 0,
      top: 0,
      padding: 2,
    },
    heartIcon: {
      width: 25,
      height: 25,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Item", { itemID: data.ID });
      }}
      style={styles.box}
    >
      <Layout level="3" style={styles.imageContainer}>
        <Image
          source={{ uri: env.server + env.itemImageSource + data.image }}
          style={styles.imageBox}
          resizeMode="center"
        ></Image>
        
      </Layout>
      <Text style={styles.title}>{TranslationsMethods.ReturnValue("title",data.translations,data.item)}</Text>
      <Layout level="3" style={styles.qtyBox}>
        <Text style={styles.qtyText}>{translate("left")} 10</Text>
      </Layout>
      <View style={styles.actionsPanel}>
        <View>
          <Text style={styles.priceText}>{data.price + " " + translate("jod")}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={AddToBasket} style={styles.addButton}>
            <Icon name="plus-outline" style={styles.plusIcon} fill="black" />
          </TouchableOpacity>
        </View>
      </View>
      
    </TouchableOpacity>
  );
};
