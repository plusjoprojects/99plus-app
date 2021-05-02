import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import {env} from '../../../constants'
import {translate} from '../../../translations'
export default ({data}) => {
  let theme = useTheme();
  let styles = StyleSheet.create({
    box: {
      width: "100%",
      marginTop: 5,
      backgroundColor: "white",
      borderRadius: 10,
      flexDirection: "row",
    },
    imageContainer: {
      borderRadius: 5,
      padding: 2,
    },
    imageBox: {
      width: 100,
      height: 100,
    },
    detailsBox: {
      padding: 10,
    },
  });
  return (
    <View style={styles.box}>
      <View style={{ flex: 1 }}>
        <View level="3" style={styles.detailsBox}>
          <Image
            source={{uri:env.server + env.itemImageSource + data.item.image}}
            style={styles.imageBox}
            resizeMode="center"
          />
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.detailsBox}>
          <View >
            <Text style={{ textAlign: "left",color:'black' }}>{data.item.title}</Text>
            <Text
              style={{
                fontSize: 12,
                color: theme["text-hint-color"],
                textAlign: "left",
              }}
            >
              {data.item.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>{data.total.toFixed(2) + ' ' + translate("jod")}</Text>
            </View>
            <View>
              <Text>x{data.qty}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
