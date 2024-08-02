import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './screens/Details';
import Login from './screens/Login';
import AuthContextProvider from './context/AuthContext';
import Main from './navigation/Main';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
