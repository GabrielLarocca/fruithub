import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert } from "react-native";
import Icon from 'react-native-remix-icon';
import { onlyNumber } from '../helpers/Utils';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function DiretoresCard({ diretor }) {
	const openWhats = () => {
		Linking.openURL(`whatsapp://send?text=${encodeURIComponent('Olá, podemos conversar?')}&phone=55${parseInt(onlyNumber(diretor.telefone))}`)
			.catch(() => Alert.alert('Ops!', 'Não foi possível abrir o WhatsApp em seu dispositivo, verifique se ele está instalado e tente novamente.'));
	};

	const openLinkedin = () => {
		Linking.openURL(`https://www.linkedin.com/in/${diretor?.linkedin}/`)
			.catch(() => Alert.alert('Ops!', 'Não foi possível abrir o Linkedin em seu dispositivo, verifique se ele está instalado e tente novamente.'));
	};

	return (
		<View style={{ paddingHorizontal: 20, paddingVertical: 24, borderBottomColor: '#F9F9F9', borderBottomWidth: 1, flexDirection: 'row' }}>
			<Image style={{ height: 75, width: 75, marginVertical: 16, marginRight: 24, borderRadius: 100 }} width={72} source={diretor?.foto} />

			<View style={{ flexShrink: 1, alignSelf: 'center' }}>
				<Text style={[StyleGuide.medium18, { color: colors.gray1, marginBottom: 4 }]}>{diretor?.nome}</Text>

				<TouchableOpacity onPress={openLinkedin} style={{ flexDirection: 'row' }}>
					<Icon name="ri-linkedin-fill" size={16} color={'#0E76A8'} />

					<Text style={[StyleGuide.regular14, { color: colors.gray1, marginBottom: 4, marginLeft: 5 }]}>{diretor?.cargo}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={openWhats} style={{ flexDirection: 'row' }}>
					<Icon name="ri-whatsapp-fill" size={16} color={colors.primaryDark} />

					<Text style={[StyleGuide.regular14, { color: colors.gray1, marginBottom: 4, marginLeft: 5 }]}>{diretor?.telefone}</Text>
				</TouchableOpacity>
			</View>
		</View >
	);
}
