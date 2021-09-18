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

export const getNoticias = (form) => {
	return axios.post(`${Constants.baseUrl}/noticia/list`, form);
};

export const getNoticia = (id) => {
	return axios.get(`${Constants.baseUrl}/noticia/${id}`);
};