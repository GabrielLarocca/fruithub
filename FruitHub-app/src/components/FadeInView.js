import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const FadeInView = props => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, { toValue: 1, duration: (props.pos / 3) * 1000, useNativeDriver: true }).start();
	});

	return (
		<Animated.View style={{ ...props.style, opacity: fadeAnim }}>
			{props.children}
		</Animated.View>
	);
};

export default FadeInView;