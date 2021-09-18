import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../assets/styles/StyleGuide';

export default function Loading(props) {
	return (
		props.loading ?
			<View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF' }}>
				<ActivityIndicator color={colors.primaryDefault} size='large' />
			</View>
			:
			props?.children
	);
}