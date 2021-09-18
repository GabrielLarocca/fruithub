import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function PDFView() {
	const { params: { uri, title } } = useRoute();
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, backgroundColor: '#FFF' }}>
			<View style={{ flexDirection: 'row', paddingTop: 24, paddingBottom: 16 }}>
				<TouchableOpacity style={{ marginLeft: 22, marginRight: 18, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.goBack()}>
					<Icon name='ri-arrow-left-s-line' size={24} color={colors.gray1} />
				</TouchableOpacity>

				<Text numberOfLines={1} style={[StyleGuide.medium18, { color: colors.gray1, alignSelf: 'center' }]}>{title}</Text>
			</View>

			<PDFReader source={{ uri }} noLoader={true} withPinchZoom={true} />
		</View>
	);
}