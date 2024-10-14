// Arquivo 1 chama a API  
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Svg, { Path, G, Rect, Mask } from 'react-native-svg';
import FeedModal from './modal/imovelFeedModal';  // Componente já existente
import ImageCarousel from './modal/ImageCarouselModal';
const { width, height } = Dimensions.get('window');

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

const images = [
    'https://www.plantapronta.com.br/projetos/140/01.jpg',
    'https://www.plantapronta.com.br/projetos/140/02.jpg',
    'https://www.plantapronta.com.br/projetos/140/03.jpg',
    // Mais URLs de imagens
];

const ImovelScreen = ({ route, navigation }) => {
    const { id, status, usuario_id } = route.params || {};  // Pegando o ID do imóvel passado pela rota
    const [loading, setLoading] = useState(true);  // Controla o estado de loading
    const [imovelData, setImovelData] = useState(null);  // Armazena os dados do imóvel

    // useEffect para buscar os dados quando o componente montar
    useEffect(() => {
        fetchImovelData();
    }, []);

 

    // Função para formatar a localização


    // Mostrar um loading enquanto a API está retornando os dados
    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <BackArrowIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} allowFontScaling={false}>Carregando...</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FB7D10" />
                </View>
            </SafeAreaView>
        );
    }

    // Verifica se os dados do imóvel foram carregados
    if (!imovelData) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <BackArrowIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} allowFontScaling={false}>Imóvel não encontrado</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Formatar os dados recebidos
    const precoFormatado = formatCurrency(imovelData.valor_venda);
    const localizacaoFormatada = formatLocation(
        imovelData.endereco || '',
        imovelData.bairro || '',
        imovelData.cidade || '',
        imovelData.uf || ''
    );
    const areaPrivativa = imovelData.area_privativa ? imovelData.area_privativa.toString() : '0';
    const areaTotal = imovelData.area_total ? imovelData.area_total.toString() : '0';
    const condominio = formatCurrency(imovelData.condominio);
    const orientacao = imovelData.orientacao_sol || 'Nascente';
    const descricao = imovelData.descricao_complementar || '';

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <BackArrowIcon />
                    </TouchableOpacity>
                    <ImageCarousel images={images} />
                    <FeedModal
                        orientacao={orientacao}
                        descricao={descricao}
                        preco={precoFormatado}
                        localizacao={localizacaoFormatada}
                        areaPrivativa={areaPrivativa}
                        areaTotal={areaTotal}
                        condominio={condominio}
                        detalhesImovel={imovelData.detalhes_do_imovel || []}
                        detalhesCondominio={imovelData.detalhes_do_condominio || []}
                        situacao={imovelData.situacao_imovel || 'Não informado'}
                        formasPagamento={imovelData.formas_pagamento || []}
                        status={status}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
    },
    scrollContainer: {
        flexGrow: 1,
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
        left: 20,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        zIndex: 1,
    },
});