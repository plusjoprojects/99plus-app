import React from 'react';

// Views
import { View, Dimensions } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { HeaderNav } from '../../components'
import { ItemImages, ItemPanel, ItemDetails, DeepDetails, Actions, RelatedItems } from './components'


// Services
import { apis } from '../../services'
import { useFocusEffect } from '@react-navigation/native';


// Stores
import { connect } from 'react-redux';


// -------- Item --------- //
let Item = (props) => {
     // Global props
     let { height } = Dimensions.get("screen")
     let { route, navigation } = props;
     let { itemID } = route.params
     let [isLoad, setIsLoad] = React.useState(true)
     let [item, setItem] = React.useState({})
     let [itemStorageCount, setItemStorageCount] = React.useState(0)
     let [relatedItems, setRelatedItems] = React.useState([])

     // ------- Methods -------- //
     let install = () => {
          setIsLoad(true)
          let onSuccess = (res) => {
               setItem(res.item);
               setItemStorageCount(res.allItemCounts);
               setRelatedItems(res.relatedItems);
               setIsLoad(false);
          };
          let onError = (err) => {
               console.log("Item Index Error :", err);
          };
          apis.main.showItem(itemID, onSuccess, onError);
     };

     useFocusEffect(
          React.useCallback(() => {
               install()
          }, [itemID])
     );

     // ----------- Render() --------- //
     return (
          <Layout style={{ flex: 1 }} level="1">
               <HeaderNav hasCart={false} />
               {!isLoad &&
                    <View style={{ flex: 1 }}>
                         <ItemImages item={item} />
                         <ItemPanel >
                              <ItemDetails item={item} />
                              <DeepDetails item={item} />
                              <Actions data={item} />
                              <RelatedItems items={relatedItems} />
                              <View style={{ height: 50 }}></View>
                         </ItemPanel>
                    </View>
               }

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

export default connect(mapStateToProps, mapDispatchToProps)(Item);