import React, { useRef } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as mime from 'react-native-mime-types';
import { colors, Default } from '../../assets/styles/StyleGuide';

export default function SelfiePicker(props) {
	const refPhotoOptions = useRef(null);

	const setAnexos = (foto) => {
		let auxFoto = { ...foto };
		auxFoto.url = foto.uri;

		props.setPhoto(auxFoto);
	};

	const handleActionSheet = async index => {
		if (index == 0) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);

			if (status !== 'granted') {
				Alert.alert('Ops!', 'Você precisa permitir o acasso a câmera.');
				return;
			}

			pickCamera();
		} else if (index == 1) {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert('Ops!', 'Você precisa permitir o acesso a câmera primeiro.');
				return;
			}

			pickGaleria();
		}
	};

	const pickGaleria = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, base64: true, quality: 0.5 });

			if (!result.cancelled) setAnexos({ name: result.uri.split('\\').pop().split('/').pop(), type: mime.lookup(result.uri), uri: Platform.OS == 'ios' ? result.uri.replace('file://', '') : result.uri });
		} catch (err) {
			Alert.alert('Ops!', 'Ocorreu um erro ao tentar abrir a galeria.');
		}
	};

	const pickCamera = async () => {
		try {
			let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, base64: true, quality: 0.5 });

			if (!result.cancelled) setAnexos({ name: result.uri.split('\\').pop().split('/').pop(), type: mime.lookup(result.uri), uri: Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri, });
		} catch (err) {
			Alert.alert('Ops!', 'Ocorreu um erro ao tentar abrir a câmera.');
		}
	};

	return (
		<TouchableOpacity onPress={() => refPhotoOptions.current.show()}>
			<ActionSheet ref={refPhotoOptions} options={['Câmera', 'Galeria', 'Cancelar']} cancelButtonIndex={2} destructiveButtonIndex={2} buttonUnderlayColor={colors.gray5}
				onPress={index => handleActionSheet(index)} styles={{ buttonBox: Default.actionSheetButtonBox, body: Default.actionSheetBody, cancelButtonBox: Default.actionSheetCancelButtonBox }} />

			{props?.children}
		</TouchableOpacity>

	);
}
