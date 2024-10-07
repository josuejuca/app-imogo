import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const DescricaoModal = ({ isVisible, toggleModal, descricao, setDescricao }) => {
  const [descricaoInput, setDescricaoInput] = useState(descricao || ''); // Manter a descrição do estado principal

  // Função para salvar e fechar o modal
  const salvarDescricao = () => {
    setDescricao(descricaoInput);
    toggleModal();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalTitle} allowFontScaling={false}>Descrição complementar</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText} allowFontScaling={false}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.helperText} allowFontScaling={false}>Descreva aqui da melhor forma possível as características únicas do seu imóvel que faltaram anteriormente.</Text>

          {/* Campo de texto da descrição */}
          <TextInput
            style={styles.input}
            multiline
            maxLength={200}
            value={descricaoInput}
            onChangeText={setDescricaoInput}
            placeholder="Digite a descrição aqui..."
            placeholderTextColor="#D3D3D3"
            allowFontScaling={false} // Garantir que a fonte não escale
          />

          {/* Contador de caracteres */}
          <Text style={styles.charCount} allowFontScaling={false}>{descricaoInput.length}/200</Text>

          {/* Botão de salvar */}
          <TouchableOpacity style={styles.saveButton} onPress={salvarDescricao}>
            <Text style={styles.saveButtonText} allowFontScaling={false}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: Platform.select({ ios: '85%', android: '90%' }), // Responsivo entre iOS e Android
    alignItems: 'center',
    paddingTop: 40, // Deixa um espaço para o botão de fechar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    position: 'relative', // Ajusta para manter o alinhamento com o título
    right: 0,
  },
  closeButtonText: {
    fontSize: Platform.select({ ios: 18, android: 16 }), // Controla o tamanho da fonte entre plataformas
    color: '#000',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: Platform.select({ ios: 18, android: 16 }), // Tamanho da fonte para o título
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  helperText: {
    fontSize: Platform.select({ ios: 14, android: 13 }), // Tamanho da fonte
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: 120,
    fontSize: Platform.select({ ios: 16, android: 15 }), // Responsividade no tamanho da fonte
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
  },
  charCount: {
    alignSelf: 'flex-start',
    fontSize: Platform.select({ ios: 12, android: 11 }),
    color: '#7A7A7A',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: Platform.select({ ios: 16, android: 15 }),
    fontWeight: 'bold',
  },
};

export default DescricaoModal;
