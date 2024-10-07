// components/Home.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform, Modal } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const status = 1; // Simulando o status do usuário, ajuste conforme necessário
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header com logo e notificação */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/img/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={() => alert('Notificações')}>
            <Ionicons name="notifications-outline" size={24} color="#1F2024" />
          </TouchableOpacity>
        </View>

        {/* Linha de separação do header */}
        <View style={styles.headerLine} />

        {/* Mensagem de bem-vindo */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText} allowFontScaling={false}>Bem-vindo à imoGo!</Text>
          <Text style={styles.subText} allowFontScaling={false}>Seus imóveis publicados aparecerão aqui.</Text>
        </View>

        {/* Container principal para conteúdo */}
        <View style={styles.bodyContainer}>
          {status === 1 ? (
            <View style={styles.noPropertiesContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)} // Abre o modal ao clicar no botão
              >
                <Text style={styles.addButtonText} allowFontScaling={false}>+ Adicionar Imóvel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.propertiesContainer}>
              {/* Aqui você renderizaria a lista de imóveis */}
              <Text style={styles.propertyText} allowFontScaling={false}>Seus imóveis cadastrados:</Text>
              {/* Exemplo de um imóvel */}
              <View style={styles.propertyItem}>
                <Text style={styles.propertyText} allowFontScaling={false}>Apartamento em Brasília</Text>
                <TouchableOpacity
                  style={styles.propertyButton}
                  onPress={() => navigation.navigate('PropertyDetailsScreen')}
                >
                  <Text style={styles.propertyButtonText} allowFontScaling={false}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Modal para selecionar a categoria do imóvel */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle} allowFontScaling={false}>Escolha a categoria do imóvel</Text>
              <View style={styles.categoryContainer}>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setModalVisible(false)}>
                  <Image
                    source={require('../assets/img/residencial.png')}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryText} allowFontScaling={false}>Residencial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setModalVisible(false)}>
                  <Image
                    source={require('../assets/img/comercial.png')}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryText} allowFontScaling={false}>Comercial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setModalVisible(false)}>
                  <Image
                    source={require('../assets/img/outro.png')}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryText} allowFontScaling={false}>Outro</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Linha de separação do rodapé */}
        <View style={styles.footerLine} />

        {/* Footer fixo */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={24} color="#FF7A00" />
            <Text style={styles.footerItemTextActive} allowFontScaling={false}>Meus imóveis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => setModalVisible(true)}>
            <FontAwesome5 name="plus-square" size={24} color="#7A7A7A" />
            <Text style={styles.footerItemText} allowFontScaling={false}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('PricerScreen')}>
            <FontAwesome5 name="dollar-sign" size={24} color="#7A7A7A" />
            <Text style={styles.footerItemText} allowFontScaling={false}>Precificador</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('ProfileScreen')}>
            <Ionicons name="person-outline" size={24} color="#7A7A7A" />
            <Text style={styles.footerItemText} allowFontScaling={false}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#F5F5F5',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.15,
    height: height * 0.05,
  },
  headerLine: {
    height: 1,
    backgroundColor: '#E9E9E9',
    width: '100%',
  },
  welcomeContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  welcomeText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: Platform.select({
      ios: width * 0.05,
      android: width * 0.05,
    }),
    color: '#1F2024',
    marginBottom: height * 0.005,
    textAlign: 'center',
  },
  subText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: Platform.select({
      ios: width * 0.04,
      android: width * 0.04,
    }),
    color: '#7A7A7A',
    textAlign: 'center',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.03,
  },
  noPropertiesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 30,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  addButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: '#FFF',
    fontSize: Platform.select({
      ios: width * 0.045,
      android: width * 0.045,
    }),
    textAlign: 'center',
  },
  propertiesContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
  },
  propertyItem: {
    backgroundColor: '#FFF',
    padding: height * 0.02,
    marginVertical: height * 0.01,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  propertyText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: Platform.select({
      ios: width * 0.045,
      android: width * 0.045,
    }),
    color: '#1F2024',
  },
  propertyButton: {
    marginTop: height * 0.01,
    paddingVertical: height * 0.01,
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    alignItems: 'center',
  },
  propertyButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: '#FFF',
    fontSize: Platform.select({
      ios: width * 0.04,
      android: width * 0.04,
    }),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#FF7A00',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05,
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
  categoryIcon: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  categoryText: {
    marginTop: height * 0.01,
    fontSize: width * 0.03,
    color: '#FB7D10',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerLine: {
    height: 1,
    backgroundColor: '#E9E9E9',
    width: '100%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.015,
    backgroundColor: '#F5F5F5',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerItemText: {
    fontSize: Platform.select({
      ios: width * 0.03,
      android: width * 0.03,
    }),
    fontFamily: 'Nunito_400Regular',
    color: '#7A7A7A',
    marginTop: 4,
  },
  footerItemTextActive: {
    fontSize: Platform.select({
      ios: width * 0.03,
      android: width * 0.03,
    }),
    fontFamily: 'Nunito_700Bold',
    color: '#FF7A00',
    marginTop: 4,
  },
});

export default Home;
