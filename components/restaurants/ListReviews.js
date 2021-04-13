import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase/app'
import { Button } from 'react-native-elements'

export default function ListReviews({ navigation, idRestaurant }) {
    const [userLogged, setUserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    return (
        <View>
            {
                userLogged ? (
                    <Button
                        title="Escribre una opinión"
                        buttonStyle={styles.btnAddReview}
                        titleStyle={styles.btnTitleAddReview}
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
    }
})
