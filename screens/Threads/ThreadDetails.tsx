import React, { useEffect, useRef, useState } from "react";
import {
    Platform,
    StyleSheet,
    FlatList,
    Dimensions,
    StatusBar,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
// import { useGlobalContext } from "../../contexts/globalDataContext";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import GrayCameraIcon from "../../assets/svg/grayCameraIcon";
import SendIcon from "../../assets/svg/sendIcon";
import BlueTickIcon from "../../assets/svg/blueTick";
import GrayTickIcon from "../../assets/svg/grayTick";
import * as Progress from 'react-native-progress'

const { width, height } = Dimensions.get("window");
import AWS from "aws-sdk";
import { Video } from "expo-av";
import CloseImgIcon from "../../assets/svg/closeIcon";
import Leftarrow from "../../assets/svg/leftArrow";
import moment from "moment";
import * as DocumentPicker from 'expo-document-picker';
import { Linking } from 'react-native';
import WebView from "react-native-webview";
import { useS3Upload } from "../../utils/uploadFiles";
import * as Notifications from 'expo-notifications';
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";

interface ThreadItem {
    id: string;
    message: string;
    attachments: string[];
}

interface ReadStatus {
    userId: string;
}

interface Messages {
    id?: string;
    message: string;
    attachments: string[];
    active: boolean;
    createdAt: Date;
    from: string;
    thread: string;
    readStatus: ReadStatus[];
    creatorname: any;
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
    customerId: string
}

interface ModalScreenProps { }

const ModalScreen: React.FC<ModalScreenProps> = () => {
    const { currentauthUser, currentuserrole } = useAuthContext();
    const { addMessage, updateMessagesData, clientData, threadData, users, messagesData } = useDataContext();
    const [message, setMessage] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<
        { id: string; roles: string[] }[]
    >([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [loading, setloading] = useState(false);
    const [filterusersfcm, setFilteredUsersfcm] = useState<any>();

    const [userRole, setuserRole] = useState("");
    const { uri, reading, uploadtos3, uploadProgress } = useS3Upload();
    const route = useRoute<RouteProp<{ params: { id: string } }>>();
    const { id, client, messages } = route.params;

    const scrollViewRef = useRef(null);

    useEffect(() => {
        const filterclients = clientData?.filter((Item) => Item?.userId === currentauthUser?.id)
        const filterclientUsers = filterclients?.map((item) => item?.users)?.flat();
        const filteruser = users?.filter((item) => {
            const data = filterclientUsers?.includes(item?.id);
            return data;
        })
        setFilteredUsersfcm(filteruser)
    }, []);


    // useEffect(() => {
    //     (async () => {
    //         const roles = await currentauthUser?.roles?.find((item) => item);
    //         setuserRole(roles)
    //     })()
    // }, [])

    useEffect(() => {
        const usersFiltered = users?.filter((user) => {
            return user?.role?.includes(currentuserrole)
        });
        setFilteredUsers(usersFiltered);
    }, [currentauthUser.role, users]);


    const handleSend = async () => {
        setloading(true);

        if (!message.trim() && selectedFiles.length === 0) {
            Alert.alert('Validation Error', 'Please enter message.');
            setloading(false);
            return;
        }

        try {
            const uploadedImageUrls = await Promise.all(selectedFiles
                .map(uri => uploadtos3(uri)));

            const active = true;
            const attachments = [
                ...uploadedImageUrls,
            ];

            // const cUser = users.find((item2) => {
            //     return item2?.id === currentauthUser?.id
            // })?.name

            // const from = `/users/${filteredUsers[0]?.id}`;
            const from = `/users/${currentauthUser?.id}`;
            const thread = `/threads/${id}`;
            const readStatus = [{ userId: filteredUsers[0]?.id }];
            const createdAt = new Date();
            const creatorname = currentauthUser?.name;

            const newData: Messages = {
                message,
                active,
                attachments,
                createdAt,
                from,
                thread,
                readStatus,
                creatorname,
            };
            addMessage(newData);
            setMessage("");
            setSelectedFiles([]);
        } catch (error) {
            Alert.alert('Error', 'Failed to send message. Please try again.');
        } finally {
            setloading(false);
        }

        // filterusersfcm?.map((item) => {
        //     item?.fcmtoken?.map((token) => {
        //         sendPushNotification(token);
        //     })
        // })

    };

    const getFileName = (uri) => {
        return uri.split('/').pop();
    };

    useEffect(() => {
        messagesData
            ?.filter((message) => message?.thread?.split("/")[2] === id)
            ?.forEach((message) => {
                const m = messagesData?.find((msg) => msg?.id === message?.id);
                if (m) {
                    const userId = filteredUsers[0]?.id;

                    if (filteredUsers[0]?.id && !m?.readStatus?.some(status => status?.userId === filteredUsers[0]?.id)) {
                        m?.readStatus?.push({ userId });
                        updateMessagesData(message?.id, m);
                    }
                }
            });

    }, [id, filteredUsers, messagesData]);

    const handleSelectFiles = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                multiple: true,
            });

            if (!result.canceled) {
                setSelectedFiles((prevUris) => [...prevUris, ...result?.assets]);
            }
        } catch (err) {
            console.log("Error selecting files: ", err);
        }
    };

    const removeImage = (index) => {
        setSelectedFiles((prevUris) => prevUris.filter((_, i) => i !== index));
    };

    const openFullScreen = (uri: string) => {
        setFullScreenImage(uri);
    };

    const closeFullScreen = () => {
        setFullScreenImage(null);
    };

    const openPDF = async (uri, item = null) => {
        try {
            await Linking.openURL(uri);
        } catch (error) {
            Alert.alert('Error', 'Failed to open PDF. Please try again.');
        }
    };

    const scrollToEnd = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="white" />
            <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => {
                scrollToEnd();
            }}
            >
                <View style={styles.contentContainer}>
                    {threadData?.map((item) => {
                        // const isCurrentUserClient = (authuser?.roles[0] === "employee" ? (item.createdBy === client) : false);
                        // const isCurrentUser = (item.createdBy === client);
                        const isCurrentUser = (currentauthUser?.id === item?.createdBy?.split("/")[2] ? true : false);

                        // const cUser = users.find((item2) => {
                        //     return item2?.id === authuser?.id
                        // })?.name
                        if (item?.message === messages) {
                            return (
                                <View style={{ alignSelf: isCurrentUser ? 'flex-end' : 'flex-start', marginTop: 10 }} key={item.id}>
                                    {item.attachments.map((attachment, index) => {
                                        const fileExtension = attachment.split('.').pop().toLowerCase();

                                        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                                            return (
                                                <TouchableOpacity onPress={() => openFullScreen(attachment)} key={index} style={[
                                                    styles.ImageMessage,
                                                    styles.Threadimage,
                                                    {
                                                        backgroundColor: isCurrentUser
                                                            ? "#134D37"
                                                            : "#000000",
                                                    },
                                                ]}>
                                                    {item?.creatorname === currentauthUser?.name ?
                                                        "" :
                                                        <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                    }
                                                    <Image
                                                        source={{ uri: attachment }}
                                                        style={styles.attachment}
                                                    />

                                                    <Text
                                                        style={[styles.TimeText, styles.TimeTextImg]}
                                                    >
                                                        {moment(item.createdAt).format("LT")}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        } else if (fileExtension === 'mp4' || fileExtension === 'mov') {
                                            return (
                                                <TouchableOpacity key={index} onPress={() => openFullScreen(attachment)} style={[styles.ImageMessage,
                                                {
                                                    backgroundColor: isCurrentUser
                                                        ? "#134D37"
                                                        : "#000000",
                                                },]}>
                                                    {item?.creatorname === currentauthUser?.name ?
                                                        "" :
                                                        <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                    }
                                                    <Video
                                                        source={{ uri: attachment }}
                                                        style={styles.attachment}
                                                        resizeMode="cover"
                                                        useNativeControls
                                                    />
                                                    <Text
                                                        style={[styles.TimeText, styles.TimeTextImg]}
                                                    >
                                                        {moment(item.createdAt).format("LT")}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        } else if (fileExtension === 'pdf') {
                                            const pdfName = attachment
                                            return (
                                                <TouchableOpacity key={index} style={[styles.pdfPreview,
                                                {
                                                    backgroundColor: isCurrentUser
                                                        ? "#134D37"
                                                        : "#000000",
                                                    marginTop: 8
                                                },]} onPress={() => openFullScreen(pdfName)}>
                                                    {item?.creatorname === currentauthUser?.name ?
                                                        "" :
                                                        <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                    }
                                                    <Ionicons name="document" size={50} color="#ffffff" />
                                                    <Text style={styles.Threadpdf}>{pdfName}</Text>
                                                    <Text
                                                        style={[styles.TimeText, styles.TimeTextImg]}
                                                    >
                                                        {moment(item.createdAt).format("LT")}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                        return null;
                                    })}
                                </View>
                            );
                        }
                        return null;
                    })}

                    <FlatList
                        inverted
                        data={messagesData?.filter((f) => f?.thread?.split("/")[2] === id)}
                        renderItem={({ item }) => {
                            const isCurrentUser =
                                // item.from === `/users/${filteredUsers[0]?.id}`;
                                item.from === `/users/${currentauthUser?.id}`;
                            // const currentUser = users?.find((item2) => {
                            //     return item2?.id == item?.from?.split("/")[2]
                            // })?.name
                            const currentUser = false
                            return (
                                <View style={{ width: width - 32 }}>
                                    {item?.message?.length > 0 && (
                                        <View
                                            style={[
                                                styles.messageContainer,
                                                {
                                                    backgroundColor: isCurrentUser ? "#134D37" : "#000000",
                                                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                                                },
                                            ]}
                                        >
                                            <View>
                                                {item?.creatorname === currentauthUser?.name ?
                                                    "" :
                                                    <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                }
                                                <Text style={styles.message}>{item.message}</Text>
                                                <View style={styles.bottomMessagePart}>
                                                    <Text style={styles.TimeText}>
                                                        {moment(item.createdAt).format("LT")}
                                                    </Text>
                                                    {item?.readStatus?.length === 1 ? <GrayTickIcon /> : <BlueTickIcon />}
                                                </View>
                                            </View>
                                        </View>
                                    )}

                                    {item?.attachments?.length > 0 &&
                                        item?.attachments?.map((uri, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => openFullScreen(uri)}
                                            >
                                                <View
                                                    style={[
                                                        styles.attachmentContainer,
                                                        {
                                                            alignSelf: isCurrentUser
                                                                ? "flex-end"
                                                                : "flex-start",
                                                        },
                                                    ]}
                                                >
                                                    {typeof uri === 'string' && (uri?.endsWith(".mp4") || uri?.endsWith(".mov")) ? (
                                                        <View style={[
                                                            styles.ImageMessage,
                                                            {
                                                                backgroundColor: isCurrentUser
                                                                    ? "#134D37"
                                                                    : "#000000",
                                                            },
                                                        ]}>
                                                            {item?.creatorname === currentauthUser?.name ?
                                                                "" :
                                                                <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                            }
                                                            <Video
                                                                source={{ uri }}
                                                                style={styles.attachment}
                                                                useNativeControls
                                                                resizeMode="cover"
                                                                isLooping
                                                            />
                                                            <View style={styles.TimeTextImg}>
                                                                <Text
                                                                    style={[styles.TimeText,]}
                                                                >
                                                                    {moment(item.createdAt).format("LT")}
                                                                </Text>
                                                                {item.readStatus.length === 1 ? <GrayTickIcon /> : <BlueTickIcon />}
                                                            </View>
                                                        </View>
                                                    ) : uri?.endsWith(".pdf") ? (
                                                        <TouchableOpacity onPress={() => openFullScreen(uri)}>
                                                            <View style={[styles.pdfPreview,
                                                            {
                                                                backgroundColor: isCurrentUser
                                                                    ? "#134D37"
                                                                    : "#000000",
                                                            },]}>
                                                                {item?.creatorname === currentauthUser?.name ?
                                                                    "" :
                                                                    <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                                }
                                                                <Ionicons name="document" size={40} color="#ffffff" />
                                                                <Text style={styles.pdfName}>{getFileName(uri)}</Text>
                                                                <View style={styles.TimeTextImg}>
                                                                    <Text
                                                                        style={[styles.TimeText,]}
                                                                    >
                                                                        {moment(item.createdAt).format("LT")}
                                                                    </Text>
                                                                    {item.readStatus.length === 1 ? <GrayTickIcon /> : <BlueTickIcon />}
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <>
                                                            <View
                                                                style={[
                                                                    styles.ImageMessage,
                                                                    {
                                                                        backgroundColor: isCurrentUser
                                                                            ? "#134D37"
                                                                            : "#000000",
                                                                    },
                                                                ]}
                                                            >
                                                                {item?.creatorname === currentauthUser?.name ?
                                                                    "" :
                                                                    <Text style={styles.userNameText}>{item?.creatorname}</Text>
                                                                }
                                                                <Image
                                                                    source={{ uri }}
                                                                    style={styles.attachment}
                                                                />

                                                                <View style={styles.TimeTextImg}>
                                                                    <Text
                                                                        style={[styles.TimeText,]}
                                                                    >
                                                                        {moment(item.createdAt).format("LT")}
                                                                    </Text>
                                                                    {item.readStatus.length === 1 ? <GrayTickIcon /> : <BlueTickIcon />}
                                                                </View>
                                                            </View>
                                                        </>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                        )}
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>

            <View style={styles.selectedimages}>
                {selectedFiles.length > 0 && (
                    <ScrollView horizontal style={styles.selectedFilesContainer}>
                        {selectedFiles.map((file, index) => (
                            <View key={index} style={styles.previewContainer}>
                                {file?.uri?.endsWith(".mp4") || file?.uri?.endsWith(".mov") ? (

                                    <>
                                        <Video
                                            source={{ uri: file?.uri }}
                                            style={styles.preview}
                                            useNativeControls
                                            resizeMode="contain"
                                            isLooping

                                        />
                                        <TouchableOpacity
                                            style={styles.closeIcon}
                                            onPress={() => removeImage(index)}
                                        >
                                            <CloseImgIcon />
                                        </TouchableOpacity>
                                    </>

                                ) : file?.uri?.endsWith(".pdf") ? (
                                    <TouchableOpacity onPress={() => openPDF(file?.uri)}>
                                        <View style={styles.pdfPreview}>

                                            <Ionicons name="document" size={40} color="#ffffff" />
                                            <Text style={styles.pdfName}>{getFileName(file?.uri)}</Text>
                                            <TouchableOpacity
                                                style={styles.closeIcon}
                                                onPress={() => removeImage(index)}
                                            >
                                                <CloseImgIcon />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <View>
                                        <Image source={{ uri: file?.uri }} style={styles.preview} />
                                        <TouchableOpacity
                                            style={styles.closeIcon}
                                            onPress={() => removeImage(index)}
                                        >
                                            <CloseImgIcon />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>


            <View style={styles.inputContainer}>
                <View style={styles.inputField}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Write a message"
                        placeholderTextColor="black"
                        editable={!loading}
                    />
                    <TouchableOpacity onPress={handleSelectFiles} disabled={loading}>
                        <GrayCameraIcon />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.sendRound}>
                        <ActivityIndicator size="small" color="black" />
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleSend} disabled={loading}>
                        <View style={[styles.sendRound]}>
                            <SendIcon />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            <Modal
                visible={fullScreenImage !== null}
                transparent={true}
                onRequestClose={closeFullScreen}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.fullScreenContainer}>
                        <TouchableOpacity
                            style={styles.leftArrowIcon}
                            onPress={closeFullScreen}
                        >
                            <Leftarrow />
                        </TouchableOpacity>
                        {fullScreenImage && (
                            <View style={[styles.fullScreenImage, ...(fullScreenImage?.endsWith('.pdf') ? [{ marginTop: 120 }] : [])]}>
                                {fullScreenImage?.endsWith(".mp4") ||
                                    fullScreenImage?.endsWith(".mov") ? (
                                    <Video
                                        source={{ uri: fullScreenImage }}
                                        style={styles.fullScreenImage}
                                        useNativeControls
                                        resizeMode="contain"
                                        isLooping
                                    />
                                ) : fullScreenImage?.endsWith('.pdf') ? (
                                    <WebView
                                        originWhitrelist={['*']}
                                        source={{ uri: `http://docs.google.com/gview?embedded=true&url=${fullScreenImage}` }}
                                        style={styles.fullScreenImage}
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: fullScreenImage }}
                                        style={styles.fullScreenImage}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    selectedimages: {
        flex: 0
    },
    userNameText: {
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        fontSize: 12,
        color: "white",
        marginLeft: 5,
        marginBottom: 6,
        right: 3,

    },
    TimeText: {
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        fontSize: 10,
        color: "#6F7C84",
        marginLeft: 20,
        marginTop: 4,
        right: 3,

    },
    TimeTextImg: {
        position: "absolute",
        bottom: "5%",
        right: "5%",
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },
    bottomMessagePart: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 0,
    },
    messageContainer: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginTop: 10,
        display: "flex",
        maxWidth: "90%",
    },
    message: {
        fontSize: 14,
        color: "#FFFFFF",
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        lineHeight: 20,
    },
    selectedFileContainer: {
        marginBottom: 10,
    },
    selectedFileName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    selectedFileType: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    progressBar: {
        marginBottom: 10,
    },
    progressText: {
        fontSize: 14,
        color: '#777',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        paddingHorizontal: 16,
        marginBottom: 24
    },
    inputField: {
        flex: 1,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 10,
        borderWidth: 2,
        backgroundColor: "white",
        color: "#8F969A",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        fontSize: 14,
        color: "#8F969A",
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        flex: 0.9,
    },
    sendRound: {
        height: 45,
        width: 45,
        borderRadius: 22,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
    },
    selectedFilesContainer: {
        marginTop: 10,
        position: "absolute",
        bottom: 0,
        right: "4%",
        left: "4%",
        backgroundColor: "#0b141b",
        paddingVertical: 10,
        zIndex: 1,
    },
    loadingIndicator: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    previewContainer: {
        marginRight: 10,
    },
    preview: {
        height: Dimensions.get("screen").width / 3 - 20,
        width: Dimensions.get("screen").width / 3 - 20,
        borderRadius: 10,
    },
    closeIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10,
    },
    attachmentContainer: {
        marginTop: 10,
    },
    attachment: {
        width: 200,
        height: 200,
        borderRadius: 5,
    },
    ImageMessage: {
        padding: 5,
        borderRadius: 5,
    },
    fullScreenContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 1)",
    },
    leftArrowIcon: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1,
    },
    fullScreenImage: {
        width: width,
        height: height,
        alignSelf: "center",
    },
    pdfPreview: {
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 200,
        backgroundColor: "#3E4A53",
        borderRadius: 10,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    threadpdfPreview: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: 120,
        maxWidth: 170,
        backgroundColor: "#3E4A53",
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 5,
        marginTop: 10
    },
    pdfName: {
        color: "#ffffff",
        marginTop: 5,
    },
    Threadpdf: {
        color: "#ffffff",
        marginTop: 5,
        padding: 4
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    Threadimage: {
        marginTop: 10,
    }
});

export default ModalScreen;
