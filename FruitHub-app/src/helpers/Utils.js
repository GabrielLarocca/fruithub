export const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

export const formatBRL = value => {
	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2
	});

	value = formatter.format(value);

	return value;
};

export const formatTelefone = phone => {
	phone = phone.replace(/\D/g, '');
	phone = phone.replace(/(\d{0})(\d)/, '$1($2');
	phone = phone.replace(/(\d{2})(\d)/, '$1) $2');
	phone = phone.replace(/(\d{1})(\d{1,4})$/, '$1-$2');

	return phone;
};

export const mascaraData = data => {
	data = data.replace(/\D/g, "");
	data = data.replace(/(\d{2})(\d)/, "$1/$2");
	data = data.replace(/(\d{2})(\d)/, "$1/$2");

	return data;
};

export const textFormat = (text, letras) => {
	return (text?.length > letras) ? (text?.substring(0, letras - 3) + '...') : text;
};

export const onlyNumber = text => {
	text = text.replace(/\D/g, '');

	return text;
};

export const objIsEmpty = obj => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const mask = (value, pattern) => {
	let i = 0;
	const v = value.toString();

	// const masked = mask('40028922', '(##) #####-####');

	return pattern.replace(/#/g, () => v[i++] || '');
}