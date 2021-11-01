import React from "react";
import { Formik } from 'formik';
import { validateLogin } from "../../helpers/formValidators";

export default function Login() {

	const auth = async (data) => {

	};

	const getInitialValues = () => {
		return {

		}
	}

	return (
		<div className="login">
			<img src='../../assets/img/logobezzusBig.png' width="200" alt="logo" />
			<h5 className="mt-4 mb-4">Área Adminstrativa</h5>

			<Formik key="login" initialValues={getInitialValues()} validate={values => validateLogin(values)} onSubmit={(values) => auth(values)}>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
					<form noValidate={true} autoComplete="off" onSubmit={handleSubmit}>
						<div className="form-group">
							<input placeholder="email" />
						</div>

						<div className="form-group">
							<input placeholder="senha" />
						</div>

						<button type="submit" className="btn btn-primary">
							Entrar
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
}
