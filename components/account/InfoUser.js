import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

export default function InfoUser({ user }) {
    console.log(user)
    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
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
