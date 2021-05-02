import React from "react";
import { View, ScrollView} from "react-native";
import { Layout, Text, Icon, Input,useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";
import { CardNormal} from "../../components";
import { apis } from "../../services";
import {HeaderNav} from '../../components'
import {MaterialCommunityIcons,AntDesign} from '@expo/vector-icons'
import { translate } from "../../translations";
let Search = () => {
  let [status, setStatus] = React.useState("Hold");
  let [results, setResults] = React.useState([]);
  let [text, setText] = React.useState("");
  let theme = useTheme()

  let MakeSearch = () => {
    setStatus("Searching");
    let success = (res) => {
      setResults(res.items);
      setStatus("Done");
    };
    let error = (err) => {
      console.log("search Err: ", err, "\n", err.response.data);
    };
    apis.main.search(text, success, error);
  };


  let searchIcon = (props) => <Icon {...props} name="search-outline" />;

  let HoldContent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons name="layers-search-outline" style={{fontSize:64,color:theme['text-hint-color']}} />
      <Text style={{color:theme['text-hint-color'],fontSize:16,marginTop:5,textAlign:'center'}}>{translate("search.make_search")}</Text>
    </View>
  );

  let SearchingHolder = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <MaterialCommunityIcons name="layers-search-outline" style={{fontSize:64,color:theme['text-hint-color']}} />
      <Text style={{color:theme['text-hint-color'],fontSize:16,marginTop:5,textAlign:'center'}}>{translate("search.searching")}</Text>
    </View>
  );

  let NoResults = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <AntDesign name="meh" style={{fontSize:64,color:theme['text-hint-color']}} />
      <Text style={{color:theme['text-hint-color'],fontSize:16,marginTop:5,textAlign:'center'}}>{translate("search.no_result")}</Text>
    </View>
  );

  let ResultsContent = () => (
    <ScrollView  contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
      {results.map((trg, index) => (
        <View style={{ width: "50%",padding:5 }} key={index}>
          <CardNormal data={trg} />
        </View>
      ))}
    </ScrollView>
  );

  let DisplayContent = () => {
    if (status == "Hold") {
      return <HoldContent />;
    }
    if (status == "Searching") {
      return <SearchingHolder />;
    }

    if (status == "Done") {
      if (results.length == 0) {
        return <NoResults />;
      } else {
        return <ResultsContent />;
      }
    }
    return null;
  };

  return (
    <Layout style={{ flex: 1 }} level="3">
      <HeaderNav />
      <View style={{ backgroundColor: "white", paddingHorizontal: "5%" }}>
        <Input
          placeholder={translate("main.iam_search_in")}
          accessoryLeft={searchIcon}
          style={{ borderRadius: 50 }}
          textStyle={{ textAlign: "right" }}
          returnKeyType="search"
          value={text}
          onChangeText={(val) => {
            setText(val);
          }}
          onEndEditing={MakeSearch}
        />
      </View>
      <View style={{ flex: 1, padding: 10 }}>{DisplayContent()}</View>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
