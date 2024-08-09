import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClientHome from '../screens/client/home/Index';
import Inbox from '../screens/inbox/Index';
import Threads from '../screens/Threads/Index';


const Stack = createBottomTabNavigator();

const ClientNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ClientHome' component={ClientHome} options={{ headerShown: false }} />
            <Stack.Screen name='Threads' component={Threads} options={{ headerShown: false }} />
            <Stack.Screen name='Inbox' component={Inbox} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ClientNavigation

const styles = StyleSheet.create({})