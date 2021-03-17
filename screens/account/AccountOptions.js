import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { Icon, ListItem } from 'react-native-elements'

export default function AccountOptions({ use, toastRef }) {
    const menuOptions = generateOptions()
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
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
        </View>
    )
}

function generateOptions(){
    return[
        {
            title: "Cambiar Nombres y Apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#2596be",
            iconNameRight: "chevron-right",
            iconColorRight: "#2596be"
        },
        {
            title: "Cambiar Email",
            iconNameLeft: "at",
            iconColorLeft: "#2596be",
            iconNameRight: "chevron-right",
            iconColorRight: "#2596be"
        },
        {
            title: "Cambiar Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#2596be",
            iconNameRight: "chevron-right",
            iconColorRight: "#2596be"
        }
    ]
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#2596be"
    }
})
