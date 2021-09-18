import React, { useRef, useState } from 'react';
import { Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import logo from '../../../assets/logo.png';
import { regexEmail } from '../../helpers/Utils';
import { login } from '../../store/ducks/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StyleGuide, { buttonContainer, colors, Default, inputTheme } from '../../../assets/styles/StyleGuide';
import * as WebBrowser from 'expo-web-browser';
import { Constants } from '../../helpers/Constants';

export default function Login(props) {
	const refSenha = useRef(null);
	const dispatch = useDispatch();

	const { fetching: { isFetching } } = useSelector(({ fetching }) => ({ fetching }));

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verSenha, setVerSenha] = useState(false);

	const doLogin = async () => {
		if (email.trim() == '' || password.trim() == '') {
			Alert.alert('Ops!', 'Email ou senha incorreto. Por favor, tente novamente.');
			return;
		} else if (!regexEmail.test(email)) {
			Alert.alert('Ops!', 'O Email que foi informado é inválido.');
			return;
		}

		dispatch(login({ email, password }));
	};

	const openUrl = async () => {
		const url = `${Constants.url}/password/email`;
		await WebBrowser.openBrowserAsync(url);
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} style={[Default.container, { paddingHorizontal: 20, paddingTop: 28 }]}>
			<Image width={100} height={35} source={logo} style={{ alignSelf: 'center' }} />

			<Text style={[StyleGuide.semibold24, { marginTop: 56, marginBottom: 8 }]}>Entrar no Seleto</Text>

			<Text style={[StyleGuide.regular16, { color: colors.gray2, maxWidth: 240, marginBottom: 80 }]}>O seleto é um app exclusivo para clientes da KMM.</Text>

			<TextInput mode="flat" underlineColor="#F1F1F1" theme={inputTheme} style={StyleGuide.input} returnKeyType="next"
				onSubmitEditing={() => refSenha.current.focus()} blurOnSubmit={false} label="Email" onChangeText={setEmail} value={email}
				keyboardType='email-address' autoCapitalize='none' autoCorrect={false} />

			<TextInput mode="flat" underlineColor="#F1F1F1" theme={inputTheme} style={[StyleGuide.input, { marginTop: 30, marginBottom: 40 }]}
				ref={refSenha} blurOnSubmit={false} secureTextEntry={verSenha ? false : true} right={<TextInput.Icon style={{ zIndex: 10 }}
					onPress={() => setVerSenha(!verSenha)} color={colors.gray3} name={verSenha ? 'eye' : 'eye-off'} />}
				returnKeyType="done" label="Senha" autoCapitalize='none' autoCorrect={false} onChangeText={setPassword} value={password}
				onSubmitEditing={doLogin} />

			<Button onPress={doLogin} loading={isFetching} disabled={isFetching} disabledStyle={{ backgroundColor: '#26D37F' }}
				containerStyle={buttonContainer.containerButton} buttonStyle={buttonContainer.button} titleStyle={StyleGuide.body14Bold}
				title="Entrar" mode="contained" />

			<Text style={StyleGuide.regular16, { color: colors.gray2, alignSelf: 'center', marginTop: 16 }} onPress={openUrl}>Esqueceu a senha?</Text>
		</KeyboardAwareScrollView>
	);
}