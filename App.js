import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './src/navigation/TabNavigator';

function App() {
  return (
    <NavigationContainer>
      <AppStack />
      {/* <AuthStack /> */}
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
}

export default App;
