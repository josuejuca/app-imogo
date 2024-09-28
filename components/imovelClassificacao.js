// components/ImovelClassificacao.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ImovelClassificacao = ({ modalVisible, setModalVisible, categoria, setSelectedTipo }) => {
  const tiposPorCategoria = {
    Residencial: [
      'Selecionar', // Item padrão
      'Apartamento',
      'Casa',
      'Flat / Apart-Hotel',
      'Prédio',
      'Studio / Kitnet'
    ],
    Comercial: [
      'Selecionar', // Item padrão
      'Galpão',
      'Loja',
      'Prédio',
      'Ponto Comercial',
      'Sala'
    ],
    Outro: [
      'Selecionar', // Item padrão
      'Galpão',
      'Lote / Terreno / Área',
      'Rural'
    ]
  };

  // Obter os tipos de imóveis com base na categoria selecionada
  const tipos = tiposPorCategoria[categoria] || ['Selecionar']; // Use 'Selecionar' se a categoria não existir
  const [selectedTipo, setSelectedTipoLocal] = useState('Selecionar'); // Estado local para o tipo de imóvel selecionado
  const [initialTipo, setInitialTipo] = useState('Selecionar'); // Estado para manter o valor inicial do tipo antes de qualquer alteração
  const [dropdownVisible, setDropdownVisible] = useState(false); // Controle para mostrar ou esconder o menu suspenso

  const handleSelectTipo = (itemValue) => {
    setSelectedTipoLocal(itemValue); // Atualiza o estado local
    setDropdownVisible(false); // Esconde o dropdown após a seleção
  };

  const handleCancel = () => {
    setSelectedTipoLocal(initialTipo); // Reverte a seleção ao valor inicial
    setDropdownVisible(false); // Esconde o dropdown
    setModalVisible(false); // Fecha o modal
  };

  const handleConfirm = () => {
    if (selectedTipo !== 'Selecionar') {
      setInitialTipo(selectedTipo); // Salva o novo valor inicial
      setSelectedTipo(selectedTipo); // Atualiza o estado no componente pai
      setModalVisible(false); // Fecha o modal
    } else {
      alert('Por favor, selecione um tipo de imóvel.');
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => handleCancel()} // Cancela ao pressionar fora do modal ou o botão de voltar
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle} allowFontScaling={false}>{categoria}</Text>
          <Text style={styles.modalSubtitle} allowFontScaling={false}>Escolha o tipo do imóvel:</Text>

          {/* Botão que mostra o valor selecionado ou "Selecionar" */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.dropdownButtonText} allowFontScaling={false}>
              {selectedTipo}
            </Text>
            <Ionicons name={dropdownVisible ? "chevron-up" : "chevron-down"} size={24} color="#333" />
          </TouchableOpacity>

          {/* Lista de opções exibida quando o dropdown é clicado */}
          {dropdownVisible && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={tipos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selectedTipo === item ? styles.dropdownItemSelected : null
                    ]}
                    onPress={() => handleSelectTipo(item)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedTipo === item ? styles.dropdownItemTextSelected : null
                      ]}
                      allowFontScaling={false}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
              <Text style={styles.cancelButtonText} allowFontScaling={false}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.okButton} 
              onPress={() => handleConfirm()}
            >
              <Text style={styles.okButtonText} allowFontScaling={false}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.85,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#FFF',
    borderRadius: Platform.OS === 'ios' ? 20 : 15, // Diferente para iOS e Android
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: Platform.select({
      ios: width * 0.045, // Ajuste de acordo com o layout do iOS
      android: width * 0.05
    }),
    color: '#1F2024', // Cor mais próxima da referência
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: Platform.select({
      ios: width * 0.04,
      android: width * 0.04,
    }),
    color: '#7A7A7A',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.02,
    backgroundColor: '#FFF',
  },
  dropdownButtonText: {
    fontSize: width * 0.045,
    color: '#333',
  },
  dropdownContainer: {
    width: '100%',
    maxHeight: height * 0.3,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownItemSelected: {
    backgroundColor: '#FF7A00',
  },
  dropdownItemText: {
    fontSize: width * 0.045,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: height * 0.02,
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderColor: '#FF7A00',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
  },
  okButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: Platform.select({
      ios: width * 0.035, // Menor em iOS para melhor aparência
      android: width * 0.04,
    }),
    color: '#FF7A00',
  },
  okButtonText: {
    fontSize: Platform.select({
      ios: width * 0.035,
      android: width * 0.04,
    }),
    color: '#FFF',
  },
});

export default ImovelClassificacao;
