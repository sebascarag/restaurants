import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Avatar, Button, Rating } from 'react-native-elements'
import { map, size } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'
import moment from 'moment/min/moment-with-locales'

import { getRestaurantReviews } from '../../utils/actions'

moment.locale("es")

export default function ListReviews({ navigation, idRestaurant }) {
    const [userLogged, setUserLogged] = useState(false)
    const [reviews, setReviews] = useState([])


    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getRestaurantReviews(idRestaurant)
                if (response.statusResponse) {
                    setReviews(response.reviews)
                }
            })()
        }, [])
    )

    return (
        <View>
            {
                userLogged ? (
                    <Button
                        title="Escribre una opinión"
                        buttonStyle={styles.btnAddReview}
                        titleStyle={styles.btnTitleAddReview}
                        onPress={() => navigation.navigate("add-review-restaurant", {idRestaurant: idRestaurant})}
                        icon={{
                            type:"material-community",
                            name: "square-edit-outline",
                            color: "#2596be"
                        }}
                    />
                ) : (
                    <Text 
                        style={styles.mustLoginText}
                        onPress={() => navigation.navigate("login")}
                    >
                        Para escribir una opinón debes iniciar sesión.{" "}
                        <Text style={styles.logginText}>
                            Pulsa AQUÍ para iniciar sesión
                        </Text>
                    </Text>
                )
            }
            {
                size(reviews) > 0 && (
                    map(reviews, (reviewDocumento) => (
                        <Review reviewDocumento={reviewDocumento} />
                    )) 
                )
            }
        </View>
    )
}

function Review({reviewDocumento}){
    const { title, review, createAt, avatarUser, rating } = reviewDocumento
    const createReview = new Date(createAt.seconds * 1000)
    return (
        <View style={styles.viewReview}>
            <View style={styles.imageAvatar}>
                <Avatar
                    renderPlaceholderContent={<ActivityIndicator color={"#fff"}/>}
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={
                        avatarUser ?
                        { uri: avatarUser} : 
                        require("../../assets/avatar-default.jpg")
                    }
                />
            </View>
            <View style={styles.viewInfo}>
                    <Text style={styles.reviewTitle}>{title}</Text>
                    <Text style={styles.reviewText}>{review}</Text>
                    <Rating
                        imageSize={15}
                        startingValue={rating}
                        readonly
                    />
                    <Text style={styles.reviewDate}>
                        {moment(createReview).format("LLL")}
                    </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview:{
        backgroundColor: "transparent"
    },
    btnTitleAddReview:{
        color: "#2596be"
    },
    mustLoginText:{
        textAlign: "center",
        color: "#2596be",
        padding: 20
    },
    logginText:{
        fontWeight: "bold"
    },
    viewReview:{
        flexDirection:"row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#2596be",
        borderBottomWidth: 1
    },
    imageAvatar:{
        marginRight:15
    },
    imageAvatarUser:{
        width: 50,
        height: 50
    },
    viewInfo:{
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle:{
        fontWeight:"bold"
    },
    reviewText:{
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    reviewDate:{
        marginTop: 5,
        color:"gray",
        fontSize:12,
        position: "absolute",
        right:0,
        bottom:0
    }
})
