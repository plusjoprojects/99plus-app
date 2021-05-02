import React from "react";

// Views
import { View, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Text, useTheme, Icon } from "@ui-kitten/components";
import { CardNormal } from "../../../components"
import { LinearGradient } from 'expo-linear-gradient';

// Services
import { colors, env } from "../../../constants";
import { TranslationsMethods } from '../../../services'
import { useNavigation } from '@react-navigation/native'
// Stores
import { connect } from "react-redux";


// ------------ CategoriesItemsList -------------- //
let CategoriesItemsList = (props) => {
  // Global Props
  let { width } = Dimensions.get("window");
  let { data } = props;
  let navigation = useNavigation()
  let theme = useTheme()


  // View More Button
  let ViewMore = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'CairoBold', fontSize: 14, color: theme['text-hint-color'] }}>عرض الجميع</Text>
        <View style={{ paddingTop: 3 }}>
          <Icon name={TranslationsMethods.ReturnIconArrowSettings()} style={{ height: 30, width: 30 }} fill={theme['text-hint-color']} />
        </View>
      </View>
    </TouchableOpacity>
  )


  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 50,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: 'center',
        paddingHorizontal: 1,
      }}
    >
      <View
        style={{
          flex: 4,
          backgroundColor: "white",
          borderRadius: 5,
          height: 282,
          borderColor: colors.moreWhite,
          borderWidth: 1,
          overflow:'hidden'
        }}
      >
      <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5,overflow:'hidden' }}>
      <LinearGradient colors={[theme['color-success-500'], theme['color-primary-500']]} >
          <Text
            style={{
              color: "black",
              fontSize: 14,
              textAlign: "center",
              borderRadius: 5
            }}
          >
            {TranslationsMethods.ReturnValue("title", data.category.translations, data.category.title)}
          </Text>
        </LinearGradient>
      </View>
        
        <TouchableOpacity onPress={() => { navigation.navigate("Category", { categoryID: data.category.ID }) }} style={{ width: '100%', height: 230, justifyContent: 'center' }}>
          <Image
            source={{
              uri: env.server + env.categoryImageSource + data.category.image,
            }}
            style={{ width: '100%', height: 150 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 15 }}></View>
      <View style={{ flex: 9, paddingTop: 10 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 5 }}
          horizontal={true}
        >
          {data.items.map((trg, index) => (
            <View
              key={index}
              style={{ width: width / 2.5, marginHorizontal: 2 }}
            >
              <CardNormal data={trg} />
            </View>
          ))}
          <ViewMore onPress={() => { navigation.navigate("Category", { categoryID: data.category.ID }) }} />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesItemsList);
