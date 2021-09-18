import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { activateKeepAwake } from 'expo-keep-awake';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './src/store/storeConfig';

if (__DEV__) {
	activateKeepAwake();
}

const Redux = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

registerRootComponent(Redux);
