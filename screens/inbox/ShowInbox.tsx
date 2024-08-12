import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

type RouteParams = {
    images: string[];
    title: string;
    Description: string;
};

const ShowInbox = () => {
    const route = useRoute();
    const { images, title, Description } = route.params;
    return (
        <ScrollView style={{ padding: 10 }} >
            {
                images.map((uri, index) => (
                    <View key={index} style={{ marginTop: 15 }}>
                        <Image
                            style={{ width: "100%", height: 500}}
                            source={{ uri: uri }}
                            resizeMode="cover"
                        />
                    </View>
                ))
            }
            <View style={{ paddingTop: 10, marginBottom: 50 }}>
                <Text style={{ fontSize: 22, fontWeight: 800 }}>{title}</Text>
                <Text style={{ fontSize: 16, fontWeight: 400 }}>{Description}</Text>
            </View>
        </ScrollView>
    )
}

export default ShowInbox

const styles = StyleSheet.create({})