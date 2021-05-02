import React from 'react';
import { View,ScrollView,Dimensions } from 'react-native';
import { Layout,Text,Divider } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {Header,Shipping,AddressesContainer,PaymentMethod,Pay} from './components'
import {HeaderNav} from '../../components'
import BottomSheet from "reanimated-bottom-sheet";
let Checkout = () => {
     let {height} = Dimensions.get("screen")
     let bottomSheetRef = React.useRef(null)
    
     let openBottomSheet = () => {
          bottomSheetRef.current.snapTo(0)
      }
      let closeBottomSheet = () => {
          bottomSheetRef.current.snapTo(2)
      }


      let AddressesDialog = () => (
           <AddressesContainer closeBottomSheet={closeBottomSheet} />
      )

     return(
         <Layout level="1" style={{flex:1}}>
            <HeaderNav hasCart={false} />
               <ScrollView showsVerticalScrollIndicator={false} >
                    <Shipping openBottomSheet={openBottomSheet} closeBottomSheet={closeBottomSheet}/>
                    <View style={{padding:15,paddingHorizontal:35}}>
                         <Divider />
                    </View>
                    <PaymentMethod />
                    <View style={{padding:15,paddingHorizontal:35}}>
                         <Divider />
                    </View>
                    <Pay />
               </ScrollView>
               <BottomSheet
                ref={bottomSheetRef}
                initialSnap={2}
                snapPoints={[height / 1.25, height / 1.25, 0]}
                borderRadius={15}
                renderContent={AddressesDialog}
                enabledInnerScrolling={true}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);