import React, { useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native"
import Toast from 'react-native-easy-toast'
import firebase from 'firebase/app'

import { getFavorites } from '../utils/actions'
import Loading from '../components/Loading'

export default function Favorites({ navigation }) {
    const toastRef = useRef()
    const [restaurants, setRestaurants] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reloadData, setReloadData] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })


    useFocusEffect(
        useCallback( () => {
            if (userLogged) {
                async function getData(){
                    setLoading(true)
                    const response = await getFavorites()
                    setRestaurants(response.favorites)
                    setLoading(false)
                }
                getData()
            }
            setReloadData(false)
            //execute when: load page, change userLogged or reloadData
        }, [userLogged, reloadData])
    )

    if (!userLogged) {
        return <UserNoLogged navigation={navigation}/>
    }

    if (!restaurants) {
        return <Loading isVisible={true} text="Cargando restaurantes..." />
    } else if (restaurants?.length === 0){
        return <NotFoundRestaurants/>
    }

    return (
        
        <View>
            <Text>Favorites</Text>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text="Por favor espere..." />
        </View>
    )
}

function NotFoundRestaurants(){
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{fontSize:20, fontWeight:"bold"}}>
                Aún no tienes restaurantes favoritos
            </Text>
        </View>
    )
}

function UserNoLogged({ navigation }){
    return(
        <View style={{ flex: 1, alignItems:"center", justifyContent: "center" }}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{fontSize:20, fontWeight:"bold"}}>
                Necesitar estar logueado para ver los favoritos
            </Text>
            <Button
                title="Ir al login"
                containerStyle={{ marginTop: 20, width: "80%"}}
                buttonStyle={{ backgroundColor: "#2596be" }}
                onPress={ () => navigation.navigate("account", { screen: "login" }) }
            />
        </View>
    )
}

const styles = StyleSheet.create({})
