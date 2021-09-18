import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-remix-icon';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function Header(props) {
	const navigate = useNavigation();

	const user = useSelector(({ user }) => user);

	return (
		<View style={[styles.header, props.arrowBack && { borderBottomColor: '#F4F8F6', borderBottomWidth: 1 }]}>
			{props.arrowBack &&
				<TouchableOpacity style={{ alignSelf: 'center', paddingRight: 19 }} onPress={() => navigate.goBack()}>
					<Icon name="arrow-left-s-line" size={28} color={colors.gray1} />
				</TouchableOpacity>
			}

			{props?.title?.length > 0 && <Text style={[(props.arrowBack ? StyleGuide.medium18 : StyleGuide.semibold24), { color: colors.gray1, alignSelf: 'center' }]}>{props.title}</Text>}

			{props.iconPhoto &&
				<TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'flex-end' }} onPress={() => navigate.navigate({ name: 'Settings', params: { screen: 'Perfil' } })}>
					{user.foto ?
						<Image width={45} style={styles.perfilFoto} source={user?.foto && { uri: user?.foto?.url }} />
						:
						<View style={styles.semFotoContainer}>
							<Text style={[StyleGuide.medium16, { textAlign: 'center' }]}>{user?.usu_nome?.substr(0, 1).toUpperCase()}</Text>
						</View>
					}
				</TouchableOpacity>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 20,
		paddingTop: 24,
		paddingBottom: 17,
		backgroundColor: colors.white,
		flexDirection: 'row'
	},
	perfilFoto: {
		borderRadius: 100,
		width: 45,
		height: 45,
		alignSelf: 'flex-end',
		alignItems: 'center'
	},
	semFotoContainer: {
		width: 45,
		height: 45,
		backgroundColor: colors.gray4,
		borderRadius: 100,
		justifyContent: 'center',
	},
});
