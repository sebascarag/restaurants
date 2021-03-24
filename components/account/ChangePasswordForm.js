import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { reautenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPasword, setNewPasword] = useState(null)
    const [currentPassword, setCurrentPasword] = useState(null)
    const [confirmPassword, setConfirmPasword] = useState(null)

    const [errorNewPassWord, setErrorNewPassWord] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPasword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPasword] = useState(null)

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()) {
            return
        }
        setLoading(true)
        const resultReautenticate = await reautenticate(currentPassword)
        if (!resultReautenticate.statusResponse) {
            setLoading(false)
            setErrorCurrentPasword("Contraseña incorrecta.")
            return
        }
        const resultUpdatePassword = await updatePassword(newPasword)
        setLoading(false)

        if (!resultUpdatePassword.statusResponse) {
            setNewPasword("Hubo un problema cambiando la contraseña, por favor intente más tarde.")
            return
        }
        toastRef.current.show("¡Se han actualizado la contraseña!", 3000)
        setShowModal(false)
    }

    const validateForm = () =>{
        setErrorNewPassWord(null)
        setErrorCurrentPasword(null)
        setErrorConfirmPasword(null)

        let isValid = true
        if (isEmpty(currentPassword)) {
            setErrorCurrentPasword("Debes ingresar contraseña actual.")
            isValid = false
        }
        if (size(newPasword) < 6) {
            setErrorNewPassWord("Debes ingresar una nueva contraseña de almenos 6 carácteres.")
            isValid = false
        }
        if (size(confirmPassword) < 6) {
            setErrorConfirmPasword("Debes ingresar una confirmacion de tu contraseña de almenos 6 carácteres.")
            isValid = false
        }
        if (newPasword !== confirmPassword) {
            setErrorNewPassWord("La nueva contraseña y la confirmación no son iguales.")
            setErrorConfirmPasword("La nueva contraseña y la confirmación no son iguales.")
            isValid = false
        }
        if (newPasword === currentPassword) {
            setErrorNewPassWord("Debes ingresar una contraseña diferente a la actual.")
            setErrorCurrentPasword("Debes ingresar una contraseña diferente a la actual.")
            setErrorConfirmPasword("Debes ingresar una contraseña diferente a la actual.")
            isValid = false
        }
        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa contraseña actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPasword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2"}}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={newPasword}
                onChange={(e) => setNewPasword(e.nativeEvent.text)}
                errorMessage={errorNewPassWord}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2"}}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa confirmación de contraseña..."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPasword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2"}}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingVertical:10,
    },
    input:{
        marginBottom:10,
    },
    btnContainer:{
        width:"95%"
    },
    btn:{
        backgroundColor: "#2596be"
    }
})
