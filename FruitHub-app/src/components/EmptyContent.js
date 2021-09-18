import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';
import noNoticia from '../../assets/empty/noNoticia.png';
import noMetrica from '../../assets/empty/noMetrica.png';
import noPesquisa from '../../assets/empty/noPesquisa.png';
import noSenha from '../../assets/empty/noSenha.png';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function EmptyContent(props) {
	const imageNoResult = () => {
		if (props.typeEmpty === 'noticia') return noNoticia;
		else if (props.typeEmpty === 'metrica') return noMetrica;
		else if (props.typeEmpty === 'pesquisa') return noPesquisa;
		else if (props.typeEmpty === 'senha') return noSenha;
	};

	const pressed = useSharedValue(false);

	const eventHandler = useAnimatedGestureHandler({
		onStart: () => { pressed.value = true; },
		onEnd: () => { pressed.value = false; },
	});

	const animated = useAnimatedStyle(() => {
		return { transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }] };
	});

	return (
		<View style={[styles.containerEmpty, props.mt0 && { marginTop: 40 }]}>
			<TapGestureHandler onGestureEvent={eventHandler}>
				<Animated.Image style={[styles.noResult, animated]} width={150} source={imageNoResult()} />
			</TapGestureHandler>

			<Text style={styles.emptyText}>{props?.text}</Text>
			<Text style={styles.emptySecondText}>{props?.secondText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	containerEmpty: {
		marginTop: 120,
		marginHorizontal: 20
	},
	noResult: {
		width: 120,
		height: 120,
		alignSelf: 'center'
	},
	emptyText: {
		...StyleGuide.medium16,
		color: colors.gray2,
		textAlign: 'center',
		marginTop: 32,
	},
	emptySecondText: {
		...StyleGuide.regular14,
		color: colors.gray3,
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 7,
		maxWidth: 230,
	},
});
