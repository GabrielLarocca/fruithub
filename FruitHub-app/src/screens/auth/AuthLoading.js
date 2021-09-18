import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Image from 'react-native-scalable-image';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/logo.png';
import FadeInView from '../../components/FadeInView';
import { doneFetching } from '../../store/ducks/fetching';
import { login } from '../../store/ducks/user';

export default function AuthLoadingScreen(props) {
	const dispatch = useDispatch();

	const callLogin = async () => {
		const email = await AsyncStorage.getItem('email');
		const password = await AsyncStorage.getItem('password');

		if (email && password) {
			dispatch(login({ email, password }));
		} else {
			props.navigation.replace('Auth');

			dispatch(doneFetching());
		}
	};

	useEffect(() => {
		setTimeout(() => {
			callLogin();
		}, 2300);
	}, []);

	return (
		<View style={styles.container}>
			<FadeInView pos={6} style={styles.container}>
				<Image width={Dimensions.get('window').width - 100} source={logo} />
			</FadeInView>
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
