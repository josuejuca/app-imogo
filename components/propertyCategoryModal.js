import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const PropertyCategoryModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Escolha a categoria do imóvel</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="home" size={40} color="#FB7D10" />
              <Text style={styles.categoryText}>Residencial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="business" size={40} color="#FB7D10" />
              <Text style={styles.categoryText}>Comercial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="home-outline" size={40} color="#FB7D10" />
              <Text style={styles.categoryText}>Outro</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo com opacidade para efeito de destaque
  },
  modalContainer: {
    width: width * 0.85,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#FB7D10',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.02,
    right: width * 0.05,
  },
  modalTitle: {
    fontSize: width * 0.05,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  categoryButton: {
    width: width * 0.22,
    height: width * 0.22,
    backgroundColor: '#FFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.02,
  },
  categoryText: {
    marginTop: height * 0.01,
    fontSize: width * 0.03,
    color: '#FB7D10',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PropertyCategoryModal;
