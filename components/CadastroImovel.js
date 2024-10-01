import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import Svg, { Path, G, Rect, Mask, Ellipse, ClipPath } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Função para definir a cor das bolinhas com base no status atual
const getStepColor = (currentStatus, stepStatus) => {
  if (currentStatus > stepStatus) return '#077755'; // Verde para etapas concluídas
  if (currentStatus === stepStatus) return '#FF7A00'; // Laranja para a etapa atual
  return '#D3D3D3'; // Cinza para etapas futuras
};

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

// Ícone de seta para etapa
const StepArrowIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Mask id="mask0_2085_691" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="0" width="8" height="12">
      <Path fillRule="evenodd" clipRule="evenodd" d="M2.72592 0.470363C2.4249 0.763245 2.4249 1.2381 2.72592 1.53098L7.31967 6.00048L2.72592 10.47C2.4249 10.7629 2.4249 11.2377 2.72592 11.5306C3.02694 11.8235 3.515 11.8235 3.81602 11.5306L9.49988 6.00048L3.81602 0.470363C3.515 0.177481 3.02694 0.177481 2.72592 0.470363Z" fill="#FB7D10" />
    </Mask>
    <G mask="url(#mask0_2085_691)">
      <Rect x="0.000244141" y="-0.000244141" width="11.9995" height="11.9995" fill="#FB7D10" />
    </G>
  </Svg>
);

// Ícone de check concluído correto
const CheckIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <ClipPath id="clip0_2085_304">
      <Rect width="12" height="12" />
    </ClipPath>
    <G clipPath="url(#clip0_2085_304)">
      <Mask id="mask0_2085_304" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="13">
        <Ellipse cx="6" cy="6.00048" rx="6" ry="5.99991" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_2085_304)">
        <Rect x="-6" y="0.000366211" width="24" height="11.9998" fill="#077755" />
      </G>
      <Path d="M8.21358 4.41604C8.01895 4.20642 7.69631 4.20316 7.49785 4.40935L5.26291 6.73129L4.13782 5.5624C3.93935 5.35621 3.61671 5.35947 3.42208 5.56909C3.23229 5.77351 3.23491 6.09861 3.42841 6.29964L5.26291 8.20556L8.20725 5.14659C8.40075 4.94556 8.40337 4.62046 8.21358 4.41604Z" fill="#F5F5F5" />
    </G>
  </Svg>
);

const CadastroImovel = ({ route, navigation }) => {
  const { id = null, status = 1, classificacao = '', tipo = '' } = route.params || {}; // Parâmetros padrão para novos cadastros
  console.log(status)
  const steps = [
    { label: 'Características', status: 1, view: 'PropertyCharacteristics' },
    { label: 'Endereço do imóvel', status: 2, view: 'EnderecoView' },
    { label: 'Dados do proprietário', status: 3, view: 'DadosProprietarioView' },
    { label: 'Foto da CNH', status: 4, view: 'FotoCnhView' },
    { label: 'Selfie do proprietário', status: 5, view: 'SelfieProprietarioView' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>Cadastro do imóvel</Text>
      </View>

      <Text style={styles.classificacaoText} allowFontScaling={false}>{classificacao} - {tipo}</Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.status}
            style={styles.stepWrapper}
            disabled={status !== step.status}  // Desativa os botões que não estão na vez
            onPress={() => {
              if (status === step.status) {
                navigation.navigate(step.view, { etapa: step.label, status: step.status, id, classificacao, tipo });
              }
            }}
          >
            <View style={styles.stepLeft} >
              {index !== steps.length - 1 && <View style={styles.stepLine} />}
              <View style={[styles.stepCircle, { backgroundColor: getStepColor(status, step.status) }]} />
              <Text style={styles.stepText}>{step.label}</Text>
            </View>
            <View>
              {status === step.status ? <StepArrowIcon /> : (status > step.status ? <CheckIcon /> : null)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40, // Maior espaçamento para a barra de status
  },
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
  backButton: {
    position: 'absolute',
    left: 10,
  },
  classificacaoText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#1F2024',
    marginBottom: 20,
    textAlign: 'left',
    paddingLeft: 20,
  },
  stepsContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15, // Maior espaçamento entre os elementos
    paddingHorizontal: 5,
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    left: 12, // Ajuste para centralizar a linha em relação à bolinha, sem tocá-la
    top: 25, // A linha começa logo abaixo da bolinha
    height: 40, // Altura da linha entre as bolinhas
    width: 2,
    backgroundColor: '#D3D3D3',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15, // Ajuste do espaçamento entre bolinha e texto
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: width * 0.04,
    color: '#1F2024',
  },
});

export default CadastroImovel;
