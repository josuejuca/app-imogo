// components/ImovelCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const ImovelCard = ({ imovel, onPress }) => {
  const { status, imagem, valor, localizacao } = imovel;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* Status do imóvel */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText} allowFontScaling={false}>{status}</Text>
      </View>

      {/* Imagem do imóvel */}
      <View style={styles.imageContainer}>
        <Image source={imagem} style={styles.image} resizeMode="contain" />
      </View>

      {/* Informações do imóvel */}
      <View style={styles.infoContainer}>
        <Text style={styles.priceText} allowFontScaling={false}>{valor}</Text>
        <Text style={styles.locationText} allowFontScaling={false}>{localizacao}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginVertical: height * 0.02,
    width: width * 0.95, // Largura ajustada para ocupar quase toda a tela
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  statusContainer: {
    position: 'absolute',
    top: height * 0.02,
    right: width * 0.05,
    backgroundColor: '#FFB874',
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.005,
  },
  statusText: {
    fontSize: width * 0.03,
    color: '#3C3C3C',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.2, // Tamanho fixo para a imagem do imóvel
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  infoContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#EDEDED',
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
    color: '#7A7A7A',
    marginTop: height * 0.005,
  },
});

export default ImovelCard;
