import React, { useState, useEffect, useRef } from 'react';
import { View, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelfiePicker from '../../components/SelfiePicker';
import Icon from 'react-native-remix-icon';
import { update, edit } from '../../store/ducks/user';
import StyleGuide, { buttonContainer, colors, Default, inputTheme } from '../../../assets/styles/StyleGuide';

export default function EditarPerfil(props) {
	const dispatch = useDispatch();
	const navigate = useNavigation();
	const refSenha = useRef(null);
	const user = useSelector(({ user }) => user);

	const [nome, setNome] = useState('');
	const [password, setPassword] = useState('');
	const [userPhoto, setUserPhoto] = useState(null);
	const [loading, setLoading] = useState(null);

	const editarUsuario = () => {
		if (nome.trim() == '') {
			Alert.alert('Ops!', 'O campo nome é obrigatório.');
			return;
		}

		setLoading(true);

		let userForm = new FormData();

		userForm.append('usu_nome', nome);
		userForm.append('email', user.email);

		user.usu_id_foto ? userForm.append('usu_id_foto', user.usu_id_foto) : null;
		password ? userForm.append('password', password) : null;
		userPhoto != user.foto ? userForm.append('foto', userPhoto) : null;

		update(userForm).then(async (res) => {
			if (res?.status == 200) {
				if (res?.data?.errors) {
					Alert.alert('Ops!', res?.data?.errors[0]);
				} else {
					Alert.alert('Sucesso!', 'Seu perfil foi atualizado com sucesso.');

					res.data.isLogged = true;

					dispatch(edit(res.data));

					navigate.goBack();
				}
			}
		}).catch(async () => {
			Alert.alert('Ops!', 'Ocorreu um erro ao atualizar seu perfil. Entre em contato com o suporte.');
		}).finally(() =>
			setLoading(false));
	};

	useEffect(() => {
		setUserPhoto(user?.foto);
		setNome(user?.usu_nome);
	}, [user]);

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} style={[Default.container, { paddingHorizontal: 20 }]}>
			<View style={{ alignSelf: 'center', marginVertical: 56 }}>
				<SelfiePicker photo={userPhoto} setPhoto={setUserPhoto}>
					{user?.foto ?
						<ImageBackground width={101} height={101} imageStyle={{ borderRadius: 100 }} style={{ width: 101, height: 101 }} source={userPhoto && { uri: userPhoto?.url }}>
							<View style={{ borderRadius: 100, height: 101, width: 101, backgroundColor: 'rgba(0, 0, 0 , 0.6)', justifyContent: 'center' }}>
								<Icon name={'camera-fill'} style={{ alignSelf: 'center' }} size={35} color={colors.white} />
							</View>
						</ImageBackground>
						:
						<ImageBackground width={101} height={101} imageStyle={{ borderRadius: 100 }} style={{ width: 101, height: 101 }} source={userPhoto && { uri: userPhoto?.url }}>
							<View style={{ borderRadius: 100, height: 101, width: 101, backgroundColor: 'rgba(0, 0, 0 , 0.6)', justifyContent: 'center' }}>
								<Icon name={'camera-fill'} style={{ alignSelf: 'center' }} size={35} color={colors.white} />
							</View>
						</ImageBackground>

					}
				</SelfiePicker>
			</View>

			<TextInput mode="flat" underlineColor="#F1F1F1" theme={inputTheme} style={StyleGuide.input} returnKeyType="next" onSubmitEditing={() => refSenha.current.focus()} blurOnSubmit={false} label="Nome" onChangeText={setNome} value={nome} autoCorrect={false} />

			<TextInput mode="flat" underlineColor="#F1F1F1" theme={inputTheme} style={[StyleGuide.input, { marginTop: 30 }]} ref={refSenha} blurOnSubmit={false} secureTextEntry returnKeyType="done" label="Senha" onChangeText={setPassword} value={password} onSubmitEditing={editarUsuario} />

			<View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40 }}>
				<Button onPress={editarUsuario} containerStyle={buttonContainer.containerButton} disabled={loading} loading={loading} buttonStyle={buttonContainer.button} titleStyle={[StyleGuide.medium16, { color: colors.white }]} title="Salvar alterações" mode="contained" />
			</View>
		</KeyboardAwareScrollView>
	);
}