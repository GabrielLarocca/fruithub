import { Constants } from '../../../helpers/constants';
import axios from 'axios';

export const listDeals = () => {
	return axios.get(`${Constants.baseUrl}/restaurant/deal`);
};

export const postDeals = deal => {
	return axios.post(`${Constants.baseUrl}/restaurant/deal`, deal);
};

export const updateDeal = (id, deal) => {
	return axios.put(`${Constants.baseUrl}/restaurant/deal/${id}`, deal);
};

export const getDeals = id => {
	return axios.get(`${Constants.baseUrl}/restaurant/deal/${id}`);
};

export const deleteDeal = id => {
	return axios.delete(`${Constants.baseUrl}/restaurant/deal/${id}`);
};