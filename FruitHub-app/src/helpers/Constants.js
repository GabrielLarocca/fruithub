import { PUBLIC_APP_URL } from '@env';

let url = '';

if (__DEV__) {
	url = PUBLIC_APP_URL;
} else {
	url = ''
}

export const Constants = {
	url,
	baseUrl: url + '/api/web'
};
