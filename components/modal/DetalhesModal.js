import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

const DetalhesModal = ({ isVisible, toggleModal, detalhesSelecionados, setDetalhesSelecionados, type }) => {
  const [detalhesDisponiveis, setDetalhesDisponiveis] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definindo o endpoint da API com base no tipo
  const apiEndpoint =
    type === 'imovel'
      ? 'http://imogo.juk.re:8000/api/v1/caracteristicas_imovel/?skip=0&limit=100'
      : 'http://imogo.juk.re:8000/api/v1/caracteristicas_condominio/?skip=0&limit=100';

  // Função para limpar e carregar os dados da API quando o modal for aberto
  useEffect(() => {
    if (isVisible) {
      setLoading(true); // Iniciar o carregamento
      setDetalhesDisponiveis([]); // Limpar os detalhes disponíveis
      fetch(apiEndpoint)
        .then((response) => response.json())
        .then((data) => {
          const caracteristicas = data.map((item) => item.caracteristicas);
          setDetalhesDisponiveis(caracteristicas);
          setLoading(false); // Carregamento concluído
        })
        .catch((error) => {
          console.error('Erro ao carregar os detalhes:', error);
          setLoading(false); // Mesmo em caso de erro, parar o carregamento
        });
    }
  }, [isVisible]);

  // Função para adicionar ou remover detalhes
  const toggleDetalhe = (detalhe) => {
    if (detalhesSelecionados.includes(detalhe)) {
      setDetalhesSelecionados(detalhesSelecionados.filter((item) => item !== detalhe));
    } else {
      setDetalhesSelecionados([...detalhesSelecionados, detalhe]);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            Selecione os detalhes {type === 'imovel' ? 'do Imóvel' : 'do Condomínio'}
          </Text>

          {/* Exibir o indicador de carregamento enquanto os dados estão sendo buscados */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF7A00" />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          ) : (
            <ScrollView style={styles.scrollView}>
              {detalhesDisponiveis.map((detalhe, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleDetalhe(detalhe)}
                  style={[
                    styles.detalheOption,
                    detalhesSelecionados.includes(detalhe) && styles.selectedOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.detalheOptionText,
                      detalhesSelecionados.includes(detalhe) && styles.selectedOptionText,
                    ]}
                  >
                    {detalhe}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
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
    width: '80%',
    height: '50%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
  },
  detalheOption: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  detalheOptionText: {
    fontSize: 16,
    color: '#000', // Texto padrão preto
  },
  selectedOptionText: {
    color: '#FFF', // Texto branco para a opção selecionada
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF7A00',
  },
};

export default DetalhesModal;
