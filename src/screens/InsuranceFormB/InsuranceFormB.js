import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {genderBtns} from '../../DataStore/RegDocData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import database from '@react-native-firebase/database';
import {addUserid} from '../../Redux/Action/actions';

import Constraints from '../../Constraints/Constraints';

const InsuranceFormB = ({route, navigation}) => {
  const [compnayName, setComapnyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [selectedProvince, setSelectedProvince] = useState('Québec');
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    database()
      .ref('users/' + signUpKey + '/insuranceInformation')
      .push({
        InsuranceComapnyName: compnayName,
        InsuranceAddress: address,
        InsuranceCity: city,
        InsuranceZipCode: zipCode,
        InsuranceCountry: selectedCountry,
        InsuranceProvince: selectedProvince,
      })
      .then(() => {
        navigation.navigate('InsuranceFormC');
        setComapnyName('');
        setAddress('');
        setCity('');
        setZipCode('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  const changeColor = id => {
    setColor(id);
  };

  const handleChange2 = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setComapnyName(result);
  };

  const handleChange3 = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setCity(result);
  };

  const inputsList = () => {
    return (
      <View>
        <Text style={style.headerTxt}>
          {Constraints.INSURANCE_COMPANY_NAME}
        </Text>

        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            maxLength={10}
            style={style.TiName}
            value={compnayName}
            onChangeText={e => {
              handleChange2(e);
            }}
            placeholder={'Nom de la société'}
          />
        </View>
        <Text style={style.headerTxt}>
          {Constraints.INSURANCE_COMPANY_ADDRESS}
        </Text>
        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            maxLength={100}
            style={style.TiName}
            value={address}
            onChangeText={e => {
              setAddress(e);
            }}
            placeholder={'Numéro et rue de l’adresse'}
          />
        </View>

        <View style={[style.inputParent, {marginTop: '7%'}]}>
          <View style={[style.passwordContainer, {width: '55%'}]}>
            <TextInput
              maxLength={100}
              style={[style.TiName, {width: '55%'}]}
              value={city}
              onChangeText={e => {
                handleChange3(e);
              }}
              placeholder={'Ville'}
            />
          </View>

          <View style={[style.passwordContainer, {width: '40%'}]}>
            <TextInput
              style={[style.TiName, {width: '80%'}]}
              maxLength={100}
              value={zipCode}
              onChangeText={e => {
                setZipCode(e);
              }}
              placeholder={'Code postale'}
            />
          </View>
        </View>
        <View style={[style.inputParent, {marginTop: '7%'}]}>
          <Picker
            mode="dropdown"
            style={[style.picker, {backgroundColor: '#F6F3F5', width: '55%'}]}
            selectedValue={selectedCountry}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCountry(itemValue);
              console.log(itemValue);
            }}>
            <Picker.Item label="🇨🇦   Canada" value="Canada" />
          </Picker>
          <Picker
            mode="dropdown"
            style={[style.picker, {backgroundColor: '#F6F3F5', width: '40%'}]}
            selectedValue={selectedProvince}
            onValueChange={va => {
              setSelectedProvince(va);
              console.log('-----' + va);
            }}>
            <Picker.Item label="Québec" value="Québec" />
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{padding: '4%'}}>
        <Text style={style.stepTxt}>Étape 2 de 4</Text>
        <View style={style.topBar} />
      </View>
      <ScrollView contentContainerStyle={{padding: '4%'}}>
        {inputsList()}
      </ScrollView>
      <BottomBtns uploadToDatabase={uploadToDatabase} navigation={navigation} />
    </SafeAreaView>
  );
};
export default InsuranceFormB;
