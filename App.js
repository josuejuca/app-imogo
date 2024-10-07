import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './components/WelcomeScreen'; // Tela de Bem-vindo 
import Login from './components/LoginScreen'; // Tela de Login 
// cadastro
import SignupScreen from './components/SignupScreen/SignupScreenSeusDados'; // Tela de cadastro ( seus dados )
import SignupEmailScreen from './components/SignupScreen/SignupScreenEmail'; // Tela de cadastro ( email )
import SurveyScreen from './components/SignupScreen/SignupScreenQuery'; // Tela de cadastro ( pesquisa )
import SuccessScreen from './components/SignupScreen/SignupScreenSuccess';
// fim cadastro 

import OneCadastroImovel from './components/RegisterPropertyScreen/CaracteristicasScreen'; // Etapa 1 
import Home from './components/HomeScreen';
import CadastroImovel from './components/RegisterPropertyScreen/CadastroImovelScreen';
import ProfileScreen from './components/ProfileScreen';
import PreCaracteristicasScreen from './components/RegisterPropertyScreen/PreCaracteristicasScreen';
import PreEnderecoScreen from './components/RegisterPropertyScreen/PreEnderecoScreen';
import EnderecoScreen from './components/RegisterPropertyScreen/EnderecoScreen';

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
          component={Welcome} 
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
        <Stack.Screen name='PreCaracteristicasScreen' component={PreCaracteristicasScreen} options={{ headerShown: false }} />
        <Stack.Screen name='OneCadastroImovel' component={OneCadastroImovel} options={{ headerShown: false }} />
        <Stack.Screen name='PreEnderecoScreen' component={PreEnderecoScreen} options={{ headerShown: false }} />
        <Stack.Screen name='EnderecoScreen' component={EnderecoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
