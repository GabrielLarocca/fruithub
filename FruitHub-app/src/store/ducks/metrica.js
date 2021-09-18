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

export const getMetricas = (form) => {
	return axios.post(`${Constants.baseUrl}/metrica/list`, form);
};

export const getMetrica = (id) => {
	return axios.get(`${Constants.baseUrl}/metrica/${id}`);
};