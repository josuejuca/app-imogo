// components/ImovelCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

// Função para definir as cores dos status
const getStatusColor = (status) => {
  switch (status) {
    case 'Autorização de venda':
      return '#FFB874';
    case 'Avaliação Jurídica':
      return '#FF6347';
    case 'Visita Fotográfica':
      return '#87CEEB';
    case 'Publicado':
      return '#32CD32';
    default:
      return '#B0B0B0';
  }
};

const ImovelCard = ({ imovel, onPress }) => {
  const { status, imagem, valor, localizacao } = imovel;
  const statusColor = getStatusColor(status);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* Imagem do imóvel */}
      <View style={styles.imageContainer}>
        <Image source={imagem} style={styles.image} resizeMode="cover" />
      </View>

      {/* Informações do imóvel */}
      <View style={styles.infoContainer}>
        <Text style={styles.priceText} allowFontScaling={false}>{valor}</Text>
        <Text style={styles.locationText} allowFontScaling={false}>{localizacao}</Text>
      </View>

      {/* Status do imóvel */}
      <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText} allowFontScaling={false}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: height * 0.02,
    width: '90%', // Ocupar 90% da largura da tela
    alignSelf: 'center', // Centralizar o cartão
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.2, // Tamanho fixo da imagem
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%', // Ajustar para cobrir 100% da largura do container
    height: '100%', // Ajustar para cobrir 100% da altura disponível
  },
  infoContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#DCDCDC',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  priceText: {
    fontSize: width * 0.045,
    color: '#1F2024',
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: width * 0.037,
    color: '#71727A',
    marginTop: height * 0.005,
  },
  statusContainer: {
    position: 'absolute',
    top: height * 0.015,
    right: width * 0.05, // Alinhamento à direita
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.005,
  },
  statusText: {
    fontSize: width * 0.03,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ImovelCard;
