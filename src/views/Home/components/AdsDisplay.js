import React from 'react';

// View
import { View, Image, TouchableOpacity } from 'react-native';

// Services
import { env } from '../../../constants'
import { useNavigation } from '@react-navigation/native'

// Stores
import { connect } from 'react-redux';


// -------- Ads Display -------- //
let AdsDisplay = (props) => {
    let { ads } = props.items
    let [ad, setAd] = React.useState({})
    let navigation = useNavigation()
    let install = () => {
        let length = ads.length
        if (length > 0) {
            let randAd = 1 + Math.floor(Math.random() * length - 1)
            setAd(ads[randAd])
        }
    }

    React.useEffect(() => {
        install();
    }, [])
    let cs = {
        marginV: 10,
        marginH: 10,
        imageHeight: 180,
        borderR: 10,
        marginBottom: 0
    }
    if (ads.length > 0) {
        return (
            <TouchableOpacity onPress={() => { navigation.navigate("AdShow", { adID: ad.ID }) }} style={{ marginVertical: cs.marginV, marginHorizontal: cs.marginH, marginBottom: 0, backgroundColor: 'white', padding: 1, borderRadius: cs.borderR }}>
                <Image source={{ uri: env.server + 'public/ads/' + ad.image }} style={{ width: '100%', height: cs.imageHeight, borderRadius: 5 }} resizeMode="cover" />
                <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: 5 }}>
                </View>
            </TouchableOpacity>
        )
    }

    return null;

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

export default connect(mapStateToProps, mapDispatchToProps)(AdsDisplay);