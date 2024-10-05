import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const SituacaoImovelSelect = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSituacao, setSelectedSituacao] = useState(null);
  const situacoes = ['Alugado', 'Desocupado', 'Em obra', 'Ocupado pelo proprietário'];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelect = (situacao) => {
    setSelectedSituacao(situacao);
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label} allowFontScaling={false}>Situação do imóvel</Text>
      
      <TouchableOpacity style={styles.selectBox} onPress={toggleModal}>
        <Text style={[styles.selectText, !selectedSituacao && styles.placeholderText]} allowFontScaling={false}>
          {selectedSituacao ? selectedSituacao : 'Selecione'}
        </Text>
        <Text style={styles.arrow}>⌵</Text>
      </TouchableOpacity>
      
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {situacoes.map((situacao, index) => (
                <TouchableOpacity key={index} onPress={() => handleSelect(situacao)} style={styles.option}>
                  <Text style={styles.optionText} allowFontScaling={false}>{situacao}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 110,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2024',
    marginBottom: 5,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
    color: '#494A50',
  },
  placeholderText: {
    color: '#A9A9A9',
  },
  arrow: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2024',
  },
});

export default SituacaoImovelSelect;
