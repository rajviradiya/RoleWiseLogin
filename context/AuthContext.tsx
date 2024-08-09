import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config';
import { registerForPushNotificationsAsync } from '../components/Notificationfunc';
import * as Notifications from "expo-notifications";

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
    currentuserrole: string;
    setCurrentUserRole: (data: string) => void;
    generateInitials: (data: string) => string;

}
const AuthContext = createContext<AuthComps | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [phone, setPhone] = useState<string>("");
    const [countrycode, setCountryCode] = useState<string>("+91");
    const [confirmationcode, setConfirmationCode] = useState<any>(null);
    const [otp, setOtp] = useState<string>("");
    const [currentauthUser, setcurrentauthUser] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [currentuserrole, setCurrentUserRole] = useState<string>("");
    const [expoPushToken, setExpoPushToken] = useState<string[]>([]);

    const navigation = useNavigation();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    console.log(expoPushToken,"token");

    useEffect(() => {
        setLoading(true);
        (async () => {
            await auth().onAuthStateChanged(async (user) => {
                if (user != null) {
                    console.log(user, "code ");
                    await getuser(user?.phoneNumber);
                    await generateFcmToken();
                }
            })
            setLoading(false);
        })()
    }, [])

    useEffect(() => {
        console.log(expoPushToken, "token2")
        if (expoPushToken && expoPushToken != undefined && expoPushToken.length > 0 && expoPushToken != null) {
            updateProfileFCM(currentauthUser?.id, { fcmtoken: expoPushToken });
        }
    }, [expoPushToken])

    const generateFcmToken = async() => {
        try {
            registerForPushNotificationsAsync()
                .then(async (token: string | undefined) => {
                    await setExpoPushToken(() => {
                        if (currentauthUser?.fcmtoken || []?.indexOf(token) === -1) {
                            return (currentauthUser?.fcmtoken || []) ? [...(currentauthUser?.fcmtoken || []), token] : [token]
                        } else {
                            return (currentauthUser?.fcmtoken || [])
                        }
                    })
                })
                .catch((error: any) => console.log(`${error}`))
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            });

            return () => {
                notificationListener.current &&
                    Notifications.removeNotificationSubscription(notificationListener.current);
                responseListener.current &&
                    Notifications.removeNotificationSubscription(responseListener.current);
            };
        } catch (error) {
            console.error('Error setting token:', error);
        }
    }

    const updateProfileFCM = async (id: string, data: any) => {
        try {
            // setIsLoading(true)
            await updateDoc(doc(db, "users", id), data);
            console.log('Data updated successfully!');
            // setIsLoading(false)
        } catch (error) {
            console.error('Error updating document in users:', error.message);
        }
    };

    const signInWithPhoneNumber = async (code: string, phone: string) => {
        const result = await auth().signInWithPhoneNumber(`${code}${phone}`)
        setConfirmationCode(result);
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
            navigation.navigate("Client");
        } else if (role === "employee") {
            navigation.navigate("Employee");
        } else if (role === "admin") {
            navigation.navigate("Admin");
        } else {
            navigation.navigate("Login");
        }
        const authUser = userData.find((item) => item);

        setcurrentauthUser(authUser);
        setCurrentUserRole(userData[0]?.role)
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

    const generateInitials = (names: string) => {
        const wordsFromName = names.split(' ');

        const words = wordsFromName.filter(word => word.trim() !== '');

        if (words.length > 1) {
            return words.map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
        } else {
            return (words[0] ? words[0].substring(0, 2) : '').toUpperCase();
        }
    };

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
            setLoading,
            currentuserrole,
            setCurrentUserRole,
            generateInitials,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return context;
};
