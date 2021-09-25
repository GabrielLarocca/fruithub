import React, { useRef, useState } from 'react';
import { Text, Alert, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-remix-icon';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import StyleGuide, { buttonContainer, colors, Default, inputTheme } from '../../../assets/styles/StyleGuide';
import { FlatList } from 'react-native';
import Image from 'react-native-scalable-image';

import berryManga from '../../../assets/recommended/berryMango.png';
import honeyLime from '../../../assets/recommended/honeyLime.png';

const DATA = [
  'All',
  'Salad Combo',
  'Berry Combo',
  'Manga Combo',
  'Food Combo'
]

const RECOMMENDED = [
  {
    image: honeyLime,
    name: 'Honey lime combo',
    price: '19.00'
  },
  {
    image: berryManga,
    name: 'Berry mango combo',
    price: '25.00'
  }
]

export default function Home(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const renderItem = (item, index) => (
    <TouchableOpacity style={[{ borderColor: '#f1f1f1', borderWidth: 1, borderRadius: 10, marginRight: 8 }, index == 0 && { marginLeft: 24 }, index == DATA.length - 1 && { marginRight: 24 }]}>
      <Text style={[StyleGuide.regular16, { color: '#333333', paddingHorizontal: 16, paddingVertical: 8 }]}>{item}</Text>
    </TouchableOpacity>
  )

  return (
    <KeyboardAwareScrollView style={[Default.container, { paddingTop: 36 }]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="ri-menu-5-fill" size={22} color={'#0E76A8'} />
          </TouchableOpacity>

          <Text style={[StyleGuide.regular14, { marginLeft: 16, flex: 1, color: '#27214d' }]}>Welcome, Chris.</Text>

          <IconButton icon="shopping" style={{ borderWidth: 1, borderColor: '#f1f1f1', height: 40, width: 40, borderRadius: 200 }} color={'#FFA451'} size={22} onPress={() => console.log('Pressed')} />
        </View>

        <TextInput mode="outlined" outlineColor="#fff" underlineColor="#FFF" theme={inputTheme} style={[StyleGuide.input, { marginTop: 44 }]} returnKeyType="next" onSubmitEditing={() => { }} blurOnSubmit={false} label="" left={<TextInput.Icon color="#86869E" style={{ marginLeft: 10 }} name="magnify" />} placeholder="Search for fruit salad combos" onChangeText={setSearch} value={search} keyboardType='default' autoCorrect={false} />

      </View>

      <FlatList style={{ marginTop: 30, backgroundColor: '#FAFAFA', paddingVertical: 8 }} data={DATA} renderItem={({ item, index }) => renderItem(item, index)} keyExtractor={e => e.id} horizontal showsHorizontalScrollIndicator={false} />

      <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
        <Text style={[StyleGuide.medium18, { color: '#27214D' }]}>Recommended Combo</Text>
        <View style={{ height: 2, width: 56, backgroundColor: '#FFA451', marginTop: 6 }}></View>

        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          {RECOMMENDED.map((item, index) => (
            <TouchableOpacity onPress={() => navigation.navigate('Product')} style={[index == 0 && { marginRight: 6 }, index == 1 && { marginLeft: 6 }, { flex: 1, borderRadius: 16, overflow: 'hidden', borderColor: '#f1f1f1', borderWidth: 0.5, backgroundColor: '#FFF', elevation: 2, padding: 16, }]}>
              <Icon name="ri-heart-line" size={22} color={'#FFA451'} style={{ alignSelf: 'flex-end' }} />

              <View style={{ alignItems: 'center' }}>
                <Image source={item.image} width={80} />
              </View>

              <Text style={[StyleGuide.regular16, { marginTop: 16 }]}>{item.name}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13 }}>
                <Text style={[StyleGuide.medium14, { color: '#F08626', alignSelf: 'center' }]}>$ {item.price}</Text>

                <TouchableOpacity style={{ backgroundColor: '#FFF8E7', alignSelf: 'flex-end', width: 29, height: 29, borderRadius: 200 }}>
                  <Text style={{ alignSelf: 'center', fontSize: 20, color: '#FFA451' }}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[StyleGuide.medium18, { color: '#27214D' }]}>Hottest</Text>
          <Text style={[StyleGuide.medium18, { color: '#27214D' }]}>Popular</Text>
          <Text style={[StyleGuide.medium18, { color: '#27214D' }]}>New Combo</Text>
        </View>

        <View style={{ height: 2, width: 56, backgroundColor: '#FFA451', marginTop: 6 }}></View>

        <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 16 }}>
          {RECOMMENDED.map((item, index) => (
            <View style={[index == 0 && { marginRight: 6 }, index == 1 && { marginLeft: 6 }, { flex: 1, borderRadius: 16, overflow: 'hidden', borderColor: '#f1f1f1', borderWidth: 0.5, backgroundColor: '#FFF', elevation: 2, padding: 16, }]}>
              <Icon name="ri-heart-line" size={22} color={'#FFA451'} style={{ alignSelf: 'flex-end' }} />

              <View style={{ alignItems: 'center' }}>
                <Image source={item.image} width={80} />
              </View>

              <Text style={[StyleGuide.regular16, { marginTop: 16 }]}>{item.name}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13 }}>
                <Text style={[StyleGuide.medium14, { color: '#F08626', alignSelf: 'center' }]}>$ {item.price}</Text>

                <TouchableOpacity style={{ backgroundColor: '#FFF8E7', alignSelf: 'flex-end', width: 29, height: 29, borderRadius: 200 }}>
                  <Text style={{ alignSelf: 'center', fontSize: 20, color: '#FFA451' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>


    </KeyboardAwareScrollView>
  );
}