import { SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const { loading, countrycode, phone, setPhone, signInWithPhoneNumber } = useAuthContext();

    const navigation = useNavigation();

    const handleLogin = async () => {
        await signInWithPhoneNumber(countrycode, phone);
        navigation.navigate("VerifyOtp");
        setPhone("")
    };

    console.log(`${countrycode}${phone}`, "phone ");
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                <Text>{loading ? "Loading..." : "Login"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
    },
    button: {
        borderWidth: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 10
    }

})