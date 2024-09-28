import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor="transparent"
          translucent
        />
        <ImageBackground
          source={require('../assets/img/Splashcreen.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageBackgroundStyle}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: -150 })}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
              scrollEnabled={false}
            >
              {/* Logo Container */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/img/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              {/* White Container */}
              <View style={styles.whiteContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title} allowFontScaling={false}>
                    Bem-Vindo!
                  </Text>
                </View>

                {/* Email Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  allowFontScaling={false}
                  placeholderTextColor="#A9A9A9"
                />

                {/* Password Input */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    allowFontScaling={false}
                    placeholderTextColor="#A9A9A9"
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off' : 'eye'}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>

                {/* Remember Me and Forgot Password */}
                <View style={styles.rememberContainer}>
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      value={remember}
                      onValueChange={setRemember}
                      color={remember ? '#FB7D10' : '#FB7D10'}
                    />
                    <Text style={styles.rememberText} allowFontScaling={false}>
                      Lembrar senha.
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.forgotText} allowFontScaling={false}>
                      Esqueceu sua senha?
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.buttonText} allowFontScaling={false} >
                    Entrar
                  </Text>
                </TouchableOpacity>

                {/* Separator Text */}
                <Text style={styles.separatorText} allowFontScaling={false}>
                  Ou acesse com
                </Text>

                {/* Social Buttons */}
                <TouchableOpacity style={styles.buttonSocial}>
                  <Ionicons
                    name="logo-google"
                    size={24}
                    color="#EA4335"
                    style={styles.socialIcon}
                  />
                  <Text
                    style={styles.buttonTextSocial}
                    allowFontScaling={false}
                  >
                    Continuar com Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSocial}>
                  <Ionicons
                    name="logo-facebook"
                    size={24}
                    color="#3B5998"
                    style={styles.socialIcon}
                  />
                  <Text
                    style={styles.buttonTextSocial}
                    allowFontScaling={false}
                  >
                    Continuar com Facebook
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSocial}>
                  <Ionicons
                    name="logo-apple"
                    size={24}
                    color="#000"
                    style={styles.socialIcon}
                  />
                  <Text
                    style={styles.buttonTextSocial}
                    allowFontScaling={false}
                  >
                    Continuar com Apple
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageBackgroundStyle: {
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.35,
    height: height * 0.08,
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
    minHeight: height * 0.75,
    paddingBottom: height * 0.05,
    flexGrow: 1,
    flexShrink: 0,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start', // Garante que o título fique à esquerda
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: Platform.select({
      ios: width * 0.055,
      android: width * 0.05,
    }),
    fontWeight: 'bold',
    color: '#1F2024',
    marginBottom: height * 0.015,
    textAlign: 'left', // Alinha o texto à esquerda
  },
  input: {
    width: '100%',
    height: height * 0.055,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    fontSize: Platform.select({
      ios: width * 0.04,
      android: width * 0.038,
    }),
    marginBottom: height * 0.012,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputPassword: {
    flex: 1,
    height: height * 0.055,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    fontSize: Platform.select({
      ios: width * 0.04,
      android: width * 0.038,
    }),
    backgroundColor: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.01,
    marginBottom: height * 0.015,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: Platform.select({
      ios: width * 0.033,
      android: width * 0.032,
    }),
    color: '#FB7D10',
    marginLeft: 10,
  },
  forgotText: {
    fontSize: Platform.select({
      ios: width * 0.033,
      android: width * 0.032,
    }),
    color: '#FB7D10',
  },
  buttonPrimary: {
    backgroundColor: 'transparent',
    paddingVertical: height * 0.012,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.012,
    borderWidth: 1,
    borderColor: '#1F2024',
    
  },
  buttonText: {
    color: '#1F2024',
    fontSize: Platform.select({
      ios: width * 0.042,
      android: width * 0.04,
    }),
    fontWeight: 'bold',
  },
  separatorText: {
    fontSize: Platform.select({
      ios: width * 0.038,
      android: width * 0.037,
    }),
    color: '#71727A',
    marginVertical: height * 0.015,
  },
  buttonSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 30,
    paddingVertical: height * 0.014,
    width: '100%',
    marginBottom: height * 0.012,
    justifyContent: 'center',
  },
  buttonTextSocial: {
    fontSize: Platform.select({
      ios: width * 0.043,
      android: width * 0.04,
    }),
    color: '#333',
    fontWeight: 'bold',
  },
  socialIcon: {
    marginRight: 10,
  },
});

export default Login;
