import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/auth/Login';
import { createStackNavigator } from '@react-navigation/stack';
import VerifyOtp from '../screens/auth/VerifyOtp';
import Admin from '../screens/admin/home/Admin';
import Employee from '../screens/employee/home/Employee';
import { Client } from '../screens/client/home/Client';

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='VerifyOtp' component={VerifyOtp} options={{ headerShown: false }} />
            <Stack.Screen name='Client' component={Client} options={{ headerShown: false }} />
            <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
            <Stack.Screen name='Employee' component={Employee} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})