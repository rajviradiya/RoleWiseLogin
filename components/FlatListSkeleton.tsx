import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const FlatListSkeleton = () => {
    return (
        <View style={styles.containerskeleton}>
            <Animatable.View
                animation="fadeIn"
                iterationCount="infinite"
                direction="alternate"
                style={styles.skeletonround}
            />
            <Animatable.View
                animation="fadeIn"
                iterationCount="infinite"
                direction="alternate"
                style={[styles.skeleton]}
            />
        </View>
    )
}

export default FlatListSkeleton

const styles = StyleSheet.create({
    containerskeleton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    skeletonround: {
        width: 50,
        height: 50,
        backgroundColor: '#e0e0e0',
        margin: 10,
        borderRadius: 25
    },
    skeleton: {
        width: "70%",
        height: 40,
        backgroundColor: '#e0e0e0',
        margin: 10,
    }
})