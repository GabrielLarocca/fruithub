import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-remix-icon';
import StyleGuide, { colors } from '../../assets/styles/StyleGuide';

export default function Accordian(props) {
	const [expanded, setExpanded] = useState(false);
	const ref = useRef(null);

	const toggleExpand = () => { setExpanded(!expanded); };

	return (
		<View style={expanded && { marginBottom: 26 }}>
			<TouchableOpacity ref={ref} style={styles.row} onPress={toggleExpand}>
				<Text style={[StyleGuide.regularSe16, { color: colors.gray1 }]} numberOfLines={1}>{props?.title}</Text>

				<Icon name={expanded ? 'arrow-up-s-fill' : 'arrow-down-s-fill'} size={20} color={'#000'} />
			</TouchableOpacity>

			{expanded && props?.children}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 56,
		alignItems: 'center',
		backgroundColor: "#FFF",
		borderBottomColor: colors.gray5,
		borderBottomWidth: 1,
		marginBottom: 16
	},
});
