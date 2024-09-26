// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './components/Welcome'; // Welcome 
import SignupScreen from './components/Signup';
import SignupEmailScreen from './components/SignupEmail';
import SurveyScreen from './components/SignupQuery';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Configuração global da StatusBar */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Singup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupEmailScreen" component={SignupEmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SurveyScreen' component={SurveyScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
