import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import { getDocumentById } from '../../utils/actions'
import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {
    const { id, name } = route.params
    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

    navigation.setOptions({ title: name })

    //when load page
    useEffect(() => {
        (async()=>{
            const response = await getDocumentById("restaurants", id)
            if (response.statusResponse) {
                setRestaurant(response.document)
            }
            else{
                //object without values, not is null
                setRestaurant({})
                Alert.alert("¡Ocurrio un problema cargando el restaurante, intente más tarde!")
            }
        })()
    }, [])

    if (!restaurant) {
        return <Loading isVisible={true} text="Cargando..."/>
    }
    
    return (
        <ScrollView
           style={styles.viewBody} 
        >
            <CarouselImages
                images={restaurant.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <Text>{restaurant.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    }
})
