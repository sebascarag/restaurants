import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import Loading from "../Loading";


export default function RegisterForm() {
    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPasword, setErrorPasword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        //[type] dinamyc
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doRegisterUser = async() => {
        if (!validateData()) {
            return
        }
        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
        }
        navigation.navigate("account")
    }

    const validateData = () =>{
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPasword("")
        let isValid = true

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }

        if (size(formData.password) < 6) {
            setErrorPasword("Debes ingresar una contraseña de al menos seis carácteres")
            isValid = false
        }

        if (size(formData.confirm) < 6) {
            setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos seis carácteres")
            isValid = false
        }

        if (formData.password !== formData.confirm) {
            setErrorPasword("La contraseña y la confirmación no son iguales")
            setErrorConfirm("La contraseña y la confirmación no son iguales")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPasword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setshowPassword(!showPassword)}
                    />
                }
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setshowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Registrar Nuevo Usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />
            <Loading
                isVisible={loading}
                text="Creando cuenta..."
            />
        </View>
    )
}

const defaultFormValues = () =>{
    return {email: "", password: "", confirm: ""}
}

const styles = StyleSheet.create({
    form:{
        marginTop: 10
    },
    input:{
        width:"100%"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: '#f58325'
    },
    icon:{
        color: "#c1c1c1"
    }
})
