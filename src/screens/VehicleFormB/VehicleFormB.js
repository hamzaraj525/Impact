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
import auth from '@react-native-firebase/auth';
import {addUserid} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';

const VehicleFormB = ({route, navigation}) => {
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState('');
  const [vehicleRegCertiNumber, setVehicleRegCertNumber] = useState('');

  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    database()
      .ref('users/' + signUpKey + '/vehicleInformation')
      .push({
        vehiclePlateNumber: vehiclePlateNumber,
        vehicleRegCertiNumber: vehicleRegCertiNumber,
      })
      .then(() => {
        navigation.navigate('VehicleFormC');
        setVehiclePlateNumber('');
        setVehicleRegCertNumber('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  const handleChange2 = e => {
    const result = e.replace(/[^0-9]/g, '');
    setVehicleRegCertNumber(result);
  };

  const handleChange3 = e => {
    const result = e.replace(/[^a-z0-9]/gi, '');
    const res = result.replace(/(\d{2})(\d{3})/, '$1 $2');
    setVehiclePlateNumber(res);
  };

  const inputsList = () => {
    return (
      <View>
        <Text style={style.headerTxt}>{Constraints.VEHICLE_PLATE_NUMBER}</Text>

        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            maxLength={7}
            style={style.TiName}
            value={vehiclePlateNumber}
            onChangeText={e => {
              handleChange3(e);
            }}
            placeholder={'Numéro de plaque'}
          />
          <Text
            style={{color: vehiclePlateNumber.length > 0 ? 'black' : 'grey'}}>
            {vehiclePlateNumber.length}/7
          </Text>
        </View>
        <Text style={style.headerTxt}>
          {Constraints.VEHICLE_REG_CERTIFICATION_NUMBER}
        </Text>

        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            keyboardType="number-pad"
            maxLength={13}
            style={style.TiName}
            value={vehicleRegCertiNumber}
            onChangeText={e => {
              handleChange2(e);
            }}
            placeholder={'Numéro du certificat d’immatriculation'}
          />
          <Text
            style={{
              color: vehicleRegCertiNumber.length > 0 ? 'black' : 'grey',
            }}>
            {vehicleRegCertiNumber.length}/13
          </Text>
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
export default VehicleFormB;
