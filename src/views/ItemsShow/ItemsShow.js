import React from 'react';

// Views
import { View, ScrollView } from 'react-native';
import { Layout,Spinner } from '@ui-kitten/components'
import { CardNormal,HeaderNav,TextBanner } from '../../components'
import Toast from 'react-native-toast-message'


// Services
import { translate } from '../../translations'
import { apis } from '../../services'


// --------- Items Show -------- //
export default (props) => {

    // Global Props
    let [items, setItems] = React.useState([])
    let { route } = props
    let { type } = route.params
    let [page, setPage] = React.useState(1)


    let install = () => {
        let success = (res) => {
            setItems(res.items)
            setPage(2)
        }
        let error = err => {
            console.log("error load show all", err, "\n", err.response.data)
            Toast.show({
                text1: translate("error"),
                text2: translate("network_error"),
                type: 'error'
            })
        }

        let _data = {
            type: type,
            page: page
        }
        apis.main.indexAllItems(_data, success, error)
    }

    let [isLoadMore, setIsLoadMore] = React.useState(false)
    let loadMore = () => {
        let success = (res) => {
            setItems([...items, ...res.items])
            setPage(page + 1)
            setTimeout(() => {
                setIsLoadMore(false)
            }, 2000);
        }
        let error = err => {
            console.log("error load show all", err, "\n", err.response.data)
            Toast.show({
                text1: translate("error"),
                text2: translate("network_error"),
                type: 'error'
            })
        }

        let _data = {
            type: type,
            page: page
        }
        if (isLoadMore == false) {
            setIsLoadMore(true)
            apis.main.indexAllItems(_data, success, error)
        }
    }

    React.useEffect(() => {
        install()
    }, [])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    let TitleFixer = () => {
        if (type == "selectForYou") {
            return (
                <TextBanner text={translate("main.select_for_you")} />
            )
        }
        if (type == "newItems") {
            return (
                <TextBanner text={translate("main.new_items")} />
            )
        }
        return null
    }
    return (
        <Layout level="3" style={{ flex: 1 }}>
            <HeaderNav />
            <ScrollView onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    loadMore()
                }
            }}
                scrollEventThrottle={400} contentContainerStyle={{ padding: 5, width: '100%', marginTop: 20 }}>
                {TitleFixer()}
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10, width: '100%' }}>
                    {items.map((trg, index) => (
                        <View style={{ width: '50%', padding: 1 }} key={index}>
                            <CardNormal data={trg} />
                        </View>
                    ))}
                </View>
            </ScrollView>
            {isLoadMore &&
                <View style={{ position: 'absolute', bottom: 0, left: 0, padding: 15, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Spinner />
                </View>
            }
        </Layout>
    )
}