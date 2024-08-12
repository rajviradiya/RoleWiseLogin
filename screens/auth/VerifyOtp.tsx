import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const VerifyOtp = () => {
    const { loading, otp, setLoading, setOtp, confirmOtp, currentauthUser, setConfirmationCode } = useAuthContext();

    const navigation = useNavigation();
    const btnRef = useRef();

    const handlVerifyOtp = async () => {
        setLoading(true);
        await confirmOtp(otp)
        setConfirmationCode(null);
        setOtp("");
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter OTP:</Text>
            <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter otp"
                value={otp}
                onChangeText={(text) => setOtp(text)}
            />
            <Animatable.View  ref={btnRef} useNativeDriver>
            <TouchableOpacity 
            style={styles.button}
             onPress={() => handlVerifyOtp()}
             onPressIn={()=> btnRef.current.fadeIn()}
             >
                <Text>{loading ? "Loading..." : "Confirm"}</Text>
            </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

export default VerifyOtp


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    otpInput: {
        width: '80%',
        height: 200,
        alignSelf: 'center',
    },
    input: {
        height: 40,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: '#000',
        fontSize: 20,
    },
    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
    button: {
        borderWidth: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 10
    }
});