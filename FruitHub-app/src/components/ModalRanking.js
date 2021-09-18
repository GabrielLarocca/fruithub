import React, { useState } from 'react';
import { View, Text, Modal, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-remix-icon';
import StyleGuide, { buttonContainer, colors } from '../../assets/styles/StyleGuide';

export default function ModalRanking({ ranking, visible, setVisible, optionModal, setRanking, checked, setChecked }) {
	const [loading, setLoading] = useState(false);

	const enviarVoto = () => {
		changePositionState(optionModal.index, checked);
		setVisible(false);
	};

	const changePositionState = (index, option) => {
		if (option) {
			let rankingAux = ranking;

			rankingAux.push({
				id: option.id,
				nome: option.peo_titulo,
				posicao: index + 1
			});

			setRanking(rankingAux);
		}
	};

	return (
		<Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => setVisible(!visible)} propagateSwipe={true}>
			<ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', paddingVertical: 20 }}>
				<View style={styles.modalView}>
					<Text style={[StyleGuide.medium18, { color: colors.gray1, marginBottom: 4 }]}>Escolha o {optionModal.index + 1}º lugar</Text>

					<Text style={[StyleGuide.regular14, { color: colors.gray2, marginBottom: 25 }]}>Selecione a opção que, na sua opinião, deveria ficar em {optionModal.index + 1}º lugar.</Text>

					{optionModal.opcoes?.map(option => {
						if (ranking.length > 0 && ranking.find((rank) => rank.id === option.id)) return;

						return (
							<TouchableOpacity key={`key_${option.id}`} style={[checked.id === option.id && { backgroundColor: colors.primarySubtle }, styles.labelPesquisa, (Object.values(ranking).indexOf(option) != -1) && { display: 'none' }]} onPress={() => setChecked(option)}>
								<Text style={[StyleGuide.regularSe16, { color: colors.gray1, flex: 1 }]}>{option.peo_titulo}</Text>

								{checked.id === option.id && <Icon name="ri-checkbox-circle-fill" size={18} color={colors.primaryDefault} style={{ alignSelf: "center", marginRight: 17 }} />}
							</TouchableOpacity>
						);
					})
					}

					<Button onPress={enviarVoto} loading={loading} disabled={loading} disabledStyle={{ backgroundColor: colors.gray4 }} containerStyle={[buttonContainer.containerButton, { marginTop: 8 }]} buttonStyle={buttonContainer.button} titleStyle={StyleGuide.body14Bold} title="Salvar voto" mode="contained" />
				</View>
			</ScrollView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalView: {
		backgroundColor: "#FFF",
		borderRadius: 8,
		width: Dimensions.get('window').width - 40,
		paddingHorizontal: 24,
		paddingTop: 40,
		paddingBottom: 24
	},
	labelPesquisa: {
		borderColor: colors.gray4,
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 8,
		paddingVertical: 18,
		paddingLeft: 16,
		flexDirection: 'row'
	},
});
