import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function MetricaCard({ metrica }) {
	const { navigate } = useNavigation();

	const openPdf = async () => {
		navigate('PDFView', { uri: metrica.anexo?.url, title: metrica.met_titulo });
	};

	return (
		<TouchableOpacity onPress={() => openPdf()} style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
			<View style={{ backgroundColor: colors.gray5, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 12, alignSelf: 'center', marginRight: 16 }}>
				<Text style={[StyleGuide.tag12, { color: colors.gray3, fontWeight: '600' }]}>PDF</Text>
			</View>

			<Text style={[StyleGuide.regular16, { color: colors.gray1, paddingVertical: 24, borderBottomColor: '#F9F9F9', borderBottomWidth: 1, flex: 1 }]} numberOfLines={3}>{metrica?.met_titulo}</Text>
		</TouchableOpacity>
	);
}