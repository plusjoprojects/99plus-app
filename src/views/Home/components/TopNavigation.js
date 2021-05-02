// React 
import React from 'react'

// Views
import { View, TouchableOpacity, Image, } from 'react-native';
import { Icon, Text, useTheme } from '@ui-kitten/components';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'
import { Badge } from '../../../components'

// Services
import { translate } from '../../../translations'
import { useNavigation } from '@react-navigation/native'
import {BasketClass} from '../../../services'

// Stores
import { connect } from 'react-redux'

// -- TopNavigation --//
let TopNavigation = (props) => {

    // Global Props
    let theme = useTheme();
    let navigation = useNavigation()
    let { openCategoriesList, openCheckoutList,stander,openBottom } = props
    let { orderItems } = props.orders

    // Constants
    let constants = {
        iconSize: 24, imageSize: 46, imageSource: require("../../../assets/logo/logo.png")
    }

    // Badge View For Checkout
    let BadgeView = () => {
        // Create Zero Number
        let number = 0;
        if (orderItems.length > 0) {
            orderItems.forEach((trg) => {
                number = number + trg.items.length
            })
            return (
                <Badge count={number} />

            )
        } else {
            return null
        }
    }

    let MenuButton = () => (
        <TouchableOpacity onPress={() => { openCategoriesList() }}>
            <SimpleLineIcons name="menu" style={{ fontSize: constants.iconSize, color: 'black' }}></SimpleLineIcons>
        </TouchableOpacity>
    )

    let BasketButton = () => (
        <TouchableOpacity onPress={() => { BasketClass.openBottom() }}>
            <Ionicons name="ios-cart-outline" style={{ fontSize: 30, color: 'black' }} />
            {BadgeView()}
        </TouchableOpacity>
    )

    let SearchView = () => (
        <TouchableOpacity onPress={() => { navigation.navigate("Search") }} style={{ marginBottom: 10, width: '100%', borderRadius: 100, backgroundColor: theme['color-basic-200'], paddingHorizontal: 16, paddingVertical: 7, borderColor: theme['color-basic-300'], borderWidth: 0.5 }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ width: 24, height: 24 }} fill={theme['text-hint-color']} name="search-outline" />
                <View style={{ width: 10 }}></View>
                <Text style={{ color: theme['text-hint-color'] }}>{translate("main.iam_search_in")}</Text>
            </View>
        </TouchableOpacity>
    )

    let ImageView = () => (
        <Image source={constants.imageSource} style={{ width: constants.imageSize, height: constants.imageSize }} resizeMode="contain" />
    )

    let CenterView = () => {
        if (stander) {
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ImageView />
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: 'white', paddingHorizontal: '5%' }}>
                    <SearchView />
                </View>
            )

        }
    }

    return (
        <View style={{ paddingVertical: 1, paddingHorizontal: 15, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <MenuButton />
                </View>
                <View style={{ flex: 10 }}>
                    {CenterView()}
                </View>
                <View style={{ flex: 1 }}>
                    <BasketButton />
                </View>
            </View>
            {stander &&
                <View style={{ backgroundColor: 'white', paddingHorizontal: '5%' }}>
                    <SearchView />
                </View>
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        orders:state.orders
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);