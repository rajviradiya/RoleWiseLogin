import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { addDoc, collection, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { useAuthContext } from './AuthContext';

interface Notification {
    id: string;
    title: string;
    Description: string;
    images: any;
}

interface AuthComps {
    addNotification: (data: any) => void;
    getNotification: () => void;
    Notification: any;
    setNotification: (data: any) => void;
    loadingdata: boolean;
    setLoadingData: (data: boolean) => void;
}

const DataContext = createContext<AuthComps | undefined>(undefined);

const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [Notification, setNotification] = useState<any>([]);
    const [loadingdata, setLoadingData] = useState<boolean>(true);

    console.log(loadingdata, "loading data");

    const getNotification = async () => {
        try {
            const NotificationCollection = collection(db, "notification");
            const unsubscribeNotification = onSnapshot(NotificationCollection, (snapshot) => {
                const updatedMessagesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as Notification));
                setNotification(updatedMessagesData)
                console.log("Notification data get sucessfully")
            });
            return () => unsubscribeNotification();
        } catch (error) {
            console.log("Error: Notification data get");
        }
    }

    const addNotification = async (notificationData: any) => {
        try {
            const docRef = await addDoc(collection(db, "notification"), notificationData);
            console.log("Notification added in Notification Collection");
        } catch (error) {
            console.log("Error: Add Notification collection", error)
        }
    };

    // const UpdateNotification = async () => {
    //     try {
    //         const query = collection(db, "notification");
    //         const update = updateDoc(query, data)
    //     } catch (error) {
    //         console.log("Error Updating Notification", error)
    //     }
    // }
    return (
        <DataContext.Provider value={{
            addNotification,
            getNotification,
            Notification,
            setNotification,
            loadingdata,
            setLoadingData,
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider

export const useDataContext = () => {
    const context = useContext(DataContext)
    if (!context) {
        console.log("Data Context Not Created")
    }
    return context;
}
