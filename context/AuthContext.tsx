import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config';

interface Users {
    name: string;
    phone: string;
    roles: string;
}
interface AuthComps {
    phone: string;
    setPhone: (data: string) => void;
    countrycode: string;
    setCountryCode: (data: string) => void;
    otp: string;
    setOtp: (data: string) => void;
    signInWithPhoneNumber: (data: string, data2: string) => void;
    confirmationcode: any;
    setConfirmationCode: (data: any) => void;
    confirmOtp: (data: string) => void;
    currentauthUser: any;
    setcurrentauthUser: (data: any) => void;
    signOut: () => void;
    loading: boolean,
    setLoading: (data: boolean) => void;
}
const AuthContext = createContext<AuthComps | undefined>(undefined)

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [phone, setPhone] = useState<string>("");
    const [countrycode, setCountryCode] = useState<string>("+91");
    const [confirmationcode, setConfirmationCode] = useState<any>(null);
    const [otp, setOtp] = useState<string>("");
    const [currentauthUser, setcurrentauthUser] = useState<any>("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    console.log(confirmationcode, "user");


    useEffect(() => {
        (async () => {
            setLoading(false);
            await auth().onAuthStateChanged(async (user) => {
                if (user != null) {
                    console.log(user, "code ");
                    await getuser(user?.phoneNumber);
                }
            })
            setLoading(false);
        })()
    }, [])

    const signInWithPhoneNumber = async (code: string, phone: string) => {
        setLoading(true)
        const result = await auth().signInWithPhoneNumber(`${code}${phone}`)
        setConfirmationCode(result);
        setLoading(false)
    };

    const confirmOtp = async (code: string) => {
        const result = await confirmationcode.confirm(code);
    };

    const getuser = async (phoneNumber: string) => {
        const userQuery = query(
            collection(db, 'users'),
            where('phone', '==', phoneNumber)
        );
        const Users = await getDocs(userQuery);
        const userData = Users.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Users[];

        const role = await userData[0]?.role
        if (role === "client") {
            navigation.navigate("Home");
        } else if (role === "employee") {
            navigation.navigate("Employee");
        } else if (role === "admin") {
            navigation.navigate("Admin");
        } else {
            navigation.navigate("Login");
        }

        setcurrentauthUser(userData);
    };

    const signOut = async () => {
        try {
            await auth().signOut();
            setConfirmationCode(null);
            console.log("User out");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AuthContext.Provider value={{
            phone,
            setPhone,
            countrycode,
            setCountryCode,
            otp,
            setOtp,
            signInWithPhoneNumber,
            confirmationcode,
            setConfirmationCode,
            confirmOtp,
            currentauthUser,
            setcurrentauthUser,
            signOut,
            loading,
            setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

const styles = StyleSheet.create({})



export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return context;
};
