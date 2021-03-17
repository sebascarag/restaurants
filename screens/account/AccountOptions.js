import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../../components/Modal'

export default function AccountOptions({ use, toastRef }) {
    const menuOptions = generateOptions()
    const [showModal, setShowModal] = useState(false)
    
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {menu.title}
                            </ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal
                isVisible={showModal} setVisible={setShowModal}
            >
                <Text>Hola mundo modal!!</Text>
                <Text>Hola mundo modal!!</Text>
                <Text>Hola mundo modal!!</Text>
                <Text>Hola mundo modal!!</Text>
                <Text>Hola mundo modal!!</Text>
            </Modal>
        </View>
    )
}

const generateOptions = () => {
    return[
        {
            title: "Cambiar Nombres y Apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#2596be",
            iconNameRight: "chevron-right",
            iconColorRight: "#2596be",
            onPress: () => selectedComponent("displayName")
        },
        {
            title: "Cambiar Email",
            iconNameLeft: "at",
            iconColorLeft: "#2596be",
            iconNameRight: "chevron-right",
            iconColorRight: "#2596be",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Cambiar Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#2596be",
            iconNameRight: "chevron-right",
            iconColorRight: "#2596be",
            onPress: () => selectedComponent("password")
        }
    ]
}

const selectedComponent = (key) => {
    console.log(key)
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#2596be"
    }
})
