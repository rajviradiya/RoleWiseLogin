import { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CloseImgIcon from '../../assets/svg/closeIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDataContext } from '../../context/DataContext';

const CreateInbox = () => {
    const [image, setImage] = useState<string[]>([]);
    const [title, setTitle] = useState<String>("");
    const [loading, setLoading] = useState(false);
    const [Description, setDescription] = useState<String>("");

    const { addNotification } = useDataContext();

    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage((prev) => [...prev, ...result?.assets.map((item) => item.uri)]);
        }
    };

    console.log(title, Description, "title");

    const handelsubmmit = async () => {
        setLoading(true);
        if (image.length > 0) {
            const data = {
                title: title,
                Description: Description,
                images: image
            }
            await addNotification(data);
            navigation.navigate("Inbox")
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>

            <View>
                <Text>Enter Title</Text>
                <TextInput
                    style={styles.title}
                    placeholder='Title'
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />

                <Text>Enter Description</Text>
                <TextInput
                    style={[styles.title]}
                    placeholder='Title'
                    onChangeText={(text) => setDescription(text)}
                    value={Description}
                />
            </View>

            <View style={{ paddingTop: 40 }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
            </View>

            <ScrollView
                style={{ marginTop: 20, height: 250 }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    image?.map((uri, index) => (
                        <View key={index} style={{ margin: 10 }}>
                            <Image source={{ uri: uri }} style={styles.imagePreview} />
                        </View>
                    ))
                }
            </ScrollView>


            <TouchableOpacity style={styles.button} onPress={handelsubmmit}>
                {loading ?
                    <ActivityIndicator size="small" color="white" style={{ margin: 4 }} /> :
                    <Text style={{ color: "white" }}>Submmit</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

export default CreateInbox

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 10
    },
    image: {
        width: 200,
        height: 200,
    },
    closeIcon: {

    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    button: {
        padding: 10,
        backgroundColor: "blue",
        alignItems: "center"
    },
    title: {
        borderWidth: 2,
        padding: 5,
        marginTop: 5
    }
})