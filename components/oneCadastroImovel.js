import React, { useState, useRef } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Dimensions, SafeAreaView, Platform, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import DetalhesModal from './DetalhesModal'; // Importe o modal
import DescricaoModal from './DescricaoModal';
import SituacaoImovelSelect from './SituacaoImovelSelect';
import PagamentoModal from './PagamentoModal';

import Svg, { Path, G, Rect, Mask, Ellipse, ClipPath } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Ícone de seta para voltar
const BackArrowIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Mask id="mask0_1_782" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="5" y="0" width="15" height="24">
      <Path fillRule="evenodd" clipRule="evenodd" d="M18.5489 0.939645C19.151 1.52543 19.151 2.47518 18.5489 3.06097L9.36108 12.0003L18.5489 20.9396C19.151 21.5254 19.151 22.4752 18.5489 23.061C17.9469 23.6468 16.9707 23.6468 16.3686 23.061L5.00049 12.0003L16.3686 0.939645C16.9707 0.353859 17.9469 0.353859 18.5489 0.939645Z" fill="#FB7D10" />
    </Mask>
    <G mask="url(#mask0_1_782)">
      <Rect x="0.000488281" y="-0.00164795" width="24" height="24" fill="#FB7D10" />
    </G>
  </Svg>
);

// Função para formatar o valor como moeda (R$)
const formatCurrency = (value) => {
  if (!value) return '';

  // Remove tudo o que não for número
  const numericValue = value.replace(/[^0-9]/g, '');

  // Converte para número e formata com casas decimais
  const formattedValue = (numericValue / 100).toFixed(2).replace('.', ',');

  // Insere o ponto a cada três dígitos (se necessário)
  return 'R$ ' + formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

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

const OneCadastroImovel = ({ route, navigation }) => {
  const { id = null, status = 1, classificacao = '', tipo = '', userID } = route.params || {};

  const [quartos, setQuartos] = useState(0);
  const [suites, setSuites] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [garagem, setGaragem] = useState(0);
  const [orientacaoSol, setOrientacaoSol] = useState('');
  const [areaPrivativa, setAreaPrivativa] = useState('');
  const [areaTotal, setAreaTotal] = useState('');
  // const [descricao, setDescricao] = useState('');  // Estado para a descrição
  // const [valorVendaImovel, setValorVendaImovel] = useState('');
  // const [valorCondominio, setValorCondominio] = useState('');
  const [detalhesImovel, setDetalhesImovel] = useState([]);
  const [detalhesCondominio, setDetalhesCondominio] = useState([]);
  // const [formasPagamento, setFormasPagamento] = useState([]);

  // Função para enviar os dados do imóvel para a API
  const handleSaveImovel = async () => {
    try {
      const payload = {
        usuario_id: userID,
        status: 2,
        classificacao: classificacao,
        tipo: tipo,
        numero_quartos: quartos,
        numero_suites: suites,
        numero_banheiros: banheiros,
        numero_garagem: garagem,
        orientacao_sol: orientacaoSol,
        area_total: parseFloat(areaTotal),
        area_privativa: parseFloat(areaPrivativa),
        descricao_complementar: descricao,
        valor_venda: parseFloat(valorVendaImovel.replace(/[^\d]/g, '')) / 100, // Converte para número
        detalhes_do_imovel: detalhesImovel,
        detalhes_do_condominio: detalhesCondominio,
        formas_pagamento: formasPagamento,
        foto_app_capa: 'https://cdn.imogo.com.br/img/banner_imovel.png',
      };

      const response = await axios.post('http://192.168.122.9:8000/api/v1/imoveis/', payload);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Imóvel cadastrado com sucesso');
        navigation.navigate('Home')(); // Redireciona após o sucesso
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o imóvel');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o imóvel');
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDescricao, setIsModalVisibleDescricao] = useState(false);
  const [modalType, setModalType] = useState(null); // Define se é 'imovel' ou 'condominio'

  const areaPrivativaRef = useRef(null);
  const areaTotalRef = useRef(null);

  // Funções de incremento e decremento
  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => setter(Math.max(0, value - 1));

  // Função para abrir e fechar o modal e definir o tipo de modal
  const openModal = (type) => {
    setModalType(type); // Define se é para imóvel ou condomínio
    setIsModalVisible(true);
  };

  // Função para truncar texto
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const maxDetalhesVisiveis = 3;

  //  descrição 2.0 

  // Defina o estado para 'descricao' corretamente
  const [descricao, setDescricao] = useState('');  // Estado para a descrição


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalDescricao = () => {
    setIsModalVisibleDescricao(!isModalVisibleDescricao);
  };

  // pagamento 

  const [formasPagamento, setFormasPagamento] = useState([]); // Para armazenar as formas de pagamento
  const [isPagamentoModalVisible, setIsPagamentoModalVisible] = useState(false); // Estado para o modal de formas de pagamento
  // Função para abrir o modal de formas de pagamento
  const openPagamentoModal = () => {
    setIsPagamentoModalVisible(true);
  };

  const togglePagamentoModal = () => {
    setIsPagamentoModalVisible(!isPagamentoModalVisible);
  };

  // valores 
  const [valorVendaImovel, setValorVendaImovel] = useState('');
  const [valorCondominio, setValorCondominio] = useState('');
  const [naoPossuiCondominio, setNaoPossuiCondominio] = useState(false);

  const toggleNaoPossuiCondominio = () => {
    setNaoPossuiCondominio(!naoPossuiCondominio);
    if (!naoPossuiCondominio) {
      setValorCondominio(''); // Define o valor como 0 quando marcado
    } else {
      setValorCondominio(''); // Limpa o valor se desmarcado
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>{classificacao} - {tipo}</Text>
      </View>

      <Text style={styles.classificacaoText} allowFontScaling={false}>
        Características do imóvel
      </Text>

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

              {/* Exibir os detalhes do imóvel */}
              <View style={styles.row}>
                <Text style={styles.subLabel} allowFontScaling={false}>Detalhes do Imóvel</Text>
                <View style={styles.detalhesWrapper}>
                  {detalhesImovel.slice(0, maxDetalhesVisiveis).map((detalhe, index) => (
                    <TouchableOpacity key={index} onPress={() => openModal('imovel')} style={styles.detalheItem}>
                      <Text allowFontScaling={false} style={styles.detalheText}>
                        {truncateText(detalhe, 10)}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {detalhesImovel.length > maxDetalhesVisiveis ? (
                    <View style={styles.detalheExtra}>
                      <Text allowFontScaling={false} style={styles.detalheExtraText}>+{detalhesImovel.length - maxDetalhesVisiveis}</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => openModal('imovel')} style={styles.detalheAddButton}>
                      <Text allowFontScaling={false} style={styles.detalheAddText}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Exibir os detalhes do condomínio */}
              <View style={styles.row}>
                <Text style={styles.subLabel} allowFontScaling={false}>Detalhes do Condomínio</Text>
                <View style={styles.detalhesWrapper}>
                  {detalhesCondominio.slice(0, maxDetalhesVisiveis).map((detalhe, index) => (
                    <TouchableOpacity key={index} onPress={() => openModal('condominio')} style={styles.detalheItem}>
                      <Text allowFontScaling={false} style={styles.detalheText}>
                        {truncateText(detalhe, 10)}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {detalhesCondominio.length > maxDetalhesVisiveis ? (
                    <View style={styles.detalheExtra}>
                      <Text allowFontScaling={false} style={styles.detalheExtraText}>+{detalhesCondominio.length - maxDetalhesVisiveis}</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => openModal('condominio')} style={styles.detalheAddButton}>
                      <Text allowFontScaling={false} style={styles.detalheAddText}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Modal de Detalhes */}
              {modalType && (
                <DetalhesModal
                  isVisible={isModalVisible}
                  toggleModal={() => setIsModalVisible(false)}
                  detalhesSelecionados={modalType === 'imovel' ? detalhesImovel : detalhesCondominio}
                  setDetalhesSelecionados={modalType === 'imovel' ? setDetalhesImovel : setDetalhesCondominio}
                  type={modalType} // Passa o tipo do modal (imovel ou condominio)
                />
              )}

              {/* Outros campos */}

              {/* Detalhes do Imóvel */}
              <View style={styles.row}>
                <Text style={styles.subLabel} allowFontScaling={false}>Descrição complementar (opcional)</Text>
                <TouchableOpacity style={styles.descriptionBox} onPress={toggleModalDescricao}>
                  <Text style={[styles.descriptionText, descricao ? styles.descriptionFilled : styles.placeholderText]} allowFontScaling={false}>
                    {truncateText(descricao, 30)}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.helperText} allowFontScaling={false}>
                  Descreva aqui da melhor forma possível as características únicas do seu imóvel que faltaram anteriormente.
                </Text>
              </View>

              {/* Modal de Descrição */}
              <DescricaoModal
                isVisible={isModalVisibleDescricao}
                toggleModal={toggleModalDescricao}
                descricao={descricao}
                setDescricao={setDescricao}
              />
              {/* situação do imovel */}
              <SituacaoImovelSelect />

              {/* Separador visual (Divisão) */}
              <View style={styles.divider} />

              {/* Formas de Pagamento */}
              <View style={styles.row}>
                <Text style={styles.titleLabel} allowFontScaling={false}>Condições de venda</Text>
                <Text style={styles.subLabel} allowFontScaling={false}>Formas de pagamento aceitas</Text>
                <View style={styles.detalhesWrapper}>
                  {formasPagamento.slice(0, maxDetalhesVisiveis).map((forma, index) => (
                    <TouchableOpacity key={index} onPress={openPagamentoModal} style={styles.detalheItem}>
                      <Text allowFontScaling={false} style={styles.detalheText}>{truncateText(forma, 10)}</Text>
                    </TouchableOpacity>
                  ))}
                  {formasPagamento.length > maxDetalhesVisiveis ? (
                    <View style={styles.detalheExtra}>
                      <Text allowFontScaling={false} style={styles.detalheExtraText}>+{formasPagamento.length - maxDetalhesVisiveis}</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={openPagamentoModal} style={styles.detalheAddButton}>
                      <Text allowFontScaling={false} style={styles.detalheAddText}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Modal de Formas de Pagamento */}
              <PagamentoModal
                isVisible={isPagamentoModalVisible}
                toggleModal={togglePagamentoModal}
                formasPagamento={formasPagamento}
                setFormasPagamento={setFormasPagamento}
              />

              {/* valores */}

              {/* Valor de venda do imóvel */}

              {/* Valor de venda do imóvel */}
              <View style={styles.row}>
                <Text style={styles.subLabel} allowFontScaling={false}>Valor de venda do imóvel</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.areaInput}
                    placeholder="R$"
                    value={valorVendaImovel}
                    onChangeText={(text) => setValorVendaImovel(formatCurrency(text))}
                    keyboardType="numeric"
                    allowFontScaling={false}
                  />
                </View>
              </View>

              {/* Valor do condomínio */}
              <View style={styles.row}>
                <Text style={styles.subLabel} allowFontScaling={false}>Valor do condomínio</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.areaInput}
                    placeholder="R$"
                    value={valorCondominio}
                    onChangeText={(text) => setValorCondominio(formatCurrency(text))}
                    keyboardType="numeric"
                    allowFontScaling={false}
                    editable={!naoPossuiCondominio}
                  />
                </View>
              </View>

              {/* Checkbox "Não possui condomínio" */}
              <View style={styles.checkboxRow}>
                <Checkbox
                  value={naoPossuiCondominio}
                  onValueChange={toggleNaoPossuiCondominio}
                  color={naoPossuiCondominio ? '#FB7D10' : undefined}
                />
                <Text style={styles.checkboxLabel} allowFontScaling={false}>Não possui condomínio</Text>
              </View>

              {/* Botões de ação */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveImovel}>
                  <Text style={styles.saveButtonText} allowFontScaling={false}>Salvar características</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.laterButton}>
                  <Image
                    source={require('../assets/icons/bookmark.png')} // Ícone de terminar mais tarde
                    style={styles.laterIcon}
                  />
                  <Text style={styles.laterButtonText} allowFontScaling={false} onPress={handleSaveImovel}>Terminar mais tarde</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = {

  // voltar 
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#1F2024',
    textAlign: 'center',
  },
  classificacaoText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#1F2024',
    marginBottom: 10,
    textAlign: 'left',
    paddingLeft: 20,
  },
  stepsContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  //
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
  titleLabel: {
    fontSize: Platform.select({ ios: width * 0.057, android: width * 0.055 }),
    fontWeight: '600',
    color: '#1F2024',
    marginBottom: 10,
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
    marginLeft: Platform.select({ ios: -10, android: 10 }),
    marginTop: 10,
  },
  suitesNumberContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
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

  // modal 

  detalhesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginTop: 10,
    maxWidth: '100%',  // Definir tamanho máximo para o container
    justifyContent: 'flex-start',
  },
  detalheItem: {
    backgroundColor: '#E9E9E9',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
  },
  detalheText: {
    color: '#000',
    fontSize: 14,
    maxWidth: Platform.select({ ios: 100, android: 90 }), // Controla a largura máxima do texto
  },
  detalheAddButton: {
    backgroundColor: '#E9E9E9',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 8,
  },
  detalheAddText: {
    fontSize: 20,
    color: '#000',
  },
  detalheExtra: {
    backgroundColor: '#FF7A00',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 8,
  },
  detalheExtraText: {
    color: '#FFF',
  },

  // descrição 

  descriptionBox: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    minHeight: 50,
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#494A50',
  },
  placeholderText: {
    color: '#D3D3D3',  // Estilo de placeholder
  },
  descriptionFilled: {
    color: '#1F2024',  // Cor do texto quando preenchido
  },
  helperText: {
    fontSize: 12,
    color: '#7A7A7A',
    marginTop: 5,
  },

  // pagamento 
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    width: '100%',
  },

  // valores

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#7A7A7A',
    marginLeft: 10,
  },

  // salvar 

  areaInput: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#7A7A7A',
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 40, // Ajuste do espaçamento superior
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 15,
    paddingHorizontal: width * 0.2, // Mais largura
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: Platform.select({ ios: width * 0.04, android: width * 0.04 }), // Ajuste no tamanho da fonte
    fontWeight: '600',
  },
  laterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  laterIcon: {
    width: 15,
    height: 20,
    marginRight: 8,
  },
  laterButtonText: {
    color: '#FF7A00',
    fontSize: Platform.select({ ios: width * 0.04, android: width * 0.04 }), // Ajuste no tamanho da fonte
    fontWeight: '600',
  },
};

export default OneCadastroImovel;