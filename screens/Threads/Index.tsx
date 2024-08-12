import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, Alert, Platform, StatusBar, TouchableOpacity, TextInput, Button, View, Text, ActivityIndicator } from 'react-native';
// import { Text, View } from '../../components/Themed';
// import { useGlobalContext } from '../../contexts/globalDataContext';
import { Link, useNavigation, NavigationProp } from '@react-navigation/native';
import MessageIcon from '../../assets/svg/messegeIcon';
import SearchIcon from '../../assets/svg/searchIcon';
import firestore from '@react-native-firebase/firestore';
// import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthContext } from '../../context/AuthContext';
import { useDataContext } from '../../context/DataContext';
// import { ActivityIndicator } from 'react-native-paper';
// import { useTimer } from '../../contexts/TimerContext';
import * as Animatable from 'react-native-animatable';
import FlatListSkeleton from '../../components/FlatListSkeleton';

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
    userId: string;
}

type ThreadItem = {
    id: string;
    message: string;
    active: string;
    attachments: any[];
    client: string;
    createdBy: string;
    status: string;
    customerId: string
};

interface Messages {
    id: string;
    message: string;
    attachments: string[];
    active: boolean;
    createdAt: Date;
    from: string;
    thread: string;
}

interface NotificationCount {
    thread: string;
    userId: string;
    count: number;
}

