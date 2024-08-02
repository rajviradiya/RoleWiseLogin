import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/auth/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import VerifyOtp from '../screens/auth/VerifyOtp';
import Home from '../screens/home/Home';
import Admin from '../screens/home/Admin';
import Employee from '../screens/home/Employee';

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='VerifyOtp' component={VerifyOtp} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
            <Stack.Screen name='Employee' component={Employee} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})