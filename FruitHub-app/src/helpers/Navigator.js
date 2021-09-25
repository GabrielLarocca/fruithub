import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-remix-icon';
import { colors, navigatorTheme, Default } from '../../assets/styles/StyleGuide';
import 'react-native-gesture-handler';
import Auth from '../screens/auth/Auth';
import Login from '../screens/auth/Login';
import Home from '../screens/home/Home';
import AuthLoadingScreen from '../screens/auth/AuthLoading';
import Perguntas from '../screens/settings/Perguntas';
import Perfil from '../screens/settings/Perfil';
import EditarPerfil from '../screens/settings/EditarPerfil';
import Product from '../screens/home/Product';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SettingStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function Navigator() {
	const { user } = useSelector(({ user }) => ({ user }));

	const AuthScreen = () => {
		return (
			<AuthStack.Navigator initialRouteName="AuthLoadingScreen" screenOptions={{ headerShown: false }}>
				<AuthStack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
				<AuthStack.Screen name="Auth" component={Auth} />
				<AuthStack.Screen name="Login" component={Login} />
			</AuthStack.Navigator>
		);
	};

	const HomeScreen = () => {
		return (
			<HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<HomeStack.Screen name="Home" component={Home} />
				<HomeStack.Screen name="Product" component={Product} />
			</HomeStack.Navigator>
		);
	};

	const SettingScreen = () => {
		return (
			<SettingStack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }} >
				<SettingStack.Screen name="Perfil" component={Perfil} />
				<SettingStack.Screen name="Perguntas" component={Perguntas} />
				<SettingStack.Screen name="Editar Perfil" component={EditarPerfil} />
			</SettingStack.Navigator>
		);
	};

	const DrawerNavigation = () => {
		return (
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={HomeScreen} />
			</Drawer.Navigator>
		)
	}

	return (
		<NavigationContainer theme={navigatorTheme}>
			{user.isLogged ? AuthScreen() :
				<MainStack.Navigator screenOptions={{ headerShown: false }}>
					<MainStack.Screen name='Home' component={DrawerNavigation} />
					<MainStack.Screen name='Settings' component={SettingScreen} />
				</MainStack.Navigator>
			}
		</NavigationContainer>
	);
}