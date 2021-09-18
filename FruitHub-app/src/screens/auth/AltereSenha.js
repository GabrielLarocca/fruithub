import React, { useRef, useState } from 'react';
import { Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import logo from '../../../assets/logo.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmptyContent from '../../components/EmptyContent';
import StyleGuide, { buttonContainer, colors, Default, inputTheme } from '../../../assets/styles/StyleGuide';
import { logout, update } from '../../store/ducks/user';

export default function AlterarSenha(props) {
	const refSenha = useRef(null);
	const dispatch = useDispatch();
	const { fetching: { isFetching }, user } = useSelector(({ fetching, user }) => ({ fetching, user }));

	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [verSenha, setVerSenha] = useState(false);
	const [changedPassword, setChangedPassword] = useState(false);

	const doChangeSenha = () => {
		if (password.trim() == '' || confirm.trim() == '') {
			Alert.alert('Ops!', 'Os campos senha e confirmar senha são obrigatórios.');
			return;
		} else if (password !== confirm) {
			Alert.alert('Ops!', 'As senhas são diferentes.');
			return;
		} else {

			let userForm = {
				email: user.email,
				usu_nome: user.usu_nome,
				password
			};

			user.usu_id_foto ? userForm.usu_id_foto = user.usu_id_foto : null;

			update(userForm).then(async (res) => {
				if (res?.status == 200) {
					if (res?.data?.errors) {
						Alert.alert('Ops!', res?.data?.errors[0]);
					} else {
						setChangedPassword(true);

						setTimeout(() => {
							dispatch(logout());
						}, 2100);
					}
				}
			}).catch(async () => {
				Alert.alert('Ops!', 'Ocorreu um erro ao alterar sua senha. Entre em contato com o suporte.');
			});
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} style={[Default.container, { paddingHorizontal: 20, paddingTop: 28 }]}>
			<Image width={100} height={35} source={logo} style={{ alignSelf: 'center' }} />

			{!changedPassword ?
				<>
					<Text style={[StyleGuide.semibold24, { marginTop: 56, marginBottom: 8 }]}>Altere sua senha</Text>

					<Text style={[StyleGuide.regular16, { color: colors.gray2, maxWidth: 270, marginBottom: 80 }]}>Sua senha atual é provisória. Crie uma nova senha para entrar.</Text>

					<TextInput mode="flat" underlineColor="#F1F1F1" theme={inputTheme} style={StyleGuide.input} blurOnSubmit={false} secureTextEntry={verSenha ? false : true} onChangeText={setPassword} value={password}
						right={<TextInput.Icon style={{ zIndex: 10 }} onPress={() => setVerSenha(!verSenha)} color={colors.gray3} name={verSenha ? 'eye' : 'eye-off'} />} returnKeyType="next" label="Nova senha" />

					<TextInput mode="flat" underlineColor="#F1F1F1" theme={inputTheme} style={[StyleGuide.input, { marginTop: 30, marginBottom: 40 }]}
						ref={refSenha} blurOnSubmit={false} secureTextEntry returnKeyType="done" label="Confirmar senha" onChangeText={setConfirm} value={confirm} onSubmitEditing={doChangeSenha} />

					<Button onPress={doChangeSenha} loading={isFetching} disabled={isFetching} disabledStyle={{ backgroundColor: '#26D37F' }} containerStyle={buttonContainer.containerButton}
						buttonStyle={buttonContainer.button} titleStyle={StyleGuide.body14Bold} title="Alterar senha" mode="contained" />
				</>
				:
				<EmptyContent typeEmpty="senha" text="Senha alterada!" secondText="A partir de agora, utilize sua nova senha para fazer login." />
			}
		</KeyboardAwareScrollView>
	);
}