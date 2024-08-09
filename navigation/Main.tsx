import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import VerifyOtp from '../screens/auth/VerifyOtp';
import Admin from '../screens/admin/home/Admin';
import ClientNavigation from './ClientNavigation';
import EmployeeNavigation from './EmployeeNavigation';
import CreateInbox from '../screens/inbox/CreateInbox';
import ShowInbox from '../screens/inbox/ShowInbox';
import AddThreadScreen from '../screens/Threads/AddThreadScreen';
import ThreadDetails from '../screens/Threads/ThreadDetails';

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='VerifyOtp' component={VerifyOtp} options={{ headerShown: false }} />
            <Stack.Screen name='Client' component={ClientNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Employee' component={EmployeeNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
            <Stack.Screen name='CreateInbox' component={CreateInbox} />
            <Stack.Screen name='ShowInbox' component={ShowInbox} />
            <Stack.Screen name='AddThread' component={AddThreadScreen} />
            <Stack.Screen name='ThreadDetails' component={ThreadDetails} />
        </Stack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})