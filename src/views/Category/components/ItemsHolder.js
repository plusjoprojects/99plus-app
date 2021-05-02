import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


export default () => {
    let { width } = Dimensions.get("screen")
    let normalCardCounts = [1, 2, 3, 4, 5, 6, 7, 8]
    let SpecialCardHolder = () => (
        <View style={{ width: width / 1.4, height: width / 2, marginHorizontal: 5 }}>
            <SkeletonPlaceholder>
                <View style={{ height: '100%', width: '100%', borderRadius: 5 }}>
                </View>
            </SkeletonPlaceholder>
        </View>
    )

    let NormalCardHolder = () => (
        <SkeletonPlaceholder>
            <View style={{ width: "100%", height: 180, borderRadius: 5 }}></View>
        </SkeletonPlaceholder>
    )

    let TextBannerHolder = () => (
        <View style={{ padding: 15 }}>
            <SkeletonPlaceholder >
                <View style={{ height: 35, width: width / 3, borderRadius: 3 }}></View>
            </SkeletonPlaceholder>
        </View>
    )
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingVertical: 15 }}>
                    <TextBannerHolder />
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <SpecialCardHolder />
                        <SpecialCardHolder />
                        <SpecialCardHolder />
                    </ScrollView>
                    <View style={{ paddingVertical: 15 }}></View>
                    <TextBannerHolder />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {normalCardCounts.map((trg) => (
                            <View style={{ width: "50%", padding: 5 }} key={trg}>
                                <NormalCardHolder />
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}