/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import Header from '../../components/Header';
import StyleGuide, { Default, colors } from '../../../assets/styles/StyleGuide';

export default function Perguntas(props) {
	return (
		<>
			<Header arrowBack title="Perguntas frequentes" />

			<ScrollView showsVerticalScrollIndicator={false} style={Default.container}>
				<Text style={styles.titulo}>O que posso fazer no aplicativo?</Text>
				<Text style={styles.texto}>No aplicativo você pode ver suas métricas, indicadores, participar de pesquisas, conferir resultados e ficar por dentro das notícias principais do que está acontecendo por aqui.</Text>
				<Divider />

				<Text style={styles.titulo}>Existe algum custo para fazer a minha conta no aplicativo?</Text>
				<Text style={styles.texto}>Não, não existe nenhuma taxa para fazer a conta no aplicativo, seu registro é totalmente gratuito.</Text>
				<Divider />

				<Text style={styles.titulo}>Como faço para gerenciar minha conta?</Text>
				<Text style={styles.texto}>Vá até a tela "Editar perfil" onde você pode trocar suas informações principais.</Text>
				<Divider />

				<Text style={styles.titulo}>Eu preciso ter uma conta em rede social para baixar o aplicativo?</Text>
				<Text style={styles.texto}>Não, apenas o acesso a loja de aplicativos do seu celular para efetuar o download.</Text>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	titulo: {
		...StyleGuide.medium16,
		marginTop: 20,
		paddingHorizontal: 20,
		color: colors.gray1,
	},
	texto: {
		...StyleGuide.regular14,
		textAlign: 'justify',
		marginBottom: 20,
		marginTop: 10,
		color: colors.gray2,
		paddingHorizontal: 20
	},
});
