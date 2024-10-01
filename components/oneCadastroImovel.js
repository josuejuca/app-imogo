import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const oneCadastroImovel = () => {
  const [quartos, setQuartos] = useState(0);
  const [suites, setSuites] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [garagem, setGaragem] = useState(0);

  // Funções de incremento e decremento
  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => setter(Math.max(0, value - 1));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Número de quartos */}
          <View style={styles.row}>
            <Text style={styles.subLabel} allowFontScaling={false}>Nº de quartos</Text>
            <View style={styles.optionGroup}>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[styles.optionButton, quartos === num && styles.selectedOption]}
                  onPress={() => setQuartos(num)}
                >
                  <Text style={[styles.optionText, quartos === num && styles.selectedOptionText]} allowFontScaling={false}>
                    {num === 5 ? '5+' : num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantos desses quartos são suítes */}
          <View style={styles.rowInline}>
            <Text style={styles.subLabel} allowFontScaling={false}>Quantos desses quartos são suítes?</Text>
            <View style={styles.incrementDecrement}>
              <TouchableOpacity
                style={styles.incrementDecrementButtonWrapper}
                onPress={() => handleDecrement(setSuites, suites)}
              >
                <Text style={styles.incrementDecrementButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.suitesText} allowFontScaling={false}>{suites}</Text>
              <TouchableOpacity
                style={styles.incrementDecrementButtonWrapperPlus}
                onPress={() => handleIncrement(setSuites, suites)}
              >
                <Text style={styles.incrementDecrementButtonPlus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Número de banheiros */}
          <View style={styles.row}>
            <Text style={styles.subLabel} allowFontScaling={false}>Nº de banheiros</Text>
            <View style={styles.optionGroup}>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[styles.optionButton, banheiros === num && styles.selectedOption]}
                  onPress={() => setBanheiros(num)}
                >
                  <Text style={[styles.optionText, banheiros === num && styles.selectedOptionText]} allowFontScaling={false}>
                    {num === 5 ? '5+' : num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Número de vagas de garagem */}
          <View style={styles.row}>
            <Text style={styles.subLabel} allowFontScaling={false}>Nº de vagas de garagem</Text>
            <View style={styles.optionGroup}>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[styles.optionButton, garagem === num && styles.selectedOption]}
                  onPress={() => setGaragem(num)}
                >
                  <Text style={[styles.optionText, garagem === num && styles.selectedOptionText]} allowFontScaling={false}>
                    {num === 5 ? '5+' : num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Ajuste para iOS e Android
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center', // Centraliza o conteúdo
  },
  container: {
    width: '90%', // Adiciona espaçamento lateral proporcional
  },
  row: {
    marginBottom: 20,
    width: '100%',
  },
  rowInline: {
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subLabel: {
    fontSize: Platform.select({
      ios: width * 0.037, // Ajuste de tamanho de fonte para iOS e Android
      android: width * 0.037,
    }),
    fontWeight: '600',
    color: '#1F2024',
    marginBottom: 5,
  },
  optionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribui as bolas uniformemente
    flexWrap: 'nowrap', // Evita quebra de linha
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#E9E9E9', // Cor do fundo quando não está selecionado
    borderRadius: 25, // Botão com bordas arredondadas
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 6, // Espaçamento entre as bolas
    backgroundColor: '#E9E9E9', // Cor de fundo padrão
    width: 44, // Define largura fixa
    height: 44, // Define altura fixa
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#FF7A00', // Fundo laranja quando selecionado
    borderColor: '#FF7A00',
  },
  optionText: {
    fontSize: Platform.select({
      ios: width * 0.033, // Ajuste no tamanho da fonte para caber melhor
      android: width * 0.033,
    }),
    color: '#494A50', // Cor do texto quando não está selecionado
  },
  selectedOptionText: {
    color: '#FFF', // Texto branco quando selecionado
  },
  incrementDecrement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '25%', // Ajuste para caber melhor
  },
  incrementDecrementButtonWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9', // Cor do fundo dos botões
  },
  incrementDecrementButtonWrapperPlus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F1E7F3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1E7F3', // Cor do fundo dos botões
  },
  incrementDecrementButton: {
    fontSize: 20,
    color: '#C4C4C4',
  },
  incrementDecrementButtonPlus: {
    fontSize: 20,
    color: '#730D83',
  },
  suitesText: {
    fontSize: width * 0.04,
    color: '#1F2024',
    textAlign: 'center',
  },
};

export default oneCadastroImovel;
