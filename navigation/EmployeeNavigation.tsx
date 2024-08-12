import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EmployeeHome from '../screens/employee/home/Index';
import Inbox from '../screens/inbox/Index';
import Threads from '../screens/Threads/Index';

const Stack = createBottomTabNavigator();

const EmployeeNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='EmployeeHome' component={EmployeeHome} options={{ headerShown: false }} />
            <Stack.Screen name='Threads' component={Threads} options={{ headerShown: false }} />
            <Stack.Screen name='Inbox' component={Inbox} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default EmployeeNavigation

const styles = StyleSheet.create({})