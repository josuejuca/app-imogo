// components/ImoveisList.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ImovelCard from './ImovelCard';

const ImoveisList = ({ userId, navigation }) => {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    console.log('Buscando imóveis para o usuário:', userId);
    const fetchedImoveis = [
      {
        id: 1,
        status: 'Aguardando minha assinatura',
        imagem: require('../assets/img/banner_imovel.png'),
        valor: 'R$ 1.200.000,00',
        localizacao: 'Asa Norte - Brasília/DF',
      },
      {
        id: 2,
        status: 'Publicado',
        imagem: require('../assets/img/banner_imovel.png'),
        valor: 'R$ 950.000,00',
        localizacao: 'Taguatinga - Brasília/DF',
      },
    ];
    setImoveis(fetchedImoveis);
  }, [userId]);

  const renderImovel = ({ item }) => (
    <ImovelCard
      imovel={item}
      onPress={() => navigation.navigate('DetalhesImovel', { imovelId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      {imoveis.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum imóvel encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={imoveis}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderImovel}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default ImoveisList;
