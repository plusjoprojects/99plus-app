import React from 'react';

//Views
import { View, ScrollView, Dimensions } from 'react-native';
import { CardNormal,TextBanner } from '../../../components'

// Services
import { translate } from '../../../translations';


export default ({ items }) => {
     let { width } = Dimensions.get("screen")
     return (
          <View style={{ padding: 15, marginTop: 20 }}>
               <TextBanner text={translate("main.select_for_you")}/>
               <ScrollView contentContainerStyle={{ paddingHorizontal: 5, marginTop: 15 }} showsHorizontalScrollIndicator={false} horizontal={true}>
                    {items.map((trg, index) => (
                         <View key={index} style={{ width: width / 2, paddingHorizontal: 5 }}>
                              <CardNormal data={trg} />
                         </View>
                    ))}
               </ScrollView>
          </View>
     )
}