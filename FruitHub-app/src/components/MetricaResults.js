import React from 'react';
import { View, Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import MetricaCard from './MetricaCard';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function MetricaResults({ mes }) {
	return (
		<>
			<View style={{ paddingHorizontal: 20, paddingVertical: 16, alignSelf: 'flex-start' }}>
				<Text style={[StyleGuide.tag12, { color: colors.gray4, textTransform: 'uppercase' }]}>{mes.mes}</Text>
			</View>

			<FlatList data={mes.metricas} renderItem={({ item }) => <MetricaCard metrica={item} />} showsVerticalScrollIndicator={false} keyExtractor={item => `Key_${item.id}`}
				style={StyleGuide.container} onEndReachedThreshold={0.5} initialNumToRender={5}
			/>
		</>
	);
}