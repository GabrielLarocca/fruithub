import React from 'react';
import { SafeAreaView } from 'react-native';
import Navigator from './src/helpers/Navigator';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Default } from './assets/styles/StyleGuide';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';

moment.updateLocale('pt-br', ptBr);

export default function App() {
	let [fontUse] = useFonts({
		Inter4: Inter_400Regular,
		Inter5: Inter_500Medium,
		Inter6: Inter_600SemiBold
	});

	if (!fontUse) return null;

	return (
		<SafeAreaView style={Default.safeArea}>
			<Navigator />
		</SafeAreaView>
	);
}