// Stander Library .
import React, { useState} from 'react'

// Views Library
import { View, ScrollView, Animated,Dimensions,TouchableOpacity } from 'react-native'
import { Layout, Button } from '@ui-kitten/components'
import { TextBanner } from '../../components'
import { TopNavigation,ItemsCollection, AdsDisplay, CategoriesItemsList, CategoriesList } from './components'

import AdsSlider from './components/AdsSlider'

// Stores
import { connect } from 'react-redux'
import NotificationHandler from './NotificationHandler'
// Services
import { translate } from '../../translations'


// ------ Home ------- //
let Home = (props) => {

    // Global Props
    let { categoriesWithItems, newItems, selectForYouItemsFirst, selectForYouItemsSecond } = props.items; // CategoriesWithItems
    let [shows, setShows] = useState({
        categoriesList: false,
        checkoutList: false
    }) // ShowAndDisplay 

    let {width} = Dimensions.get("screen")

    // Animation Props
    let translateY = React.useRef(new Animated.Value(0)).current
    let opacityFade = React.useRef(new Animated.Value(0)).current
    let CategoriesListAnimation = React.useRef(new Animated.Value(width)).current
    // Animations Methods 
    let onScroll = (e) => {
        let y = e.nativeEvent.contentOffset.y
        if (y <= 300) {
            Animated.timing(translateY, {
                toValue: y < 200 ? -1 * y : -100,
                duration: 500,
                useNativeDriver: true
            }).start();
        }

        if (y <= 50) {
            Animated.timing(opacityFade, {
                toValue: y * 0.02,
                duration: 700,
                useNativeDriver: true
            }).start();
        }
        if (y >= 50 && y <= 300) {
            Animated.timing(opacityFade, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }).start();
        }
    } // -- onScroll

    let toggleCategoriesList = () => {
        Animated.timing(CategoriesListAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    let closeCategoriesList = () => {
        Animated.timing(CategoriesListAnimation, {
            toValue: width,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    return (
        <Layout level="1" style={{ flex: 1 }}>
            {/* ScrollView -> Contain all views without [CategoriesItemsList,NotificationHandler,CheckoutList] */}
            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} onScroll={onScroll}>
                {/* This View Height 100 Is For Components Fixed View */}
                <View style={{ height: 105 }}></View>
                <AdsSlider />
                {/* New Items */}
                <View style={{height:25}}></View>
                <ItemsCollection scope="newItems" title={translate("main.new_items")} items={newItems} />
                <ItemsCollection scope="selectForYou" title={translate("main.last_items")} items={selectForYouItemsSecond} />
                <ItemsCollection scope="selectForYou" title="اخترنا لك" items={selectForYouItemsFirst} />
                <AdsDisplay />
                <View style={{height:30}}></View>
                <TextBanner text={translate("main.items_list")} />
                {categoriesWithItems.map((trg, index) => (
                    <CategoriesItemsList key={index} data={trg} />
                ))}
                <View style={{ height: 150 }}></View>
            </ScrollView>




            {/* ----------- Animation Views ----------  */}
            <Animated.View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                opacity: opacityFade
            }}>
                <TopNavigation stander={false} openCategoriesList={() => { toggleCategoriesList() }} openCheckoutList={() => { setShows({ ...shows, checkoutList: true }) }} />
            </Animated.View>
            <Animated.View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                transform: [{ translateY: translateY }]
            }}>
                <TopNavigation stander={true} openCategoriesList={() => { toggleCategoriesList() }} />
            </Animated.View>
            {/* ----------- Animation Views ----------  */}

            <Animated.View style={{ position: 'absolute',width:width, left: 0, top: 0, height: '100%', transform: [{ translateX: CategoriesListAnimation }] }}>
            <TouchableOpacity onPress={() => {closeCategoriesList()}} style={{position:'absolute',left:0,height:0,width:'100%',height:'100%'}}></TouchableOpacity>
            <View style={{position:'absolute',left:0,top:52,height:'100%'}}>
                <CategoriesList />
            </View>
            </Animated.View>
            <NotificationHandler />
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);