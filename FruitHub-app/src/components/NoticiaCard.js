import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import Image from 'react-native-scalable-image';
import { useNavigation } from '@react-navigation/native';
import noNoticiaCard from '../../assets/empty/noNoticiaCard.png';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';
import moment from 'moment';

export default function NoticiaCard({ noticia }) {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 24, borderBottomColor: '#F9F9F9', borderBottomWidth: 1, flexDirection: 'row' }} onPress={() => navigate('Noticia', { id: noticia?.id })}>
			<Image style={{ marginRight: 17 }} width={100} source={noticia?.foto ? { uri: noticia.foto.url } : noNoticiaCard} />

			<View style={{ flexShrink: 1, justifyContent: 'center' }}>
				<Text style={[StyleGuide.medium18, { color: colors.gray1, marginBottom: 8 }]} numberOfLines={3}>{noticia?.not_titulo}</Text>

				<Text style={[StyleGuide.medium14, { color: colors.gray4 }]}>{moment(noticia?.not_data_disponivel).fromNow()}</Text>
			</View>
		</TouchableOpacity>
	);
}