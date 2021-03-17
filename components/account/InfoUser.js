import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({ user }) {
    const changePhoto = async() => {
        const result = await loadImageFromGallery([1,1])
        console.log(result)
    }
    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress={changePhoto}
                source={
                    user.photoURL ? { uri: photoURL } : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infouser}>
                <Text style={styles.displayname}>
                    {
                        user.displayName ? user.displayName : "Anónimo"
                    }
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infouser:{
        marginLeft:20
    },
    displayname:{
        fontWeight:"bold",
        paddingBottom: 5
    }
})
