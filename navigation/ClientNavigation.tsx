import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClientHome from '../screens/client/home/Index';
import Inbox from '../screens/inbox/Index';
import Threads from '../screens/Threads/Index';
import InboxIcon from '../assets/svg/inboxIcon';
import ThreadTabIcon from "../assets/svg/threadTabIcon";
import GroupTabIcon from "../assets/svg/groupTabIcon";
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';


const TabArr = [
    { route: 'ClientHome', label: 'Home', Icon: InboxIcon, component: ClientHome },
    { route: 'Threads', label: 'Threads', Icon: ThreadTabIcon, component: Threads },
    { route: 'Inbox', label: 'Inbox', Icon: GroupTabIcon, component: Inbox },
];

const Stack = createBottomTabNavigator();

const animate1 = { 0: { scale: 1.5 }, 1: { scale: 1.7 }, 2: { scale: 1.8 }, 3: { scale: 2 } }
const animate2 = { 0: { scale: 1.5 }, 1: { scale: 1.3 }, 2: { scale: 1 } }

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const Icon = item?.Icon;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);
    const isDarkMode = useColorScheme() === 'dark';

    const { colors } = useTheme()
    const color = isDarkMode ? "white" : "black";
    const bgColor = colors.background;

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1,500);
        } else {
            viewRef.current.animate(animate2,300);
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
        >
            <Animatable.View
                ref={viewRef}
                duration={700}
                useNativeDriver
                style={styles.container}
            >
                <Icon name={item.icon} color={focused ? "black" : "gray"} />
            </Animatable.View>
        </TouchableOpacity>
    )
}

const ClientNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
            }}
        >

            {TabArr.map((item, index) => (
                <Stack.Screen
                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TabButton {...props} item={item} />
                    }}
                />

            ))}
            {/* <Stack.Screen name='ClientHome' component={ClientHome} options={{ headerShown: false }} />
            <Stack.Screen name='Threads' component={Threads} options={{ headerShown: false }} />
            <Stack.Screen name='Inbox' component={Inbox} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    )
}

export default ClientNavigation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
    },
    tabBar: {
        height: 70,
        position: 'absolute',
        margin: 16,
        borderRadius: 16,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "white",
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: "gray",
        fontWeight: '500'
    }
})