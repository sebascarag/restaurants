import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'

export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <InfoUser 
                            user={user} 
                            setLoading={setLoading} 
                            setLoadingText={setLoadingText}
                        />
                        <Text>Account Options...</Text>
                    </View>
                )
            }
            <Button
                buttonStyle={styles.btnCloseSesion}
                titleStyle={styles.btnCloseSesionTitle}
                title="Cerrar Sesión"   
                onPress={() => {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading
                isVisible={loading}
                text={loadingText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnCloseSesion:{
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#ffff",
        borderTopWidth: 1,
        borderTopColor: "#2596be",
        borderBottomWidth: 1,
        borderBottomColor: "#2596be",
        paddingVertical: 10
    },
    btnCloseSesionTitle:{
        color: "#2596be",
    }
})
