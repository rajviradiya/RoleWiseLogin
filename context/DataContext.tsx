import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { useAuthContext } from './AuthContext';

interface Notification {
    id: string;
    title: string;
    Description: string;
    images: any;
}
interface Messages {
    id: string;
    message: string;
    attachments: string[];
    active: boolean;
    createdAt: Date;
    from: string;
    thread: string;
    readStatus: string[];
    creatorname: any;
}

interface Threads {
    id: string;
    message: string;
    attachments: string[];
    client: string;
    active: string;
    createdBy: string;
    status: string;
    createdAt: Date;
    customerId: string;
    creatorname: string;
}
interface Users {
    id: string;
    active: boolean;
    email: string;
    name: string;
    phone: string;
    roles: string[];
    tenantId: any;
}
interface Client {
    id: string;
    address: string;
    users: string[];
    createdAt: Date;
    email: string;
    name: string;
    phone: string;
    poc: string;
    siteAddress: string;
    siteLocation: string[];
    siteName: string;
}
interface Thread {
    id: string;
    message: string;
    attachments: string[];
    client: string;
    active: string;
    createdBy: string;
    status: string;
    createdAt: Date;
    customerId: string;
    creatorname: string;
}
interface AuthComps {
    addNotification: (data: any) => void;
    addMessage: (newData: Messages) => Promise<void>;
    addThreads: (data: Threads) => void;
    getNotification: () => void;
    getMessage: () => void;
    getUsers: () => void;
    getClientData: () => void;
    getThreadsData: () => void;
    updateMessagesData: (id: string | undefined, data: any) => Promise<void>;
    Notification: any;
    setNotification: (data: any) => void;
    messagesData: Messages[];
    setMessagesData: (data: Messages[]) => void;
    users: Users[];
    setUsers: (data: Users[]) => void;
    isLoadingListData: boolean;
    setIsLoadingListData: (data: any) => void;
    clientData: Client[];
    threadData: Thread[];
}

const DataContext = createContext<AuthComps | undefined>(undefined);

const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { currentauthUser } = useAuthContext();
    const [Notification, setNotification] = useState<any>([]);
    const [messagesData, setMessagesData] = useState<Messages[]>([]);
    const [users, setUsers] = useState<Users[]>([]);
    const [clientData, setClientData] = useState<Client[]>([]);
    const [isLoadingListData, setIsLoadingListData] = useState<boolean>(true);
    const [threadData, setThreadData] = useState<Thread[]>([]);

    useEffect(() => {
        getClientData();
    }, [])

    const getUsers = async () => {
        try {
            const usersCollection = collection(db, "users");
            const usersQuery = query(usersCollection, orderBy("name", "asc"));

            const unsubscribeUser = onSnapshot(usersQuery, (snapshot) => {
                const updatedSubmissionsData = snapshot?.docs?.map((doc) => ({ id: doc.id, ...doc.data() } as Users));
                setUsers(updatedSubmissionsData);
                setIsLoadingListData(false);
                console.log("Users data get sucessfully")
            });
            return () => unsubscribeUser();
        } catch (error) {
            console.log("Error: Users data get");
        }
    };

    const getClientData = async () => {
        try {
            const clientsCollection = collection(db, "clients");
            // const clientsQuery = query(clientsCollection, orderBy("name", "asc"));

            const unsubscribeClients = onSnapshot(clientsCollection, (snapshot) => {
                const updatedClientData = snapshot.docs
                    // ?.filter((doc) => doc?.data()?.users?.includes(authuser?.id))
                    ?.map((doc) => {
                        // const data = doc.data();
                        return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt } as Client;
                    });
                setClientData(updatedClientData);
                setIsLoadingListData(false);
                console.log("CLient data get sucessfully")
            });
            return () => unsubscribeClients();
        } catch (error) {
            console.log("Error: CLient data get");

        }
    }

    const getThreadsData = async () => {
        try {
            const threadsCollection = collection(db, "threads");
            const threadsQuery = query(threadsCollection, orderBy("createdAt", "desc"));

            const unsubscribeThreads = onSnapshot(threadsQuery, (snapshot) => {

                const updatedData = snapshot.docs?.filter((doc) => {
                    const createdByUserId = doc?.data()?.createdBy?.split('/')[2];
                    const isThreadCreatedByUser = createdByUserId === currentauthUser?.id;
                    const isThreadCreatedByLinkedCustomer = clientData?.some((client) => client?.userId === createdByUserId && client?.users?.includes(currentauthUser?.id));
                    // const isThreadCreatedByClient = clientData?.some((client) => client?.users?.includes(currentauthUser?.id) && doc?.data()?.customerId === client?.userId);
                    const isClientLinked = clientData?.some((client) => client?.userId === currentauthUser?.id && client?.users?.includes(createdByUserId) && doc?.data()?.customerId === client.id);
                    return (isThreadCreatedByUser || (currentauthUser?.role?.includes("employee") ? (isThreadCreatedByLinkedCustomer) : (isClientLinked)));
                })?.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() } as Thread;
                });
                setThreadData(updatedData);
                setIsLoadingListData(false);
            });
            return () => unsubscribeThreads();
        } catch (error) {
            console.log("Error: Thread data get");
        }
    };

    const getNotification = async () => {
        try {
            const NotificationCollection = collection(db, "notification");
            const unsubscribeNotification = onSnapshot(NotificationCollection, (snapshot) => {
                const updatedMessagesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as Notification));
                setNotification(updatedMessagesData)
                setIsLoadingListData(false);
                console.log("Notification data get sucessfully")
            });
            return () => unsubscribeNotification();
        } catch (error) {
            console.log("Error: Notification data get");
        }
    }

    const getMessage = async () => {
        try {
            const messagesCollection = collection(db, "messages");
            const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

            const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
                const updatedMessagesData = snapshot?.docs?.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt ? (doc.data().createdAt as Timestamp).toDate() : new Date(),
                }))
                setMessagesData(updatedMessagesData);
                setIsLoadingListData(false);
                return () => unsubscribeMessages();
            })
        } catch (error) {

        }
    };

    const addNotification = async (notificationData: any) => {
        try {
            const docRef = await addDoc(collection(db, "notification"), notificationData);
            console.log("Notification added in Notification Collection");
        } catch (error) {
            console.log("Error: Add Notification Document", error)
        }
    };

    const addMessage = async (newData: Messages) => {
        try {
            await addDoc(collection(db, 'messages'), newData);
            console.log("Message Added in Message collection")
        } catch (error) {
            console.error('Error adding document in Message:', error);
        }
    };

    const addThreads = async (newData: Threads) => {
        try {
            const ThreadsCollection = collection(db, "threads");
            await addDoc(ThreadsCollection, newData);

        } catch (error) {
            console.error('Error adding document in addThreads:', error);
        }
    };

    const updateMessagesData = async (id: string, data: any) => {
        try {
            await updateDoc(doc(db, "messages", id), data)
            console.log('messages Data updated successfully!');
        } catch (error) {
            console.error('Error updating document in messages:', error?.message);
        }
    }

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
            addThreads,
            addMessage,
            getNotification,
            getMessage,
            getUsers,
            getClientData,
            getThreadsData,
            updateMessagesData,
            Notification,
            setNotification,
            messagesData,
            setMessagesData,
            isLoadingListData,
            setIsLoadingListData,
            users,
            setUsers,
            clientData,
            threadData
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
