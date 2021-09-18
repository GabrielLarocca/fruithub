import axios from 'axios';
import { Constants } from '../../helpers/Constants';

// Action Types
export const Types = {
};

// Reducer 
const initialState = {};

export default function reducer(state = initialState, action) {
	return state;
}

// Action Creators

export const getPesquisas = (filter) => {
	return axios.post(`${Constants.baseUrl}/pesquisa/list`, filter);
};

export const getPesquisa = id => {
	return axios.get(`${Constants.baseUrl}/pesquisa/${id}`);
};

export const storeVoto = (id, form) => {
	return axios.post(`${Constants.baseUrl}/pesquisa/${id}`, form);
};