import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContextProvider from './context/AuthContext';
import Main from './navigation/Main';
import DataContextProvider from './context/DataContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <DataContextProvider>
          <Main />
        </DataContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
