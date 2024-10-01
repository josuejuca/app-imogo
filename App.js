import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './components/Welcome';
import SignupScreen from './components/Signup';
import SignupEmailScreen from './components/SignupEmail';
import SurveyScreen from './components/SignupQuery';
import SuccessScreen from './components/success';
import Login from './components/Login';
import Home from './components/Home';
import CadastroImovel from './components/CadastroImovel';
import ProfileScreen from './components/ProfileScreen';
import PropertyCharacteristics from './components/PropertyCharacteristics';
import oneCadastroImovel from './components/oneCadastroImovel';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // Estado para armazenar a rota inicial
  const [userId, setUserId] = useState(null); // Estado para armazenar o userId

  useEffect(() => {
    // Verifica se o usuário já fez login
    const checkLoginStatus = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); // Pega o userId salvo no AsyncStorage
        if (storedUserId) {
          setUserId(storedUserId); // Armazena o userId no estado
          setInitialRoute('Home'); // Define a rota inicial como Home
        } else {
          setInitialRoute('Welcome'); // Redireciona para Welcome se o userId não existir
        }
      } catch (error) {
        console.error('Erro ao verificar o status de login:', error);
        setInitialRoute('Welcome'); // Em caso de erro, redireciona para Welcome
      }
    };

    checkLoginStatus(); // Executa a verificação ao carregar o app
  }, []);

  // Enquanto o estado inicial estiver sendo verificado, exiba um indicador de carregamento
  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FB7D10" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Configuração global da StatusBar */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen 
          name="Welcome" 
          component={oneCadastroImovel} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Singup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupEmailScreen" component={SignupEmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SurveyScreen' component={SurveyScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SuccessScreen' component={SuccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{ headerShown: false }} 
          initialParams={{ userId }} // Passa o userId como parâmetro inicial para a Home
        />
        <Stack.Screen name='CadastroImovel' component={CadastroImovel} options={{ headerShown: false }} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name='PropertyCharacteristics' component={PropertyCharacteristics} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
