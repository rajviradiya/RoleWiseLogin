import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Dimensions, StyleSheet, ActivityIndicator, Modal, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { db } from '../firebase_config';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { collection, doc, getDocs, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigation, NavigationProp, Link } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';

type LoginType = {
    navigation: NavigationProp<any, any>;
};

interface Users {
    id: string;
    name: string;
    phone: string;
    role: string;
}

const Login: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [verificationId, setVerificationId] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [confirmResult, setConfirmResult] = useState<any>(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();
    const [timer, setTimer] = useState<number>(0); // Timer state
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);


    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }

        return () => clearInterval(interval);
    }, [isTimerActive, timer]);


    const sendOtp = async () => {
        try {
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

            const userQuery = query(
                collection(db, 'users'),
                where('phone', '==', phoneNumber)
            );
            const userSnapshot = await getDocs(userQuery);
            const usersList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Users[];
            setUsers(usersList);

            if (userSnapshot.docs.length > 0) {
                setConfirmResult(confirmation);
                setTimer(60);
                setIsTimerActive(true);
            }
            else {
                Alert.alert('Error', 'User not found');
            }
            // setPhoneNumber('');
            setLoading(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Failed to send OTP.');
        }
    };

    const confirmOtp = async () => {
        if (confirmResult) {
            try {
                setLoading2(true);
                const userCredential = await confirmResult.confirm(otp);

                const role = users.find((item) => item.role)?.role;
                if (role) {
                    navigation.navigate('Details', { role });
                    setLoading2(false);
                    setPhoneNumber('');

                } else {
                    Alert.alert('Role not Found');
                    navigation.navigate('Login');
                    setLoading2(false);
                    setPhoneNumber('');
                }
                setOtp('');
                setUsers([]);
                setIsTimerActive(false);

            } catch (error) {
                console.error(error);
                Alert.alert('Failed to verify OTP.');
            }
        } else {
            Alert.alert('Please request OTP first.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: 200 }}>
                <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    style={{ borderBottomWidth: 1, marginBottom: 10 }}
                    editable={users.length > 0 ? false : true}
                    maxLength={13}
                />
                {loading ? <ActivityIndicator
                    size="small"
                    color="black" /> :
                    <Button title="Send OTP" onPress={sendOtp} disabled={users.length > 0 ? true : false} />}


                <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="OTP"
                    keyboardType="number-pad"
                    style={{ borderBottomWidth: 1, marginBottom: 10, marginTop: 30 }}
                    editable={users.length > 0 ? true : false}
                    maxLength={6}
                />
                {loading2 ? <ActivityIndicator
                    size="small"
                    color="black" /> :
                    <Button title="Login" onPress={confirmOtp} disabled={users.length > 0 ? false : true} />}
                {users.length > 0 && (
                    <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                        <Text>{timer > 0 ? `Resend Code in ${timer}s` : "00:00"}</Text>
                        {timer === 0 && (
                            <TouchableOpacity onPress={sendOtp}>
                                <Text>Resend Code</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({

})

export default Login;
