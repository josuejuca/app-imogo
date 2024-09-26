import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const SurveyScreen = ({ navigation, route }) => {
    const { name, surname, email, password, phone } = route.params;
    const fullName = name + ' ' + surname;
    const [selectedOption, setSelectedOption] = useState(null);
    const [buttonScale] = useState(new Animated.Value(1)); // Valor inicial de escala do botão
    const [loading, setLoading] = useState(false); // Estado para controle do carregamento

    const options = ['Facebook', 'Instagram', 'Google', 'Loja de aplicativos', 'Indicação de amigos', 'Outro'];

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95, // Escala para baixo quando pressionado
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1, // Escala de volta ao tamanho original
            useNativeDriver: true,
        }).start();
    };

    const handleButtonPress = async () => {
        if (loading) return; // Impede ação se já estiver carregando

        setLoading(true); // Ativa o estado de carregamento

        try {
            const response = await axios.post('https://api-imogo.vercel.app/app/usuarios', {
                email: email,
                full_name: fullName,
                origin: selectedOption || 'Não informado', // Envia "Não informado" se nenhuma opção for selecionada
                password: password,
                phone: phone,
                photo_url: 'https://juca.eu.org/img/icon_dafault.jpg'
            });

            if (response.status === 201) {
                navigation.navigate('SuccessScreen');
            } else {
                Alert.alert('Erro', 'Não foi possível criar o usuário. Tente novamente.');
                setLoading(false); // Reativa o botão em caso de falha
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
            setLoading(false); // Reativa o botão em caso de erro
        }
    };

    const handleOptionPress = (option) => {
        setSelectedOption(prevOption => prevOption === option ? null : option);
    };

    return (
        <View style={styles.container}>
            {/* Barra de Progresso */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressSegmentFilled}></View>
                <View style={styles.progressSegmentFilled}></View>
                <View style={styles.progressSegmentFilled}></View>
                <View style={styles.progressSegmentFilled}></View>
                <View style={styles.progressSegmentHalfFilled}>
                    <View style={styles.progressSegmentHalfFilledInner}></View>
                </View>
            </View>

            <Text style={styles.title}>Só mais uma coisa</Text>
            <Text style={styles.subtitle}>Como conheceu a imoGo?</Text>            
            <Text style={styles.description}>Nos conte como chegou até aqui</Text>

            {options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[styles.optionButton, selectedOption === option && styles.optionButtonSelected]}
                    onPress={() => handleOptionPress(option)}
                >
                    <Text style={[styles.optionText, selectedOption === option && styles.optionTextSelected]}>
                        {option}
                    </Text>
                    {selectedOption === option && (
                        <Ionicons name="checkmark" size={20} color="#FFF" style={styles.optionIcon} />
                    )}
                </TouchableOpacity>
            ))}

            <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                <TouchableOpacity
                    style={[
                        styles.buttonPrimary,
                        loading && styles.buttonDisabled, // Aplica estilo de carregamento se necessário
                    ]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handleButtonPress}
                    disabled={loading} // Desativa o botão durante o carregamento
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: '#FFF',
                            },
                        ]}
                    >
                        {loading ? 'Criando conta...' : 'Concluir'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default SurveyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 30,
        paddingTop: 60,
    },
    progressBarContainer: {
        marginTop: 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    progressSegment: {
        height: 8,
        width: '15%',
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
    progressSegmentFilled: {
        height: 8,
        width: '15%',
        backgroundColor: '#FF7A00',
        borderRadius: 4,
    },
    progressSegmentHalfFilled: {
        height: 8,
        width: '15%',
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden', // Esconde a parte não preenchida
    },
    progressSegmentHalfFilledInner: {
        height: '100%',
        width: '50%', // 50% do espaço preenchido
        backgroundColor: '#FF7A00',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#F4F4F4',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionButtonSelected: {
        backgroundColor: '#FF7A00',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    optionTextSelected: {
        color: '#FFF',
    },
    optionIcon: {
        marginLeft: 10,
    },
    buttonContainer: {
        width: '100%',
    },
    buttonPrimary: {
        backgroundColor: '#FF7A00',
        paddingVertical: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonDisabled: {
        backgroundColor: '#FFA726', // Cor ligeiramente diferente para indicar carregamento
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
