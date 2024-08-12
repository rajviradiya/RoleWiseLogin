import {
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Alert,
    View,
    Text,
    Animated,
    StatusBar,
    Image,
    ScrollView,
    Modal,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
//   import { useGlobalContext } from "../../contexts/globalDataContext";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import CloseImgIcon from "../../assets/svg/closeIcon";
import CameraImage from "../../assets/svg/CameraImage";
import * as DocumentPicker from 'expo-document-picker';
import PdfLogo from "../../assets/svg/pdfLogo";
//   import * as Notifications from 'expo-notifications';
// import DropDownIcon from '../../assets/svg/dropDownIcon'
// import awsconfig from "../../aws-export";
// import AWS from 'aws-sdk';
import * as Progress from 'react-native-progress'
import { useS3Upload } from "../../utils/uploadFiles";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";

interface NewData {
    message: string;
    active: any;
    attachments: string[];
    client: string;
    createdBy: string;
    status: string;
    createdAt: Date;
    customerId: string;
    creatorname: any;
}
import * as Animatable from 'react-native-animatable';

export default function AddThreadScreen() {
    // const { clientData, getClientData, addData, getUsers, users, authuser } = useGlobalContext();
    const { currentauthUser, currentuserrole } = useAuthContext();
    const { addThreads, getThreadsData, getUsers, getClientData } = useDataContext();

    const [message, setMessage] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<
        { id: string; roles: string[] }[]
    >([]);
    const [text, setText] = useState("");
    const [allToken, setAllToken] = useState<any[]>([]);

    const navigate = useNavigation<NavigationProp<any>>();
    const route = useRoute();
    const { clientId, id } = route.params || {};

    const [loading, setloading] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [filesUploadedCount, setFilesUploadedCount] = useState(0);
    const [totalFilesCount, setTotalFilesCount] = useState(0);
    const { uri, reading, uploadtos3, uploadProgress } = useS3Upload();
 
    const floatingLabelAnimation = useRef(
        new Animated.Value(text ? 1 : 0)
    ).current;

    const submmitBtnRef = useRef(null);
    const caerabtnRef = useRef(null);

    useEffect(() => {
        getClientData();
        getUsers();
    }, []);

    // useEffect(() => {
    //     if (currentauthUser?.roles?.length > 0 && users?.length > 0) {
    //         const usersFiltered = users?.filter((user) =>
    //             user?.roles?.includes(currentauthUser?.roles[0])
    //         );
    //         setFilteredUsers(usersFiltered);
    //     }
    // }, [authuser.roles, users]);

    // useEffect(() => {
    //   if (clientId) {
    //     const clientiddata = clientData.find((item) => {
    //       return item?.id === clientId;
    //     })?.userId

    //     const filterclient = clientData?.filter((item) => {
    //       return clientiddata === item?.userId;
    //     }).map((item) => {
    //       return [...item?.users, item?.userId];
    //     }).flat();

    //     const filteredUsers = users?.map(item => {
    //       const found = filterclient?.includes(item?.id);
    //       if (found) {
    //         return item?.fcmtoken;
    //       } else {
    //         return null;
    //       }
    //     }).filter(token => token !== null && token !== undefined);
    //     setAllToken(filteredUsers);
    //   } else {
    //     const filterclient = clientData?.filter((item) => {
    //       return authuser?.id === item?.userId;
    //     }).map((item) => {
    //       return [...item?.users, item?.userId];
    //     }).flat();

    //     const filteredUsers = users?.map(item => {
    //       const found = filterclient?.includes(item?.id);
    //       if (found) {
    //         return item?.fcmtoken;
    //       } else {
    //         return null;
    //       }
    //     }).filter(token => token !== null && token !== undefined);
    //     setAllToken(filteredUsers);
    //   }
    // }, [])

    const handleFocus = () => {
        Animated.timing(floatingLabelAnimation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const floatingLabelStyle = {
        top: floatingLabelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, -10],
        }),
        fontSize: floatingLabelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
    };

    const handleSelectFiles = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
                multiple: true,
            });

            setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...res?.assets]);
            setTotalFilesCount(prevCount => prevCount + res?.assets.length);

        } catch (err) {
            console.log('Error:', err);
        }
    };

    // Notifications.setNotificationHandler({
    //     handleNotification: async () => ({
    //         shouldShowAlert: true,
    //         shouldPlaySound: false,
    //         shouldSetBadge: false,
    //     }),
    // });

    // async function sendPushNotification(expoPushToken: string) {
    //     try {
    //         const notificaionMessage = {
    //             to: expoPushToken,
    //             sound: 'default',
    //             title: `${authuser?.name || ""} has created a new thread`,
    //             body: `${authuser?.name || ""} created a new thread named ${message}`,
    //         };
    //         await fetch('https://exp.host/--/api/v2/push/send', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Accept-encoding': 'gzip, deflate',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(notificaionMessage),
    //         });
    //         // console.log(expoPushToken, "Notification2");
    //     } catch (error) {
    //         console.log("Notification Error:", error)
    //     }
    // }

    const handleUploadNow = async () => {
        if (selectedFiles.length === 0) {
            Alert.alert("Validation Error", "Please select at least one file.");
            return;
        }

        if (!message.trim()) {
            Alert.alert("Validation Error", "Description field cannot be empty.");
            return;
        }

        setloading(true);

        try {
            var uploadedFiles = [];
            for (const file of selectedFiles) {
                const uploadedFile = await uploadtos3(file);
                if (uploadedFile) {
                    uploadedFiles?.push(uploadedFile);
                    setFilesUploadedCount(prevCount => prevCount + 1);
                }
            }

            const active = true;
            const attachments = uploadedFiles;
            const client = id ? `/clients/${currentauthUser?.id}` : `/users/${currentauthUser?.id}`;
            const createdBy = id ? `/clients/${currentauthUser?.id}` : `/users/${currentauthUser?.id}`;
            const status = "Open";
            const createdAt = new Date();
            const customerId = id ? id : currentauthUser?.id;
            const creatorname = currentauthUser?.name;

            const newData: NewData = {
                message,
                active,
                attachments,
                client,
                createdBy,
                status,
                createdAt,
                customerId,
                creatorname
            };

            addThreads(newData);
            navigate.navigate("Threads");

        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setloading(false);
        }
    };


    const removeImage = (index) => {
        setSelectedFiles((prevUris) => prevUris?.filter((_, i) => i !== index));
        setloading(false);
    };


    const renderFile = (uri, index) => {
        const isPdf = uri?.mimeType === 'application/pdf';

        return (
            <View key={index}>
                {isPdf ? (

                    <View style={styles.pdfPreview}>
                        <PdfLogo width={Dimensions.get("screen").width / 3 - 22}
                            height={Dimensions.get("screen").width / 3 - 22} />
                        <Text style={styles.pdfName}>{uri?.name}</Text>
                    </View>
                ) : (
                    <Image source={{ uri: uri?.uri }} style={styles.imagePreview} />
                )}
                <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={() => removeImage(index)}
                >
                    <CloseImgIcon />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="#0b141b" />
                <View style={styles.detailsContainer}>
                    <View style={styles.Inputcontainer}>
                        <Animated.Text style={[styles.label, floatingLabelStyle]}>
                            Label
                        </Animated.Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                            onFocus={handleFocus}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.uploadText}>Upload Images</Text>
                </View>

                <Animatable.View ref={caerabtnRef} useNativeDriver>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            style={styles.cameraView}
                            onPress={handleSelectFiles}
                            onPressIn={()=> caerabtnRef.current.bounceIn()}
                        >
                            <CameraImage />
                        </TouchableOpacity>

                        {selectedFiles?.map(renderFile)}
                    </View>
                </Animatable.View>

                {loading ? (
                    <View style={{ flexDirection: "row" }}>
                        {
                            reading && (<View style={styles.loaderContainer}>
                                <ActivityIndicator size="small" color="#4BD659" />
                                <Text style={styles.loadingText}>Uploading {filesUploadedCount} of {totalFilesCount}</Text>
                                <Progress.Bar
                                    progress={filesUploadedCount / totalFilesCount}
                                    width={150}
                                    height={15}
                                    borderWidth={0}
                                    color="#4BD659"
                                    unfilledColor="#e0e0e0"
                                    borderRadius={5}
                                />
                            </View>)
                        }


                    </View>
                ) : (
                    <Animatable.View ref={submmitBtnRef} useNativeDriver>
                        <TouchableOpacity 
                        style={styles.signUpButton}
                         onPress={handleUploadNow}
                         onPressIn={()=> submmitBtnRef.current.bounceIn()}
                         >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                )}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "white",
    },
    detailsContainer: {
        marginBottom: 16,
        marginTop: 16,
    },
    Inputcontainer: {
        backgroundColor: "white",
    },
    inputStyle: {
        borderColor: "rgba(145, 158, 171, 0.2)",
        paddingHorizontal: 14,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 16,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Inter-Regular",
        color: "#D9D9D9",
        textAlignVertical: 'top',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    label: {
        paddingLeft: 14,
        position: "absolute",
        color: "black",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
    },
    uploadText: {
        color: "black",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        marginBottom: 16,
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
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
    progressBarContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    progressText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#FFFFFF'
    },
    cameraView: {
        borderRadius: 8,
        borderStyle: "dotted",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1.5,
        width: Dimensions.get("screen").width / 3 - 22,
        height: Dimensions.get("screen").width / 3 - 22,
        backgroundColor: "rgba(36, 43, 49, 0.42)",
    },
    closeIcon: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    imagePreview: {
        width: Dimensions.get("screen").width / 3 - 22,
        height: Dimensions.get("screen").width / 3 - 22,
        borderRadius: 8,
    },
    pdfPreview: {
        width: Dimensions.get("screen").width / 3 - 22,
    },
    pdfName: {
        textAlign: "center",
        color: "#FFFFFF",
    },
    signUpButton: {
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        maxHeight: 48,
        backgroundColor: "green",
        marginTop: 32,
        marginBottom: 24
    },
    buttonText: {
        fontFamily: "Inter-Bold",
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center",
    },
    dropdownContainer: {
        marginVertical: 16,
    },
    dropdownButton: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: "space-between",
        borderColor: "rgba(145, 158, 171, 0.2)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 16,
        backgroundColor: "#0b141b",
        color: "#D9D9D9",
    },
    dropdownButtonText: {
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Inter-Regular",
        color: "#D9D9D9",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#0b141b",
        borderRadius: 8,
        padding: 16,
    },
    dropdownItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(145, 158, 171, 0.2)",
    },
    dropdownItemText: {
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Inter-Regular",
        color: "#D9D9D9",
    },
    pdfLogoStyle: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    loaderContainer: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-between'
    },
    loadingText: {
        marginVertical: 10,
        fontSize: 16,
        color: '#4BD659',
    },
});
