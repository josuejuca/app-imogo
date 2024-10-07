// components/Welcome.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

// Obter a largura e altura da tela
const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
    // Carregar as fontes
    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });

    // Exibir indicador de carregamento enquanto as fontes não carregam
    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FB7D10" />
            </View>
        );
    }

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
            <View style={styles.container}>
                {/* Logo centralizada na parte superior */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/img/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Parte inferior branca ocupando 50% do espaço com altura fixa */}
                <View style={styles.whiteContainer}>
                    <Text style={styles.title} allowFontScaling={false}>Faça parte da imoGo</Text>
                    <Text style={styles.subtitle} allowFontScaling={false}>
                        Aqui a venda do seu imóvel é segura, descomplicada e está na palma da sua mão.
                    </Text>

                    {/* Botões */}
                    <TouchableOpacity
                        style={styles.buttonPrimary}
                        onPress={() => navigation.navigate('Singup')}
                    >
                        <Text style={styles.buttonTextPrimary} allowFontScaling={false}>Criar cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonTextSecondary} allowFontScaling={false}>Já tenho acesso</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Mantém os itens alinhados ao topo
        alignItems: 'center',
        width: '100%',
    },
    logoContainer: {
        height: height * 0.5, // 50% da tela para a logo e espaço superior
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.35, // Tamanho menor para logo
        height: height * 0.12, // Tamanho menor para logo
    },
    whiteContainer: {
        width: '100%',
        height: height * 0.5, // Definido para 50% da altura da tela
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: width * 0.06, // Reduzi o padding horizontal
        paddingVertical: height * 0.02, // Reduzi o padding vertical
        alignItems: 'center',
        justifyContent: 'center', // Centraliza verticalmente o conteúdo na parte branca
        position: 'absolute', // Coloca o contêiner no fundo
        bottom: 0, // Posiciona no fundo da tela
    },
    title: {
        fontFamily: 'Nunito_700Bold',
        fontSize: width * 0.06, // Tamanho menor para título
        fontWeight: 'bold',
        color: '#1F2024',
        marginBottom: height * 0.01, // Espaço menor abaixo do título
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Nunito_400Regular',
        fontSize: Platform.select({
            ios: width * 0.038,  // Tamanho da fonte para iOS
            android: width * 0.038,  // Tamanho maior da fonte para Android
        }),
        color: '#1F2024',
        textAlign: 'center',
        marginBottom: Platform.select({
            ios: height * 0.045,  // Espaço para iOS
            android: height * 0.04,  // Espaço ajustado para Android
        }),
    },
    buttonTextPrimary: {
        fontFamily: 'Nunito_700Bold',
        color: '#F5F5F5',
        fontSize: width * 0.04, // Tamanho menor para texto do botão
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        fontFamily: 'Nunito_700Bold',
        color: '#1F2024',
        fontSize: width * 0.04, // Tamanho menor para texto do botão
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    buttonPrimary: {
        backgroundColor: '#FB7D10',
        paddingVertical: height * 0.012, // Tamanho menor para o padding vertical do botão
        paddingHorizontal: width * 0.1, // Tamanho menor para o padding horizontal do botão
        borderRadius: 30,
        marginBottom: height * 0.012, // Espaço menor abaixo do botão
        width: '100%',
        alignItems: 'center',
    },
    buttonSecondary: {
        borderColor: '#1F2024',
        borderWidth: 1,
        paddingVertical: height * 0.012, // Tamanho menor para o padding vertical do botão
        paddingHorizontal: width * 0.1, // Tamanho menor para o padding horizontal do botão
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
});

export default Welcome;
