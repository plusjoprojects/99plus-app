import React from 'react';

// Views
import { View,TouchableOpacity } from 'react-native';
import { Text, Layout, useTheme } from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient';

// Services
import { TranslationsMethods } from '../../services'

// ----- TextBanner ------ ///
export default ({ text, children,onPress }) => {
    let theme = useTheme()
    let cs = {
        panelHeight: 40,
        fontSize: 18
    }

    return (
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LinearGradient colors={[theme['color-success-500'],theme['color-primary-500']]} style={{ height: '100%', width: 5, borderRadius:1 }}></LinearGradient>
                <View style={{ paddingHorizontal: 5 }}>
                    <Text style={{ color: 'black', fontSize: cs.fontSize, paddingHorizontal: 5, fontFamily: TranslationsMethods.ReturnFont("Bold"), color: theme['text-hint-color'] }}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}