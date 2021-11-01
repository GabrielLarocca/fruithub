import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { storeWrapper } from "./store/storeConfig";
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AxiosSetup from './helpers/axios';
import NProgress from 'nprogress';
import Routes from "./routes";
import "./App.css";

// Routes.events.on('routeChangeStart', url => {
// 	NProgress.start();
// });
// Routes.events.on('routeChangeComplete', () => {
// 	NProgress.done();
// });
// Routes.events.on('routeChangeError', () => {
// 	NProgress.done();
// });

function App() {
	const store = useStore((state) => state);

	return (
		<PersistGate persistor={store.__persistor} loading={""}>
			<AxiosSetup store={store}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</AxiosSetup>
		</PersistGate>
	);
}

export default storeWrapper.withRedux(App);