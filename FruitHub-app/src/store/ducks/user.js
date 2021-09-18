import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { Constants } from '../../helpers/Constants';
import { doneFetching, isFetching } from './fetching';
import * as Notifications from 'expo-notifications';

// Action Types
export const Types = {
	USER_LOGGED_IN: 'USER_LOGGED_IN',
	USER_LOGGED_OUT: 'USER_LOGGED_OUT',
	USER_EDIT: "USER_EDIT",
};

// Reducer 
const initialState = {
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.USER_LOGGED_IN:
			return action.payload;
		case Types.USER_LOGGED_OUT:
			return {
				...initialState,
			};
		case Types.USER_EDIT:
			return action.payload;
		default:
			return state;
	}
}

// Action Creators
export const userLogged = user => {
	return {
		type: Types.USER_LOGGED_IN,
		payload: user
	};
};

export const edit = user => {
	return {
		type: Types.USER_EDIT,
		payload: user
	};
};

export const setLogout = () => {
	return {
		type: Types.USER_LOGGED_OUT
	};
};

export const login = user => {
	return dispatch => {
		dispatch(isFetching());

		axios.post(`${Constants.baseUrl}/auth`, {
			email: user.email,
			password: user.password
		}).catch(err => {
			if (err.response?.status == 500) {
				AsyncStorage.multiRemove(['password', 'email', 'token']);
				Alert.alert('Ops!', 'Algo deu errado com nossos servidores. Por favor, entre em contato conosco.');
			} else {
				if (err.response?.data?.errors) Alert.alert('Ops!', err.response?.data?.errors[0]);
				else Alert.alert('Ops!', 'Algo deu errado com nossos servidores. Por favor, entre em contato conosco.');
			}

			dispatch(doneFetching());
		}).then(res => {
			if (res?.status == 200) {
				if (res.data.errors) {
					Alert.alert('Ops!', res.data.errors[0]);
					dispatch(doneFetching());
				} else {
					AsyncStorage.setItem('email', res.data.user.email);
					AsyncStorage.setItem('token', res.data.token);

					user.password ? AsyncStorage.setItem('password', user.password) : null;

					var payload = res.data.user;
					payload.isLogged = true;

					axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

					dispatch(userLogged(payload));
					dispatch(doneFetching());
				}
			}
		});
	};
};

export const update = (userForm) => {
	return axios.post(`${Constants.baseUrl}/usuario`, userForm);
};

export const logout = () => dispatch => {
	AsyncStorage.multiRemove(['password', 'email', 'token']);
	dispatch(setLogout());
};

export const registerUser = (email, password, name) => {
	return axios.post(`${Constants.baseUrl}/register`, { email, password, usr_nome: name });
};

export const sendPush = async (push_token) => {
	if (Platform.OS == 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250]
		});
	}

	return axios.post(`${Constants.baseUrl}/push`, { push_token });
};