import { SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Login = () => {

    const { loading, countrycode, phone, setPhone, signInWithPhoneNumber, setLoading } = useAuthContext();

    const navigation = useNavigation();
    const buttonRef = useRef(null);

    const handleLogin = async () => {
        try {
            setLoading(true)
            await signInWithPhoneNumber(countrycode, phone);
            navigation.navigate("VerifyOtp");
            setPhone("")
            setLoading(false)
        } catch (error) {
            console.log("Error:", error)
            setLoading(false)
        }
    };

    console.log(`${countrycode}${phone}`, "phone ");
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                keyboardType="pho000ne-pad"
                placeholder="Enter phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
                <Animatable.View ref={buttonRef} useNativeDriver>
                <TouchableOpacity 
                style={styles.button}
                 onPress={() => handleLogin()}
                 onPressIn={()=> buttonRef.current?.bounceIn(800)}
                //  onPressOut={()=> buttonRef.current?.bounceOut(800)}
                 >
                    <Text>{loading ? "Loading..." : "Login"}</Text>
                </TouchableOpacity>
            </Animatable.View>
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