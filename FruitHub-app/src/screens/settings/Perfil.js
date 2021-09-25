import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/ducks/user';
import StyleGuide, { colors, Default } from '../../../assets/styles/StyleGuide';

export default function Perfil(props) {
	const dispatch = useDispatch();

	const { navigate } = useNavigation();

	const user = useSelector(({ user }) => user);

	const exitApp = () => {
		dispatch(logout());
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} style={Default.container}>
			<SafeAreaView>
				<View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: 56 }}>
					{user?.foto ?
						<Image height={101} width={101} style={{ borderRadius: 100, height: 101, width: 101 }} source={user?.foto && { uri: user?.foto?.url }} />
						:
						<View style={{ borderRadius: 100, height: 101, width: 101, backgroundColor: colors.gray4, justifyContent: 'center', }}>
							<Text style={[StyleGuide.semibold24, { textAlign: 'center' }]}>{user?.usr_nome?.substr(0, 1).toUpperCase()}A</Text>
						</View>
					}
				</View>

				<Text numberOfLines={3} style={[StyleGuide.medium18, { color: colors.gray1, textAlign: 'center', marginTop: 24 }]}>{user?.usu_nome}</Text>

				<Text numberOfLines={2} style={[StyleGuide.regular16, { color: colors.gray3, textAlign: 'center', marginTop: 4, marginBottom: 64 }]}>{user?.email}</Text>

				<TouchableOpacity style={styles.button} onPress={() => navigate('Editar Perfil')}>
					<Text style={[StyleGuide.medium16, { color: colors.gray1 }]}>Editar perfil</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigate('Termos')}>
					<Text style={[StyleGuide.medium16, { color: colors.gray1 }]}>Termos de uso</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigate('Perguntas')}>
					<Text style={[StyleGuide.medium16, { color: colors.gray1 }]}>Perguntas frequentes</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.button, { borderBottomColor: '#F4F8F6', borderBottomWidth: 1 }]} onPress={exitApp}>
					<Text style={[StyleGuide.medium16, { color: colors.gray1 }]}>Sair</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		paddingVertical: 24,
		paddingHorizontal: 20,
		borderTopColor: '#F4F8F6',
		borderTopWidth: 1
	},
});
