import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";
import axios from "axios";

import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import FileLogo from "../../../assets/svg/fileLogo";
import GoogleIcon from "../../../assets/svg/googleIcon";
import MediaModal from "../../../components/Model";
import { useAuthContext } from "../../../context/AuthContext";
import * as Animatable from 'react-native-animatable';

type Folder = {
  id: string;
  title: string;
  mimeType: string;
  modifiedDate: string;
  lastModifyingUserName: string;
};

type Content = {
  id: string;
  title: string;
  mimeType: string;
  modifiedDate: string;
  lastModifyingUserName: string;
};

const Index: React.FC = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentFolderName, setCurrentFolderName] = useState<string>("Folders");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewingContents, setViewingContents] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loadingFolderId, setLoadingFolderId] = useState<string | null>(null);
  const [contentFetched, setContentFetched] = useState<boolean>(false);
  const [selectedFolderContents, setSelectedFolderContents] = useState<Content[]>([]);
  const [modalContent, setModalContent] = useState('');

  const navigation = useNavigation<NavigationProp<any>>();
  const { signOut } = useAuthContext();

  const googlebtnRef = useRef(null);
  const logoutbtnRef = useRef(null);

  const handleLogout = () => {
    signOut();
    navigation.navigate("Login")
  }

  useEffect(() => {
    fetchFolders("root");
  }, [accessToken]);

  useEffect(() => {
    const checkSignInStatus = async () => {
      const isSignedIn = await GDrive.auth.isSignedIn();
      setSignedIn(isSignedIn);
      if (isSignedIn) {
        const token = await GDrive.auth.getAccessToken();
        setAccessToken(token);
        fetchFolders("root");
      }
    };
    checkSignInStatus();
  }, []);

  const handleSignIn = async () => {
    try {
      GoogleSignin.configure({
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive.appdata',
          'https://www.googleapis.com/auth/drive.metadata',
          'https://www.googleapis.com/auth/drive.readonly',
          'https://www.googleapis.com/auth/drive.metadata.readonly',
          'https://www.googleapis.com/auth/drive.apps.readonly',
          'https://www.googleapis.com/auth/drive.photos.readonly',
        ],
        webClientId: '205652015457-81rsmae86n709dgem0ph9ilqer083gfj.apps.googleusercontent.com',
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });

      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const token = tokens.accessToken;
      setSignedIn(true);
      setAccessToken(token);
      fetchFolders("root");
    } catch (error) {
      console.error("SignIn Error", error);
    }
  };

  const fetchFolders = async (folderId) => {
    if (!accessToken) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v2/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const folders = response.data.items.map((item) => ({
        id: item.id,
        title: item.title,
        mimeType: item.mimeType,
        modifiedDate: item.modifiedDate,
        lastModifyingUserName: item.lastModifyingUser?.displayName || "Unknown",
      }));
      folders.sort((a, b) => a.title.localeCompare(b.title));
      setFolders(folders);
      setViewingContents(false);
    } catch (error) {
      console.error(error?.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContents = async (folderId, folderName) => {
    if (!accessToken) {
      return;
    }
    setContentFetched(false);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v2/files?q='${folderId}'+in+parents`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const contents = response.data.items.map((item) => ({
        id: item.id,
        title: item.title,
        mimeType: item.mimeType,
        modifiedDate: item.modifiedDate,
        lastModifyingUserName: item.lastModifyingUser?.displayName || "Unknown",
      }));
      contents.sort((a, b) => a.title.localeCompare(b.title));
      setSelectedFolderContents(contents);
      setCurrentFolderName(folderName);
      setModalVisible(true);
    } catch (error) {
      console.error(error?.response?.data || error);
    } finally {
      setContentFetched(true);
      setLoadingFolderId(null);
    }
  };

  const handleOpenFolder = (folderId, folderName) => {
    setLoadingFolderId(folderId);
    fetchContents(folderId, folderName);
  };

  const handleFolderCloseModal = () => {
    setModalVisible(false);
    setModalContent('');
  };

  const renderFolderItem = ({ item }) => {
    const modifiedDate = new Date(item.modifiedDate).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );

    const isLoadingFolder = loadingFolderId === item.id;

    return (
      <TouchableOpacity
        style={styles.folder}
        onPress={() => handleOpenFolder(item.id, item.title)}
      >
        {isLoadingFolder ? (
          <ActivityIndicator size="small" color="black" style={{ margin: 4 }} />
        ) : (
          <FileLogo />
        )}
        <View style={styles.folderTextPart}>
          <Text style={[styles.folderName, isLoadingFolder && styles.loadingText]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const LogoutAccount = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await GoogleSignin.signOut();
              setSignedIn(false);
              setAccessToken(null);
            } catch (error) {
              console.error("error", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.signoutIcon}>
        {signedIn ? (
          <TouchableOpacity style={styles.signoutbutton} onPress={LogoutAccount}>
            <Text style={{ color: "white" }}>SignOut</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {signedIn ? (
        <View style={{ flex: 1 }}>
          {isLoading &&
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          }
          <Text style={styles.foloderHeadText}>
            {viewingContents ? currentFolderName : "Folders"}
          </Text>
          <View>
            <FlatList
              style={{ marginTop: 30, paddingHorizontal: 16 }}
              data={viewingContents ? contents : folders}
              renderItem={viewingContents ? null : renderFolderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ View>
      ) : (
        <View style={styles.googleBtnContainer}>
          <Animatable.View
            ref={googlebtnRef}
            useNativeDriver
            duration={1000}
          >
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.googleBtn}
              onPressIn={() => googlebtnRef.current.bounce()}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.googleIcon}>
                  <GoogleIcon />
                </View>
                <Text style={styles.googleText}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      )}

      <View>
        <MediaModal
          visible={modalVisible}
          close={handleFolderCloseModal}
          loading={isLoading}
          foldercontent={selectedFolderContents}
          folderName={currentFolderName}
        />
      </View>

      <View>
        <Text>Employee</Text>
        <Animatable.View
          ref={logoutbtnRef}
          useNativeDriver
          animation="bounceIn" // Animation type when the component appears
          duration={800} // Animation duration
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogout()}
            onPressIn={() => logoutbtnRef.current.pulse()}
          >
            <Text>LogOut</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  googleBtnContainer: {
    padding: 16
  },
  googleBtn: {
    backgroundColor: "#4285f4",
    padding: 3,
    borderRadius: 2
  },
  googleIcon: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 2
  },
  googleText: {
    color: "#FFFFFF",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  signoutIcon: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center"
  },
  foloderHeadText: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  folder: {
    paddingHorizontal: 2,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  folderTextPart: {
    marginLeft: 16,
  },
  loadingText: {
    opacity: 0.3,
  },
  folderName: {
    color: "black",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    fontSize: 14,
  },
  signoutbutton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10
  },
  button: {
    borderWidth: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    margin: 15
  }
});
