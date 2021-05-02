// React
import React from 'react';

// Views
import { View, Dimensions, Image, TouchableOpacity,Platform } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

// Services
import { env } from '../../../constants'
import { useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'

// Stores
import { connect } from 'react-redux';


// ------ AdsSlider ------ //
let AdsSlider = (props) => {

    // Global Props
    let { width, height } = Dimensions.get("screen")
    let { ads } = props.items
    let theme = useTheme()
    let navigation = useNavigation()

    // Slider Props
    let sliderRef = React.useRef(null)
    let [activeIndex, setActiveIndex] = React.useState(0)


    let _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => { navigation.navigate("AdShow", { adID: item.ID }) }} key={index} style={{ paddingHorizontal: 5 }}>
                <Image style={{ width: '100%', height: height / 2, borderRadius: 5 }} source={{ uri: env.server + 'public/ads/' + item.image }} />
            </TouchableOpacity>
        );
    }

    let PaginationView = () => (
        <Pagination
            dotsLength={ads.length}
            activeDotIndex={activeIndex}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: theme['color-primary-500']
            }}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.19)', borderRadius: 5 }}
        />
    )
    return (
        <View style={{ position: 'relative' }}>
            <Carousel
                autoplay={true}
                autoplayInterval={5000}
                autoplayDelay={2000}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                loop={true}
                ref={sliderRef}
                data={ads}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => { setActiveIndex(index) }}
            >
            </Carousel>
            <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', paddingHorizontal: 5 }}>
                <PaginationView />
            </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdsSlider);