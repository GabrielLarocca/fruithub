import React from 'react';
import { View, Text } from "react-native";
import Chat from '../../assets/lembrete/chatCard.png';
import Metric from '../../assets/lembrete/metricCard.png';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function Lembrete(props) {
	const pressed = useSharedValue(false);

	const eventHandler = useAnimatedGestureHandler({
		onStart: () => {
			pressed.value = true;
		},
		onEnd: () => {
			pressed.value = false;
		},
	});

	const animated = useAnimatedStyle(() => {
		return {
			transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }],
		};
	});

	return (
		<View style={{ backgroundColor: colors.gray5, marginHorizontal: 20, borderRadius: 6, marginTop: 24, paddingLeft: 16, paddingRight: 20, flex: 1, flexDirection: 'row' }}>
			<TapGestureHandler onGestureEvent={eventHandler}>
				<Animated.Image style={[animated, { height: 75, width: 75, marginVertical: 16, marginRight: 24, borderRadius: 8 }]} width={75} height={75} source={props.diretoria ? Chat : Metric} />
			</TapGestureHandler>

			<View style={{ flexShrink: 1, alignSelf: 'center' }}>
				<Text style={[StyleGuide.regular14, { color: colors.primaryDark }]}>{props.text}</Text>
			</View>
		</View>
	);
}