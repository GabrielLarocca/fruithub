import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    semibold24: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '600',
        fontFamily: 'Inter6',
    },
    medium18: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '500',
        fontFamily: 'Inter5',
    },
    semibold16: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        fontFamily: 'Inter6',
    },
    medium16: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Inter5',
    },
    regular16: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'Inter4',
    },
    regularSe16: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Inter4',
    },
    medium14: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Inter5',
    },
    regular14: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Inter4',
    },
    tag12: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '500',
        fontFamily: 'Inter5',
    },
    regular12: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '400',
        fontFamily: 'Inter4',
    },
    regular10: {
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '400',
        fontFamily: 'Inter4',
    },
    input: {
        backgroundColor: '#F5F5F5',
        fontSize: 12
    }
});

export const buttonContainer = StyleSheet.create({
    button: {
        borderRadius: 10,
        height: 56,
        backgroundColor: '#FFA451'
    },
    containerButton: {
        borderRadius: 10,
        height: 56,
    },
});

export const inputTheme = {
    colors: { primary: '#8E9793', text: '#0E2218', placeholder: '##b4b4c0' },
    fonts: {
        regular: {
            fontSize: 12,
            lineHeight: 24,
            fontFamily: 'Inter4',
        }
    },
    roundness: 16
};

export const textareaTheme = {
    colors: { primary: '#8E9793', text: '#0E2218', placeholder: '#DADFDD' },
    fonts: {
        regular: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: 'Inter4',
        }
    },
    roundness: 16
};

export const colors = {
    primaryDefault: '#12E27D',
    primaryDark: '#149355',
    primaryLight: '#9CFF87',
    primarySubtle: '#EAF6F0',

    gray1: '#0E2218',
    gray2: '#5A615E',
    gray3: '#8E9793',
    gray4: '#DADFDD',
    gray5: '#F4F8F6',
    white: '#FFF',

    negative: '#DA3030',
    warning: '#DAAA30',
    success: '#30DA74',
    infos: '#3069DA',
};

export const Default = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#FFF',
    },
    tabBottom: {
        backgroundColor: '#FFF',
        borderTopColor: '#FFF',
        height: 77,
        paddingTop: 20,
        paddingBottom: 16,
        elevation: 24,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    }
});