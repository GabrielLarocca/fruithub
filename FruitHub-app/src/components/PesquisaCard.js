import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';
import moment from 'moment';

export default function PesquisaCard({ pesquisa }) {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigate('Pesquisa', { id: pesquisa?.id })} style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
			<View style={{ backgroundColor: colors.gray5, paddingHorizontal: 12, paddingVertical: 12, alignSelf: 'center', marginRight: 16 }}>
				<Icon name="ri-bar-chart-fill" size={19} color={colors.gray3} />
			</View>

			<View style={{ paddingVertical: 20, borderBottomColor: colors.gray5, borderBottomWidth: 1, flex: 1 }}>
				<Text style={[StyleGuide.medium16, { color: colors.gray1 }]} numberOfLines={3}>{pesquisa?.pes_titulo}</Text>
				<Text style={[StyleGuide.regular14, { color: colors.gray3, marginTop: 4 }]} numberOfLines={3}>Termina {moment(pesquisa?.pes_data_final).endOf('day').fromNow()}</Text>
			</View>
		</TouchableOpacity>
	);
}