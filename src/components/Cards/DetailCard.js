import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components'

export default ({ size = "default", title = "", value, valueStyle = {}, valueSubTitle = "",valueSubTitleStyle = {} }) => {
    // Global Props
    let theme = useTheme()

    let valueSize = () => {
        switch (size) {
            case "x-large":
                return 24
            case "large":
                return 18
            case "default":
                return 16
            case "small":
                return 12
            default:
                return 16
        }
    }
    let titleSize = () => {
        switch (size) {
            case "x-large":
                return 10
            case "large":
                return 10
            case "default":
                return 10
            case "small":
                return 8
            default:
                return 8
        }
    }

    let styles = StyleSheet.create({
        value: {
            fontSize: valueSize(), textAlign: 'center', fontFamily: 'openSansBold', color: theme['text-hint-color']
        },
        title: {
            fontSize: titleSize(), textAlign: 'center', fontFamily: 'openSansBold', color: theme['text-hint-color']
        },
        moreValueStyle: valueStyle,
        valueSubTitleStyle: { fontSize: 8, fontFamily: 'openSansBold', color: theme['text-hint-color'] },
        moreSubTitleValue:valueSubTitleStyle
    })

    let [valueWidth, setValueWidth] = React.useState(0)

    return (
        <View>
            <View style={{ position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <View >
                    <Text onLayout={(event) => { setValueWidth(event.nativeEvent.layout.width); }} style={{ ...styles.value, ...styles.moreValueStyle }} >{value}</Text>
                    {valueSubTitle !== "" &&
                        <View style={{ position: 'absolute', left: valueWidth, bottom: 0 }}>
                            <Text style={{...styles.valueSubTitleStyle,...styles.moreSubTitleValue}}>{valueSubTitle}</Text>
                        </View>
                    }
                </View>
            </View>
            {title !== "" &&
                <Text style={{ ...styles.title }}>{title}</Text>
            }
        </View>
    )
}