import React from "react";

// Views 
import { View } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { Entypo } from "@expo/vector-icons";
import DetailCard from '../../../components/Cards/DetailCard'

// Services
import { TranslationsMethods } from '../../../services'
import { translate } from '../../../translations'


// Stores
import { connect } from "react-redux";


// -------- Item Details -------- //
let ItemDetails = (props) => {

    // Global Props
    let theme = useTheme()
    let { item } = props;

    let TitleAndDescription = () => (
        <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 20, textAlign: "center", fontFamily: TranslationsMethods.ReturnFont("Bold") }} >
                {TranslationsMethods.ReturnValue("title", item.translations, item.title)}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                <Entypo name="text" style={{ fontSize: 14, color: theme['text-hint-color'] }} />
                <Text style={{ fontSize: 14, marginLeft: 10, textAlign: "left" }}>
                    {TranslationsMethods.ReturnValue("description", item.translations, item.description)}
                </Text>
            </View>
        </View>
    )

    let NumberDetails = () => (
        <View style={{padding:15}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <DetailCard size="large" valueSubTitle={'دينار'} valueStyle={{textDecorationStyle: 'solid', textDecorationLine: 'line-through', textDecorationColor:theme['text-hint-color']}} title="السعر الأصلي" value={item.original_price.toFixed(2)} />
                <DetailCard size="large" title="الكمية المتبقية" value={item.storagesItems.qty} />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <DetailCard size="x-large" valueSubTitle={'دينار'} valueStyle={{color:'black'}} value={item.price.toFixed(2)} title="السعر"></DetailCard>
            </View>
        </View>
    )
    return (
        <View >
            <TitleAndDescription />
            <NumberDetails />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
