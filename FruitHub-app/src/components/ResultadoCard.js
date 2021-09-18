import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, } from "react-native";
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';
import moment from 'moment';

export default function ResultadoCard({ pesquisa }) {
	const [opcoes, setOpcoes] = useState([]);

	useEffect(() => {
		let opcoesAux = [...pesquisa.opcoes];

		opcoesAux.sort(function (a, b) {
			return a.porcentagem > b.porcentagem ? -1 : a.porcentagem > b.porcentagem ? 1 : 0;
		});

		setOpcoes(opcoesAux);
	}, []);

	return (
		<View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40, borderColor: colors.gray5, borderBottomWidth: 1 }}>
			<Text style={[StyleGuide.medium18, { color: colors.gray1, marginBottom: 4 }]}>{pesquisa.pes_titulo}</Text>
			<Text style={[StyleGuide.regular16, { color: colors.gray2, marginBottom: 16 }]}>{pesquisa.pes_descricao}</Text>

			{pesquisa.pes_opcoes === 1 ?
				pesquisa.opcoes?.map(opcao =>
					<View key={`key_${opcao.id}`} style={styles.labelPesquisa}>
						<View style={[{ position: 'absolute', width: `${opcao.porcentagem}%`, height: 56 }, (opcoes.length > 0 && opcoes[0].id === opcao.id) ? { backgroundColor: '#BCECD5' } : { backgroundColor: '#F3FDF8' }]}></View>

						<Text numberOfLines={1} style={[StyleGuide.regularSe16, { color: colors.gray1, flex: 1, paddingLeft: 16 }]}>{opcao.peo_titulo}</Text>

						<Text style={[StyleGuide.semibold16, { color: colors.gray1, marginRight: 16 }]}>{Math.round(opcao.porcentagem)}%</Text>
					</View>
				)
				:
				opcoes?.map((opcao, index) =>
					<View key={`key_${opcao.id}`} style={{ paddingVertical: 20, borderColor: colors.gray5, borderBottomWidth: 1, flexDirection: 'row' }}>
						<Text style={[StyleGuide.regular16, (index === 0 || index === 1 || index === 2) ? { color: colors.primaryDefault } : { color: colors.gray4 }]}>{index + 1}º</Text>

						<Text numberOfLines={1} style={[StyleGuide.regular16, { color: colors.gray1, flex: 1, alignSelf: 'center', marginLeft: 14 }]}>{opcao.peo_titulo}</Text>

						<Text numberOfLines={1} style={[StyleGuide.semibold16, { color: colors.gray1, alignSelf: 'center' }]}>{Math.round(opcao.porcentagem)}%</Text>
					</View>
				)
			}

			<Text style={[StyleGuide.regular14, { color: colors.gray3, marginTop: 16, marginBottom: 6 }]}>Início {moment(pesquisa?.pes_data_inicial, 'YYYY-MM-DD HH:mm:ss').format('LLL')}</Text>
			<Text style={[StyleGuide.regular14, { color: colors.gray3 }]}>Término {moment(pesquisa?.pes_data_final, 'YYYY-MM-DD HH:mm:ss').format('LLL')}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	labelPesquisa: {
		borderColor: colors.gray4,
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 8,
		paddingVertical: 18,
		flexDirection: 'row',
	},
});
