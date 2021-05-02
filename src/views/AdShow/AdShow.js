import React from 'react';

// Views 
import { View, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components'
import { CardNormal,HeaderNav } from "../../components";

// Services
import { apis } from "../../services"

export default (props) => {
    // Global Props
    let { route, navigation } = props;
    let { adID } = route.params;
    let [items, setItems] = React.useState([])

    let install = () => {
        let success = (res) => {
            setItems(res.adItems)
        }

        let error = err => {
            console.log("Error Install Items", err, "\n", err.response.data)
        }

        apis.main.adIndexItems(adID, success, error)
    }

    React.useEffect(() => {
        install()
    }, [])
    return (
        <Layout style={{ flex: 1, }} level="1">
            <HeaderNav />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '100%', marginTop: 15, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
                    {items.map((trg, index) => (
                        <View style={{ width: '50%', padding: 1 }} key={index}>
                            <CardNormal data={trg.item} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Layout>
    )
}