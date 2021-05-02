import React from "react";

// Views 
import { View, StyleSheet, Image, ScrollView,TouchableOpacity } from "react-native";
import { Text,useTheme } from "@ui-kitten/components";

// services
import {env} from '../../../constants'
import {TranslationsMethods} from '../../../services'
import { useNavigation } from '@react-navigation/native';
import { translate } from "../../../translations";

// Stores
import { connect } from "react-redux";

// ----------- Categories List --------- //
let CategoriesList = (props) => {

  // Global Props
  let navigation = useNavigation()
  let {closePanel} = props;
  let theme = useTheme()
  let {categories} = props.categories

  // Categories Box ... 
  let CategoryBox = ({data}) => (
    <TouchableOpacity onPress={() => {navigation.navigate("Category",{categoryID:data.ID})}} style={{ justifyContent: "center", alignItems: "center",marginBottom:10,paddingBottom:5,borderBottomColor:theme['color-primary-500'],borderBottomWidth:0.5 }}>
      <Image
        source={{uri:env.server + env.categoryImageSource + data.image}}
        style={{ width: 25, height: 25 }}
        resizeMode="contain"
      />
      <Text style={{ textAlign: "center",fontSize:8,fontFamily:"CairoBold" }}>{TranslationsMethods.ReturnValue("title",data.translations,data.title)}</Text>
    </TouchableOpacity>
  );

  // Render
  return (
      <View style={styles.container}>
        <Text style={{ textAlign: "left" ,fontFamily:TranslationsMethods.ReturnFont("Bold"),fontSize:12,textAlign:'center'}}>{translate("main.categories")}</Text>
        <View style={{ height: 15 }}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map((trg,index) => (
            <CategoryBox key={index} data={trg} />
          ))}
        </ScrollView>
      </View>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 5,
    zIndex:101,
  }
});

const mapStateToProps = (state) => {
  return {
    categories:state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
