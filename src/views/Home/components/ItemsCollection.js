// React
import React from 'react'

// Views
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Text, useTheme } from '@ui-kitten/components';
import { TextBanner,CardSpecial } from '../../../components'


// Services
import { useNavigation } from '@react-navigation/native'
import { TranslationsMethods } from '../../../services'
import { translate } from '../../../translations'


// ------ ItemsCollection ------ ///
export default (props) => {
    //Global Props
    let navigation = useNavigation()
    let theme = useTheme()
    let { height } = Dimensions.get("screen")
    let { items, title, scope,hasShowAll = true } = props

    // ViewMoreButton
    let ViewMore = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ height: height / 6, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'CairoBold', fontSize: 14, color: theme['text-hint-color'] }}>عرض الجميع</Text>
                <View style={{ paddingTop: 3 }}>
                    <Icon name={TranslationsMethods.ReturnIconArrowSettings()} style={{ height: 30, width: 30 }} fill={theme['text-hint-color']} />
                </View>
            </View>
        </TouchableOpacity>
    )


    return (
        <View style={{ marginTop: 5, marginBottom: 25 }}>
            <TextBanner onPress={() => {
                if(hasShowAll) {
                    navigation.navigate("ItemsShow", { type: scope }) 
                }
                }} text={title} />
            <View style={{ height: 15 }}></View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {items.map((trg, index) => (
                    <CardSpecial key={index} data={trg} />
                ))}
                {hasShowAll &&
                    <ViewMore onPress={() => { navigation.navigate("ItemsShow", { type: scope }) }} />
                }
            </ScrollView>
        </View>
    )

}