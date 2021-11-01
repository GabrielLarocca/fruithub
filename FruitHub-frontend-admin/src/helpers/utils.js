/* eslint-disable react/react-in-jsx-scope */
import axios from "axios";
import { Constants } from "./constants";
import Swal from 'sweetalert2';
import SuccessModal from "../components/SuccessModal";
import withReactContent from 'sweetalert2-react-content';

/* eslint-disable no-useless-escape */
export const formatTelefoneInput = input => {
	let value = input.target.value;

	value = value.replace(/[^\d]/g, "");
	value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

	input.target.value = value;

	return input;
};

export const formatCepInput = (input, homeProfessional) => {
	let value = input.target.value;

	value = value.replace(/[^\d]/g, "");

	input.target.value = value;

	return input;
};

export function dynamicSort(property) {
	var sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}

	return (a, b) => {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	};
}

export function planPriceBreak(price, type) {
	let priceCuted = price.split('.');

	return type == 'cent' ? priceCuted[1] : priceCuted[0];
}

export const abbreviateDay = array => {
	let days = [];

	array.forEach(element => days.push(element.rdw_day));

	if (days?.length == 7) return 'Everyday';
	else {
		let string = '';

		days.forEach(element => string = string + element?.slice(0, 3) + ", ");

		return string.slice(0, string?.length - 2);
	}
};

export const swalCustomDelete = (text, action) => {
	Swal.fire({
		title: text, text: 'This action cannot be undone.', icon: '', width: 424, showCancelButton: true,
		cancelButtonColor: '#fff', confirmButtonText: 'DELETE', cancelButtonText: 'CANCEL', backdrop: `rgb(255 255 255 / 45%)`,
		customClass: { cancelButton: 'btn buttonCancelSwal', confirmButton: 'btn buttonDennySwal', title: 'titleSwal', content: 'contentSwal' }, buttonsStyling: false
	}).then((result) => {
		if (result.isConfirmed) action();
	});
};

const swalOk = withReactContent(Swal);

export const swalCustomOk = text => {
	swalOk.fire({
		width: 702, timer: 1500, showCancelButton: false, showConfirmButton: false, customClass: { content: 'p-0', popup: 'p-0', container: 'indexTop' }, backdrop: `rgb(255 255 255 / 45%)`, html: <SuccessModal text={text} />
	});
};

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];