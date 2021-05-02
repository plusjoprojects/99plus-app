import React from "react";

// Views
import { View, Image, ScrollView,TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";

// services
import {env} from '../../../constants'
import {TranslationsMethods} from '../../../services'
import { translate } from "../../../translations";


// SubCategoriesList
export default ({subCategories,ChangeSubCategories}) => {
  let CategoryBox = ({data}) => (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderBottomColor: "#f7f7f7",
        borderBottomWidth: 1,
      }}
      onPress={() => {
        ChangeSubCategories(data.ID)
      }}
    >
      <Image
        source={{uri:env.server + env.subCategoriesImageSource + data.image}}
        style={{ width: 25, height: 25 }}
        resizeMode="contain"
      />
      <Text style={{ textAlign: "center", fontSize: 8,fontFamily:TranslationsMethods.ReturnFont("Bold") }}>{TranslationsMethods.ReturnValue("title",data.translations,data.title)}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={{ textAlign: "center", marginHorizontal: 3 }}>{translate("category.categories")}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {subCategories.map((trg,index) => (
          <CategoryBox key={index} data={trg} />
        ))}
      </ScrollView>
    </View>
  );
};
