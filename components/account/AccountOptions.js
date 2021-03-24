import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import UserLogged from '../../screens/account/UserLogged'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

export default function AccountOptions({ user, toastRef, setRealoadUser }) {
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    
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
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm 
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef} 
                        setRealoadUser={setRealoadUser}  
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm 
                        email={user.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef} 
                        setRealoadUser={setRealoadUser}  
                    />
                )
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm 
                        setShowModal={setShowModal}
                        toastRef={toastRef}   
                    />
                )
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions()

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
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#2596be"
    }
})
