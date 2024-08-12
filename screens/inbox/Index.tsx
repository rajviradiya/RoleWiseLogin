import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../../context/AuthContext'
import { useDataContext } from '../../context/DataContext'
import FlatListSkeleton from '../../components/FlatListSkeleton'
import * as Animatable from 'react-native-animatable';

const Index = () => {
    const { currentuserrole } = useAuthContext();
    const { getNotification, Notification, setNotification, isLoadingListData, setIsLoadingListData } = useDataContext();
    const navigation = useNavigation();
    const ListvalRef = useRef([]);

    useEffect(() => {
        setIsLoadingListData(true)
        getNotification();
    }, [])

    const handelCreateInbox = () => {
        navigation.navigate("CreateInbox");
    };

    const handleonCardClick = (item) => {
        navigation.navigate("ShowInbox", {
            images: item?.images,
            title: item?.title,
            Description: item?.Description,
        });
    }
    return (
        <View style={styles.container}>
            {currentuserrole === "employee" ?
                <TouchableOpacity style={styles.button} onPress={() => handelCreateInbox()}>
                    <Text style={{ color: "white" }}>Create Inbox Message</Text>
                </TouchableOpacity>
                :
                null
            }
            <ScrollView style={{ width: "100%" }}>
                {isLoadingListData ? (
                    <>
                        <FlatListSkeleton />
                        <FlatListSkeleton />
                        <FlatListSkeleton />
                    </>)
                    :
                    Notification && Notification?.map((item, index) => (
                        <Animatable.View 
                        animation="fadeInDownBig"
                        useNativeDriver
                        duration={1000}
                        key={index}
                        >
                            <Animatable.View ref={(ref) => ListvalRef.current[index] = ref} useNativeDriver>
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => handleonCardClick(item)}
                                    onPressIn={() => ListvalRef.current[index]?.zoomIn()}
                                >
                                    <View style={styles.tname}>
                                        <Text>T</Text>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, fontWeight: 700 }}>{item?.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </Animatable.View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 30,
    },
    button: {
        padding: 10,
        backgroundColor: "blue",
    },
    tname: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: "lightblue"
    },
    card: {
        padding: 10,
        marginTop: 5,
        backgroundColor: "lightgreen",
        display: "flex",
        flexDirection: "row",
        gap: 20
    }
})