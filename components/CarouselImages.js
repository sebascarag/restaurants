import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'

export default function CarouselImages({ images, height, width}) {
    const renderItem = ({item}) => {
        return(
            <Image
                style={{ width, height }}
                //ActivityIndicator = loading image
                PlaceHolderContent={<ActivityIndicator color="#fff"/>}
                source={ {uri: item} }
            />
        )
    }
    return (
        <Carousel
            layout={"default"}
            data={images}
            sliderWidth={width}
            itemWidth={width}
            itemHeight={height}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({})
