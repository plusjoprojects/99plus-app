import React from 'react'

// Views
import { View, ScrollView } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import { HeaderNav } from '../../components'
import { SubCategoriesList, ItemsList, ItemsHolder } from './components'
import { ItemsCollection } from '../Home/components'


// Services 
import { apis } from '../../services'


// Stores
import { connect } from 'react-redux'

// ----------- Category ---------- //
let Category = (props) => {

    // Global Props
    let { route } = props
    let { categoryID } = route.params
    let [page, setPage] = React.useState(1)
    let [load, setLoad] = React.useState(true)
    let [subCategoryID, setSubCategoryID] = React.useState(0)
    let [getType, setGetType] = React.useState("all")
    let [justItems, setJustItems] = React.useState(false)
    let [isLoadMore, setIsLoadMore] = React.useState(false)

    let [data, setData] = React.useState({
        subCategories: [],
        category: {},
        selectForYouItems: [],
        items: []
    })


    // -------- Methods ------------ //
    let install = () => {
        let onSuccess = (res) => {
            setData({
                category: res.category,
                subCategories: res.subCategories,
                selectForYouItems: res.selectForYouItems,
                items: res.items
            });
            //   setItems(res.items);
            setLoad(false)
        };
        let onError = (err) => {
            console.log(err);
        };
        apis.main.indexCategory(categoryID, page, onSuccess, onError);
    };

    let ChangeSubCategories = (ID) => {
        setSubCategoryID(ID)
        setGetType("subCategory")
        setLoad(true)
        setPage(1);
        setJustItems(true);
        // Success
        let onSuccess = (res) => {
            setData({ ...data, items: res.items });
            setPage(2)
            setLoad(false)
        };
        let onError = (err) => {
            console.log("Change sub Categories Error: ", err);
        };
        apis.main.indexSubCategoriesItems(ID, 1, onSuccess, onError);
    };

    let loadMoreData = () => {
        if (getType == "all") {
            let onSuccess = (res) => {
                setData({ ...data, items: [...data.items, ...res.items] });
                setPage(page + 1)
                setTimeout(() => {
                    setIsLoadMore(false)
                }, 2000);
            };

            let onError = (err) => {
                console.log(err);
            };

            if (isLoadMore == false) {
                setIsLoadMore(true)
                apis.main.loadMoreCategory(categoryID, page + 1, onSuccess, onError);
            }
        }
        if (getType == "subCategory") {
            let onSuccess = (res) => {
                setData({ ...data, items: [...data.items, ...res.items] });
                setPage(page + 1)
                setTimeout(() => {
                    setIsLoadMore(false)

                }, 2000);
            };

            let onError = (err) => {
                console.log("Load More sub Categories Error: ", err);
            };

            if (isLoadMore == false) {
                setIsLoadMore(true)
                apis.main.indexSubCategoriesItems(subCategoryID, page + 1, onSuccess, onError);
            }
        }
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };


    React.useEffect(() => {
        install()
    }, [])

    // --- render () --- //
    return (
        <Layout style={{ flex: 1, }}>
            <HeaderNav />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <SubCategoriesList ChangeSubCategories={ChangeSubCategories} subCategories={data.subCategories} />
                </View>
                <View style={{ flex: 6 }}>
                    {load && <ItemsHolder />}
                    {!load &&
                        <ScrollView onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                loadMoreData()
                            }
                        }}
                            scrollEventThrottle={400} showsVerticalScrollIndicator={false}>
                            {!justItems && <ItemsCollection hasShowAll={false} title={'أخترنا لك'} items={data.selectForYouItems} />}
                            <ItemsList data={data.items} />
                        </ScrollView>
                    }
                    {isLoadMore &&
                        <View style={{ position: 'absolute', bottom: 0, left: 0, padding: 15, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Spinner />
                        </View>
                    }
                </View>
            </View>
        </Layout>
    )
}


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);