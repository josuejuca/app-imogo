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
          <View style={styles.row}>
            <Text style={styles.subLabel} allowFontScaling={false}>Quantos desses quartos são suítes?</Text>
            <View style={styles.suitesGroup}>
              <TouchableOpacity
                style={[styles.optionButton, styles.incrementDecrementButton]}
                onPress={() => handleDecrement(setSuites, suites)}
              >
                <Text style={styles.incrementDecrementButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.suitesNumberContainer}>
                <Text style={styles.suitesText} allowFontScaling={false}>{suites}</Text>
              </View>
              <TouchableOpacity
                style={[styles.optionButton, styles.incrementDecrementButton]}
                onPress={() => handleIncrement(setSuites, suites)}
              >
                <Text style={styles.incrementDecrementButtonText}>+</Text>
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
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  container: {
    width: '90%',
  },
  row: {
    marginBottom: 20,
    width: '100%',
  },
  subLabel: {
    fontSize: width * 0.037,
    fontWeight: '600',
    color: '#1F2024',
    marginBottom: 5,
  },
  optionGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 25,
    marginHorizontal: 6,
    backgroundColor: '#E9E9E9',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  optionText: {
    fontSize: width * 0.033,
    color: '#494A50',
  },
  selectedOptionText: {
    color: '#FFF',
  },
  suitesGroup: {
    flexDirection: 'row',
    marginLeft: Platform.select({
      ios: -10,
      android: 10,
    }),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  suitesNumberContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6, // Alinhamento correto
  },
  suitesText: {
    fontSize: width * 0.04,
    color: '#1F2024',
    textAlign: 'center',
  },
  incrementDecrementButton: {
    // backgroundColor: 'translucent',
    // borderColor: "blue",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 44, // Mesma largura dos botões de números
    height: 44, // Mesma altura dos botões de números
  },
  incrementDecrementButtonText: {
    fontSize: 20,
    color: '#494A50',
  },
};

export default oneCadastroImovel;
