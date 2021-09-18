import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, Image } from "react-native";
import noNoticiaBanner from '../../assets/empty/noNoticiaBanner.png';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';
import moment from 'moment';

export default function BannerNoticia({ noticia }) {
	const { navigate } = useNavigation();

	return (
		noticia !== null ?
			<TouchableOpacity onPress={() => navigate('Noticia', { id: noticia?.id })} style={{ borderBottomColor: '#F9F9F9', borderBottomWidth: 1 }}>
				<Image source={noticia?.foto ? { uri: noticia.foto.url } : noNoticiaBanner} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />

				<Text style={[StyleGuide.medium18, { marginHorizontal: 20, marginTop: 16, color: colors.gray1 }]}>{noticia?.not_titulo}</Text>

				<Text style={[StyleGuide.medium14, { marginHorizontal: 20, marginTop: 8, marginBottom: 24, color: colors.gray4 }]}>{moment(noticia?.not_data_disponivel).fromNow()}</Text>
			</TouchableOpacity>
			:
			<></>
	);
}
