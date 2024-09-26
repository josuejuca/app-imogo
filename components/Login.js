// components/Login.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Dimensions, StatusBar, Platform, KeyboardAvoidingView, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Para o ícone de visibilidade da senha

const { height, width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Verifica se os campos estão preenchidos
  const isFormValid = email !== '' && password !== '';

  // Monitorar estado do teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/img/Splashcreen.png')} 
      style={styles.background}
    >
      {/* Definir o estilo da StatusBar conforme a plataforma */}
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} 
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Comportamento específico para iOS
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Ajuste para iOS
      >
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            contentContainerStyle={[styles.scrollContainer, keyboardVisible && styles.scrollContainerKeyboard]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!keyboardVisible} // Desativa o scroll quando o teclado estiver ativo
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.container, keyboardVisible && styles.containerKeyboard]}>
              {/* Logo centralizada na metade superior */}
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../assets/img/logo.png')} 
                  style={styles.logo} 
                  resizeMode="contain"
                />
              </View>

              {/* Parte inferior branca com os campos de login */}
              <View style={styles.whiteContainer}>
                <Text style={styles.title}>Bem-Vindo!</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    style={styles.passwordIcon} 
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons 
                      name={showPassword ? 'visibility' : 'visibility-off'} 
                      size={24} 
                      color="#888" 
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.options}>
                  <View style={styles.rememberMe}>
                    <CheckBox
                      value={rememberMe}
                      onValueChange={setRememberMe}
                      color={rememberMe ? '#FF7F00' : '#FF7F00'} // Caixa da CheckBox sempre laranja
                      style={styles.checkbox} // Tamanho da checkbox ajustado
                    />
                    <Text style={styles.rememberText}>Lembrar senha.</Text>
                  </View>
                  <TouchableOpacity onPress={() => alert('Esqueceu a senha?')}>
                    <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                  </TouchableOpacity>
                </View>

                {/* Botão de Entrar */}
                <TouchableOpacity 
                  style={[styles.buttonPrimary, !isFormValid && styles.buttonDisabled]} 
                  onPress={() => alert('Login bem-sucedido!')}
                  disabled={!isFormValid}
                >
                  <Text style={styles.buttonTextPrimary}>Entrar</Text>
                </TouchableOpacity>

                {/* Divisão */}
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>Ou acesse com</Text>
                  <View style={styles.line} />
                </View>

                {/* Botões de login social */}
                <TouchableOpacity style={[styles.socialButton, { borderColor: '#DB4437' }]}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Continuar com Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { borderColor: '#3B5998' }]}>
                  <Ionicons name="logo-facebook" size={20} color="#3B5998" />
                  <Text style={styles.socialButtonText}>Continuar com Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { borderColor: '#000' }]}>
                  <Ionicons name="logo-apple" size={20} color="#000" />
                  <Text style={styles.socialButtonText}>Continuar com Apple</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },
  safeAreaView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Ajuste para iOS para evitar falhas no rodapé
  },
  scrollContainerKeyboard: {
    flexGrow: 1, // Manter o crescimento para evitar quebra de layout
    paddingBottom: 0, // Remover padding ao abrir o teclado
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerKeyboard: {
    justifyContent: 'flex-start', // Evitar mudança brusca ao chamar o teclado
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  logoContainer: {
    height: height * 0.25, // Ajuste na altura do logo para manter o layout consistente
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 80,
  },
  whiteContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  passwordIcon: {
    padding: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20, // Tamanho ajustado da checkbox
    borderColor: '#FF7F00', // Borda laranja da checkbox
  },
  rememberText: {
    color: '#FF7F00', // Laranja para "Lembrar senha"
    fontSize: 14,
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#FF7F00',
    fontSize: 14,
  },
  buttonPrimary: {
    backgroundColor: '#FF7F00',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#FFD9B3',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
  socialButton: {
    width: '100%',
    height: 50,
    borderRadius: 25, // Deixa os botões bem arredondados
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default Login;
