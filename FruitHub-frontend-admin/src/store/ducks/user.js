import { Constants } from '../../helpers/constants';
import { HYDRATE } from "next-redux-wrapper";
import axios from 'axios';

// Action Types

export const Types = {
	USER_LOGGED_IN: 'USER_LOGGED_IN',
	USER_LOGGED_OUT: 'USER_LOGGED_OUT',
	UPDATE_USER: 'UPDATE_USER',
};

// Reducer 

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.user };
		case Types.UPDATE_USER:
			return { ...state, ...action.payload };
		case Types.USER_LOGGED_IN:
			return action.payload;
		case Types.USER_LOGGED_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
}

// Action Creators

export const updateUser = user => {
	return {
		type: Types.UPDATE_USER,
		payload: user
	};
};

export const userLogged = user => {
	return {
		type: Types.USER_LOGGED_IN,
		payload: user
	};
};

export const setLogout = () => {
	return {
		type: Types.USER_LOGGED_OUT
	};
};

// Actions and API calls

export const login = data => {
	return axios.post(`${Constants.baseUrl}/auth`, data);
};

export const register = user => {
	return axios.post(`${Constants.baseUrl}/register`, user);
};

export const get = () => {
	return axios.get(`${Constants.baseUrl}/user`);
};

export const forgotPassword = data => {
	return axios.post(`${Constants.baseUrl}/forgot-password`, data);
};

export const resetPassword = data => {
	return axios.post(`${Constants.baseUrl}/reset-password`, data);
};

export const logout = () => {
	return axios.delete(`${Constants.baseUrl}/logout`);
};

export const listSkills = () => {
	return axios.get(`${Constants.baseUrl}/skills`);
};

export const listPlans = () => {
	return axios.get(`${Constants.baseUrl}/list-plans`);
};

//updates Profiles
export const updatePassword = data => {
	return axios.put(`${Constants.baseUrl}/security`, data);
};

export const updateCustomer = data => {
	return axios.post(`${Constants.baseUrl}/customer`, data);
};

export const updateProfessional = data => {
	return axios.post(`${Constants.baseUrl}/professional`, data);
};

export const updateRestaurant = data => {
	return axios.post(`${Constants.baseUrl}/restaurant`, data);
};
//