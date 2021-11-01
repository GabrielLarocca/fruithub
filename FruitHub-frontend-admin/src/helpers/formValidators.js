/* eslint-disable no-useless-escape */
export const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regexURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const createFormikValidation = (formMap, values) => {
	const errors = {};

	for (let [key, value] of formMap) {
		if (!values[key]) {
			errors[key] = value + " is required.";
		} else if (key === 'password' && values[key].length < 8) {
			errors[key] = "Use at least 8 characters.";
		} else if (key === 'confirm' && values[key] !== values['password']) {
			errors[key] = "The passwords are different.";
		} else if (key === 'email' && !regexEmail.test(values[key])) {
			errors[key] = "The e-mail entered is invalid.";
		} else if (key === 'usr_zip_code' && values[key].length < 5) {
			errors[key] = "Use 5 numbers.";
		}
	}

	return errors;
};

export const validateLogin = values => {
	let map = new Map();

	map.set('email', 'E-mail');
	map.set('password', 'Password');

	let errors = createFormikValidation(map, values);

	return errors;
};

export const validateRegister = (values, stepRender, loginSocial) => {
	let map = new Map();

	map.set('usr_first_name', 'First name');
	map.set('usr_last_name', 'Last name');
	map.set('usr_phone', 'Phone');
	map.set('usr_zip_code', 'Zip code');
	map.set('usr_city', 'City');
	map.set('usr_state', 'State');

	if (!loginSocial) {
		map.set('email', 'E-mail');
		map.set('password', 'Password');
		map.set('confirm', 'Confirm');
	}

	if (stepRender === 'restaurant') {
		map.set('urp_name', 'Restaurant name');
	}

	let errors = createFormikValidation(map, values);

	if (stepRender === 'professional' && values.jobs.length == 0) {
		errors.jobs = 'Choose at least one skill.';
	}

	return errors;
};

export const validateCreditCard = values => {
	let map = new Map();

	map.set('holderName', 'Name');
	map.set('cardNumber', 'Card number');
	map.set('expiration', 'Expiration');
	map.set('securityCode', 'CVV');

	let errors = createFormikValidation(map, values);

	return errors;
};

export const validateEditProfileCustomer = values => {
	let map = new Map();

	map.set('usr_first_name', 'First name');
	map.set('usr_last_name', 'Last name');
	map.set('email', 'E-mail');
	map.set('usr_phone', 'Phone');
	map.set('usr_city', 'City');
	map.set('usr_state', 'State');
	map.set('usr_zip_code', 'Zip code');

	let errors = createFormikValidation(map, values);

	// errors = validateUpdatePassword(errors, values);

	return errors;
};