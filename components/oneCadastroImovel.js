import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Dimensions, SafeAreaView, Platform, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const { width } = Dimensions.get('window');

// Mapeamento manual dos ícones
const icons = {
  Nascente: {
    default: require('../assets/icons/nascente.png'),
    selected: require('../assets/icons/nascente_white.png'),
  },
  Poente: {
    default: require('../assets/icons/poente.png'),
    selected: require('../assets/icons/poente_white.png'),
  },
  Perpendicular: {
    default: require('../assets/icons/perpendicular.png'),
    selected: require('../assets/icons/perpendicular_white.png'),
  },
};

const OneCadastroImovel = () => {
  const [quartos, setQuartos] = useState(0);
  const [suites, setSuites] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [garagem, setGaragem] = useState(0);
  const [orientacaoSol, setOrientacaoSol] = useState('');
  const [areaPrivativa, setAreaPrivativa] = useState('');
  const [areaTotal, setAreaTotal] = useState('');

  // Referências dos TextInputs para navegação
  const areaPrivativaRef = useRef(null);
  const areaTotalRef = useRef(null);

  // Funções de incremento e decremento
  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => setter(Math.max(0, value - 1));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

              {/* Orientação do Sol */}
              <View style={styles.row}>
                <Text style={[styles.subLabel, styles.orientacaoText]} allowFontScaling={false}>Orientação do sol</Text>
                <View style={styles.orientationGroup}>
                  {['Nascente', 'Poente', 'Perpendicular'].map((opcao) => (
                    <TouchableOpacity
                      key={opcao}
                      style={[styles.orientationButton, orientacaoSol === opcao && styles.selectedOptionOrientation]}
                      onPress={() => setOrientacaoSol(orientacaoSol === opcao ? '' : opcao)} // Desmarca se já estiver selecionado
                    >
                      <Image
                        source={orientacaoSol === opcao ? icons[opcao].selected : icons[opcao].default}
                        style={{ width: 30, height: 30, marginBottom: 5 }}
                      />
                      <Text style={[styles.optionText, orientacaoSol === opcao && styles.selectedOptionText]} allowFontScaling={false}>
                        {opcao}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Inputs de Área */}
              <View style={styles.areaRow}>
                <View style={styles.areaColumn}>
                  <Text style={styles.subLabel} allowFontScaling={false}>Área privativa - m²</Text>
                  <TextInput
                    ref={areaPrivativaRef}
                    style={styles.areaInput}
                    placeholder="m²"
                    value={areaPrivativa}
                    onChangeText={setAreaPrivativa}
                    returnKeyType="next"
                    onSubmitEditing={() => areaTotalRef.current.focus()}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.areaColumn}>
                  <Text style={styles.subLabel} allowFontScaling={false}>Área total - m²</Text>
                  <TextInput
                    ref={areaTotalRef}
                    style={styles.areaInput}
                    placeholder="m²"
                    value={areaTotal}
                    onChangeText={setAreaTotal}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss} // Fecha o teclado
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.subLabel} allowFontScaling={false}>Detalhes do imóvel</Text>

              </View>

            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    fontSize: Platform.select({ ios: width * 0.037, android: width * 0.035 }),
    fontWeight: '600',
    color: '#1F2024',
    marginBottom: 5,
  },
  orientacaoText: {
    fontSize: Platform.select({ ios: width * 0.033, android: width * 0.035 }),
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
    fontSize: width * 0.029,
    color: '#494A50',
  },
  selectedOptionText: {
    color: '#FFF',
  },
  suitesGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  suitesNumberContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  suitesText: {
    fontSize: width * 0.04,
    color: '#1F2024',
    textAlign: 'center',
  },
  incrementDecrementButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 44,
    height: 44,
  },
  incrementDecrementButtonText: {
    fontSize: 20,
    color: '#494A50',
  },
  orientationGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  orientationButton: {
    borderRadius: 25,
    backgroundColor: '#E9E9E9',
    padding: 10,
    alignItems: 'center',
    width: '30%',
  },
  selectedOptionOrientation: {
    backgroundColor: '#FF7A00',
  },
  areaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  areaColumn: {
    width: '48%',
  },
  areaInput: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
};

export default OneCadastroImovel;