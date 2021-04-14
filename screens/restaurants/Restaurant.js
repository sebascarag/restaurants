import React, { useState, useCallback, useRef } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { map } from 'lodash'
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'

import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'
import { Rating } from 'react-native-ratings'
import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import ListReviews from '../../components/restaurants/ListReviews'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {
    const { id, name } = route.params
    const toastRef = useRef()

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })


    navigation.setOptions({ title: name })

    //when load and recall page
    useFocusEffect(
        useCallback(() => {
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
    )

    const addFavorite = () => {
        if (!userLogged) {
            toastRef.current.show("¡Para agregar el restaurante a favoritos, debes estar logueado!", 3000)
            return
        }
        console.log("add favorite")
    }

    if (!restaurant) {
        return <Loading isVisible={true} text="Cargando..."/>
    }
    
    const removeFavorite = () => {
        console.log("add favorite")
    }

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
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline" }
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color={ isFavorite ? "#fff" : "#2596be" }
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                name={restaurant.name}
                location={restaurant.location}
                address={restaurant.address}
                email={restaurant.email}
                phone={formatPhone(restaurant.callingCode, restaurant.phone)}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    )
}

function TitleRestaurant( { name, description, rating } ){
    return(
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

function RestaurantInfo({name, location, address, email, phone}){
    const listInfo = [
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"},
    ]
    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Información sobre el restaurante
            </Text>
            <MapRestaurant
                location={location}
                name={name}
                height={150}
            />
            {
                // use () for return implicite
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.name}
                            color="#2596be"
                        />
                        <ListItem.Content>
                             <ListItem.Title>
                                 {item.text}
                             </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:"#fff"
    },
    viewRestaurantTitle:{
        padding: 15,
    },
    viewRestaurantContainer:{
        flexDirection: "row"
    },
    descriptionRestaurant:{
        marginTop: 8,
        color:"gray",
        textAlign:"justify"
    },
    rating:{
        position: "absolute",
        right:0
    },
    nameRestaurant:{
        fontWeight:"bold"
    },
    viewRestaurantInfo:{
        margin: 15,
        marginTop: 25
    },
    restaurantInfoTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom: 15
    },
    containerListItem:{
        borderBottomColor: '#f58325',
        borderBottomWidth: 1
    },
    viewFavorite:{
        position:"absolute",
        top:0,
        right:0,
        backgroundColor: "#fff", 
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }

})
