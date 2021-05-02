import React from "react";

// Views
import { View } from "react-native";
import {TextBanner,CardNormal} from '../../../components'
import {translate} from '../../../translations'

// Stores 
import { connect } from "react-redux";


let ItemsList = (props) => {
  let { data } = props;
  return (
    <View style={{ marginTop: '8%' }}>
      <TextBanner text={translate("category.items")} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop:16
        }}
      >
        {data.map((trg, index) => (
          <View style={{ width: "50%",padding:1,marginTop:15 }} key={index}>
            <CardNormal data={trg} />
          </View>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
