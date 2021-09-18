import React, { useState } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';
import Image from 'react-native-scalable-image';
import fruits from '../../../assets/fruits.png';
import fruits1 from '../../../assets/fruits1.png'
import StyleGuide, { buttonContainer, colors, Default, inputTheme } from '../../../assets/styles/StyleGuide';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Onboarding(props) {
	const navigate = useNavigation();

	const [step, setStep] = useState(0);
	const [nome, setNome] = useState('');

	const steps = [
		{
			image: fruits,
			title: 'Get The Freshest Fruit Salad Combo',
			subtitle: 'We deliver the best and freshest fruit salad in town. Order for a combo today!!!'
		},
		{
			image: fruits1,
			title: 'What is your firstname?',
		},
	];

	const changeSlide = () => {
		if (step === 2) {
			navigate.navigate('Home');
		} else {
			setStep(e => e + 1);
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} style={Default.container} showsVerticalScrollIndicator={false}>
			<TouchableOpacity onPress={() => { step === 0 ? navigate.goBack() : setStep(e => e - 1); }} style={styles.containerArrow}>
				<Icon style={styles.backArrow} name='arrow-left' size={15} color={colors.white} />
			</TouchableOpacity>

			<View style={{ backgroundColor: '#FFA451', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={steps[step].image} width={Dimensions.get('screen').width - 100} />
			</View>

			<View style={{ flex: 1, paddingHorizontal: 24, top: -7, zIndex: 10, borderRadius: 8, backgroundColor: colors.white, paddingTop: 40 }}>
				<Text style={[StyleGuide.semibold16, { color: '#27214D', marginBottom: 20 }]}>{steps[step].title}</Text>

				{step == 0 ?
					<Text style={[StyleGuide.regular16, { color: '#5D577E' }]}>{steps[step].subtitle}</Text>
					:
					<TextInput mode="flat" underlineColor="#F1F1F1" style={StyleGuide.input} returnKeyType="next" onSubmitEditing={() => { }} blurOnSubmit={false} theme={inputTheme} label="Name" onChangeText={setNome} value={nome} />

				}

				<View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 60, marginTop: 30 }}>
					<Button onPress={changeSlide} containerStyle={buttonContainer.containerButton} buttonStyle={buttonContainer.button} titleStyle={StyleGuide.body14Bold} title="Let’s Continue" mode="contained" />
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	imagemGaleria: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - Dimensions.get('window').height / 3,
	},
	containerArrow: {
		position: 'absolute',
		zIndex: 10,
		top: 32,
		left: 20,
		width: 32,
		height: 32,
		borderRadius: 100,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	}
});