interface AppState {
    data: ThreadItem[];
    filteredData: any;
    searchQuery: string;
}
const TabTwoScreen: React.FC = () => {
    // const { generateInitials, threadData, getThreadsData, getMessages, getClientData, getUsers, deleteData, getGroups, users, authuser, clientData, groupsData, loginPhoneNo, isLoadingListData, setIsLoadingListData } = useGlobalContext();
    const [filteredUsers, setFilteredUsers] = useState<
        { id: string; roles: string[] }[]
    >([]);
    // const { address } = useTimer();
    const { generateInitials, currentauthUser, currentuserrole } = useAuthContext();
    const { getNotification, getMessage, getUsers, getClientData, getThreadsData, users, clientData, threadData, isLoadingListData, setIsLoadingListData } = useDataContext();

    const navigation = useNavigation<NavigationProp<any>>();
    const [threadMessages, setThreadMessages] = useState<Messages[]>([]);
    const [notificationCounts, setNotificationCounts] = useState<NotificationCount[]>([]);
    const [threadClientMap, setThreadClientMap] = useState<{ [clientId: string]: Client[] }>({})
    const [loading, setLoading] = useState(true);

    const [state, setState] = useState<AppState>({
        data: [],
        filteredData: [],
        searchQuery: "",
    });

    const animationRefs = useRef([]);
    const createThreadRef = useRef(null);

    useEffect(() => {
        getUsers();
        getClientData();
        getThreadsData();
        getMessage();
        setLoading(false)
    }, []);

    console.log(loading, "loading");

    const filterUsersByRole = useCallback(() => {
        if (currentauthUser?.roles?.length > 0 && users?.length > 0) {
            const usersFiltered = users?.filter(user => user?.roles?.includes(currentuserrole));
            setFilteredUsers(usersFiltered);
        }
    }, [currentauthUser?.roles, users]);

    useEffect(() => {
        filterUsersByRole();
    }, [filterUsersByRole]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages: Messages[] = [];
                querySnapshot?.forEach(doc => {
                    const message = { id: doc.id, ...doc.data() } as Messages;
                    messages.push(message);
                });

                const tempThreadClientMap: { [clientId: string]: Client[] } = {};
                const threadMessageMap: { [threadId: string]: Messages[] } = {};

                threadData?.forEach(thread => {
                    const clientId = thread.client.split("/")[2];
                    const threadId = thread.id;
                    if (clientId && clientId !== "undefined") {
                        if (!tempThreadClientMap[threadId]) {
                            tempThreadClientMap[threadId] = [];
                        }
                        const client = clientData.find(client => client.id === clientId);
                        if (client) {
                            tempThreadClientMap[threadId].push(client);
                        }
                    }
                });
                setThreadClientMap(tempThreadClientMap);

                messages?.forEach(message => {
                    const threadId = message.thread;
                    if (!threadMessageMap[threadId]) {
                        threadMessageMap[threadId] = [];
                    }
                    threadMessageMap[threadId].push(message);
                });

                const validThreadMessages = Object?.keys(threadMessageMap)?.filter(threadId => {
                    threadData?.some(thread => `/threads/${thread.id}` === threadId)
                }
                );
                const newNotificationCounts = [...notificationCounts];

                validThreadMessages?.forEach(threadId => {
                    const threadMessages = threadMessageMap[threadId];
                    const thread = threadData?.find(thread => `/threads/${thread.id}` === threadId);
                    if (thread) {
                        threadMessages?.forEach(message => {
                            const associatedUsers = [thread?.createdBy?.split('/')[2], thread?.customerId];

                            const client = tempThreadClientMap[thread?.id]?.[0];
                            if (client) {
                                associatedUsers.push(...client?.users, client?.userId);
                            }

                            associatedUsers?.forEach(userId => {
                                if (!message?.readStatus?.some(rs => rs?.userId === userId)) {

                                    const existingNotificationIndex = newNotificationCounts.findIndex(
                                        nc => nc?.thread === threadId && nc?.userId === userId
                                    );

                                    const unreadMessages = threadMessages?.filter(msg =>
                                        !msg?.readStatus?.some(rs => rs?.userId === userId)
                                    );

                                    if (existingNotificationIndex >= 0) {
                                        newNotificationCounts[existingNotificationIndex].count = unreadMessages.length;
                                    } else {
                                        newNotificationCounts.push({ thread: threadId, userId, count: unreadMessages.length });
                                    }
                                }
                            });
                            if (thread.createdBy?.split('/')[2] === thread.customerId) {
                                const client = clientData?.find(client => client?.userId === thread?.createdBy?.split('/')[2]);

                                if (client) {
                                    const employeeIds = client?.users;

                                    employeeIds?.forEach(userId => {
                                        const existingNotificationIndex = newNotificationCounts?.findIndex(
                                            nc => nc?.thread === threadId && nc?.userId === userId
                                        );

                                        const unreadMessages = threadMessages.filter(msg =>
                                            !msg?.readStatus?.some(rs => rs.userId === userId)
                                        );

                                        if (existingNotificationIndex >= 0) {
                                            newNotificationCounts[existingNotificationIndex].count = unreadMessages.length;
                                        } else {
                                            newNotificationCounts.push({ thread: threadId, userId, count: unreadMessages.length });
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
                setThreadMessages(messages);


                setNotificationCounts(newNotificationCounts);
            });
        return () => unsubscribe();
    }, [filteredUsers, navigation]);

    const handleSearch = (query: string) => {
        const cleanedQuery = query.toLowerCase().replace(/\s+/g, '');
        const filteredData = threadData.filter((item) => {
            const client = clientData.find(client => client.id === item.client.split("/")[2]);
            const clientName = client ? client.name : '';
            const cleanedMessage = item.message.toLowerCase().replace(/\s+/g, '');
            const cleanedClientName = clientName.toLowerCase().replace(/\s+/g, '');
            return cleanedMessage.includes(cleanedQuery) || cleanedClientName.includes(cleanedQuery);
        });
        setState({ ...state, filteredData, searchQuery: query });
    };

    const handleViewDetails = (item: ThreadItem) => {
        const userId = filteredUsers[0]?.id;

        if (userId) {
            const threadHasEmployeeAndCustomer = threadData?.some(thread =>
                thread?.id === item?.id ||
                (thread?.createdBy.split('/')[2] === userId ||
                    thread?.customerId === userId)
            );

            if (threadHasEmployeeAndCustomer) {
                const existingNotificationIndex = notificationCounts.findIndex(
                    nc => nc.thread === `/threads/${item.id}` && nc.userId === userId
                );
                if (existingNotificationIndex >= 0) {
                    const updatedCounts = [...notificationCounts];
                    updatedCounts[existingNotificationIndex].count = 0;
                    setNotificationCounts(updatedCounts);
                }
            }
        }

        navigation.navigate("ThreadDetails", {
            id: item?.id,
            message: item?.message,
            active: item?.active,
            attachments: item?.attachments,
            client: item?.client,
            createdBy: item?.createdBy,
            status: item?.status,
            messages: item?.message,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* <StatusBar barStyle="light-content" backgroundColor="#0b141b" /> */}
            <View style={styles.container}>

                <View style={styles.headingView}>
                    <Text style={styles.headText}>
                        Threads
                    </Text>
                </View>

                <View style={styles.searchBarContainer}>
                    <SearchIcon />
                    <TextInput
                        style={styles.textInput}
                        value={state.searchQuery}
                        placeholder="Search for messages or users"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        onChangeText={handleSearch}
                    />
                </View>

                {loading ? (
                    <>
                        <FlatListSkeleton />
                        <FlatListSkeleton />
                        <FlatListSkeleton />
                    </>
                ) : (<>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={
                            state.searchQuery
                                ? state.filteredData
                                : threadData
                        }
                        renderItem={({ item, index }) => (
                            <Animatable.View
                                animation="fadeInDownBig"
                                duration={300}
                                delay={index * 300}
                                useNativeDriver
                            >
                                <Animatable.View
                                    ref={ref => animationRefs.current[index] = ref}
                                    duration={200}
                                    useNativeDriver
                                >
                                    <TouchableOpacity
                                        onPress={() => handleViewDetails(item)}
                                        onPressIn={() => animationRefs.current[index]?.bounceIn()}
                                        style={styles.threadContainer}
                                    >
                                        <View style={styles.profileLogo}>
                                            <Text style={styles.profileLogoText}>
                                                {generateInitials(item.message)}
                                            </Text>
                                        </View>
                                        <View style={styles.rightPart}>
                                            <View style={{ flexDirection: "column", backgroundColor: "transparent" }}>
                                                <Text style={styles.threadText}>{item?.message.trim()}</Text>
                                                <View style={{ flexDirection: "column", backgroundColor: "transparent", justifyContent: "space-between" }}>
                                                    {
                                                        clientData?.some(client => client.userId === item?.createdBy.split("/")[2]) ?
                                                            users?.filter(user => clientData.find((f) => f.id === item?.createdBy.split("/")[2])?.userId === user.id)
                                                                ?.map(client => (
                                                                    <>
                                                                        <Text style={{
                                                                            color: "lightgray",
                                                                            marginHorizontal: 16,
                                                                            fontSize: 12,
                                                                        }}>{client?.name}</Text>
                                                                        {/* <Text style={{
                                                                    color: "lightgray",
                                                                    marginHorizontal: 16,
                                                                    fontSize: 12,
                                                                }}>{address.split(",").slice(0, 2).join(",")}</Text> */}
                                                                    </>
                                                                ))
                                                            :
                                                            users.filter(user => user.id === item?.createdBy.split("/")[2]).map(user => (
                                                                <>
                                                                    <Text style={{
                                                                        color: "lightgray",
                                                                        marginHorizontal: 16,
                                                                        fontSize: 12,
                                                                    }}>{user?.name}</Text>
                                                                    {/* <Text style={{
                                                                color: "lightgray",
                                                                marginHorizontal: 16,
                                                                fontSize: 12,
                                                            }}>{address.split(",").slice(0, 2).join(",")}</Text> */}
                                                                </>
                                                            ))
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.timerpart}>
                                                <Text style={styles.timerStyle}>{new Date(item?.createdAt)?.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                                                {/* notification */}

                                                <View style={styles.notificationContainer}>
                                                    {notificationCounts?.find(nc => nc?.thread === `/threads/${item?.id}` && nc.userId === filteredUsers[0]?.id)?.count > 0 && (
                                                        <View style={styles.notification}>
                                                            <Text style={styles.notificationText}>
                                                                {notificationCounts?.find(nc => nc?.thread === `/threads/${item?.id}` && nc.userId === filteredUsers[0]?.id)?.count}
                                                            </Text>
                                                        </View>
                                                    )}
                                                    {/* <Button title="Delete" onPress={() => handleDelete(item)}></Button> */}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </Animatable.View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </>)}

                {/* <Button title='Delete' onPress={handleDeleteUser}></Button> */}

                {currentuserrole == "client" && (
                    <Animatable.View ref={createThreadRef} useNativeDriver>
                        <View style={styles.addThread}>
                            <TouchableOpacity
                                onPress={()=> navigation.navigate("AddThread")}
                                onPressIn={() => createThreadRef.current.fadeIn()}
                            >
                                <View style={styles.addIcon}>
                                    <MessageIcon />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                )}
            </View>
        </SafeAreaView >
    );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#242B31",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 24,
        maxHeight: 40
    },
    textInput: {
        flex: 1,
        paddingRight: 16,
        marginLeft: 12,
        color: "#FFFFFF"
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingTop: 16
    },

    threadContainer: {
        backgroundColor: "white",
        padding: 8,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 25
    },
    threadText: {
        color: "black",
        marginHorizontal: 16,
        flex: 1,
    },
    timerStyle: {
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        fontSize: 9,
        color: "black",
    },
    notificationContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "white",
    },
    notification: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    notificationText: {
        color: "black",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
        fontSize: 13,
    },
    timerpart: {
        backgroundColor: "white",
    },
    rightPart: {
        flexDirection: "row",
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between",
    },
    profileLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    profileLogoText: {
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 20,
        color: "#FFFFFF",
    },
    addThread: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: "#0b141b",
        position: "absolute",
        bottom: 100,
        right: 16,
        elevation: 50,
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    addIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    headText: {
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 20,
        color: "black",
        textAlign: "center",
        marginVertical: 24,

    },
    headingView: {
        backgroundColor: "white"
    },
    loading: {
        flex: 1,
        margin: "auto",
        backgroundColor: "#0B141B",
        width: "100%"
    }
});
