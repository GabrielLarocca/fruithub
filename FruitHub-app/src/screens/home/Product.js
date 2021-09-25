import React, { useState } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Remix from 'react-native-remix-icon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';
import Image from 'react-native-scalable-image';
import product from '../../../assets/productImage.png';
import StyleGuide, { buttonContainer, colors, Default, inputTheme } from '../../../assets/styles/StyleGuide';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Product(props) {
  const navigate = useNavigation();
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(1)

  const DATA = [
    'Red Quinoa',
    'Lime',
    'Honey',
    'Blueberries',
    'Mango',
    'Strawberries',
    'Fresh Mint'
  ]

  const removeQuantidade = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} style={Default.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => { step === 0 ? navigate.goBack() : setStep(e => e - 1); }} style={styles.containerArrow}>
        <Icon style={styles.backArrow} name='arrow-left' size={15} color={colors.white} />
      </TouchableOpacity>

      <View style={{ backgroundColor: '#FFA451', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={product} width={178} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, top: -7, zIndex: 10, borderRadius: 8, backgroundColor: colors.white, paddingTop: 40 }}>
        <Text numberOfLines={1} style={[StyleGuide.semibold24, { color: '#27214D', marginBottom: 20 }]}>Quinoa Fruit Salad</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: '#FFF2E7', width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 200 }} onPress={() => removeQuantidade()}><Remix name="ri-subtract-line" size={20} color="#FFA451" /></TouchableOpacity>
            <Text style={{ marginHorizontal: 24, alignSelf: 'center' }}>{quantidade}</Text>
            <TouchableOpacity style={{ backgroundColor: '#FFF2E7', width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 200 }} onPress={() => setQuantidade(quantidade + 1)}><Remix name="ri-add-fill" size={20} color="#FFA451" /></TouchableOpacity>
          </View>

          <Text style={[StyleGuide.semibold24, { color: '#27214D' }]}>$ {99 * quantidade}</Text>
        </View>

        <View style={{ height: 1, backgroundColor: '#F3F3F3', marginTop: 41, marginBottom: 16 }} />

        <Text style={[StyleGuide.medium18, { color: '#27214D' }]}>This combo contains:</Text>
        <View style={{ height: 2, width: 56, backgroundColor: '#FFA451', marginTop: 6 }}></View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 24 }}>
          {DATA.map(item => (
            <TouchableOpacity style={{ borderColor: '#f1f1f1', borderWidth: 1, borderRadius: 10, margin: 4 }}>
              <Text style={[StyleGuide.regular12, { color: '#333333', paddingHorizontal: 8, paddingVertical: 6 }]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 1, backgroundColor: '#F3F3F3', marginTop: 41, marginBottom: 16 }} />

        <Text style={[StyleGuide.regular14, { color: '#333333' }]}>If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make</Text>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button onPress={() => { }} containerStyle={buttonContainer.containerButton} buttonStyle={buttonContainer.button} titleStyle={StyleGuide.body14Bold} title="Let’s Continue" mode="contained" />
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
