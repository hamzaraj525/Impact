import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  ToastAndroid,
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
  const [validate, setValidate] = useState(false);
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    if (vehiclePlateNumber.length > 0) {
      if (vehicleRegCertiNumber.length > 0) {
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
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Fields required',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Fields required',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    }
  };

  const handleChange2 = e => {
    const result = e.replace(/[^0-9]/g, '');
    setVehicleRegCertNumber(result);
  };

  const handleChange3 = e => {
    let regex = /[A-Za-z0-9]{3}([A-Za-z0-9]+ ?)*$/gi;
    setVehiclePlateNumber(e);
    if (!regex.test(e)) {
      console.log('format must be xxx xxx');
      setValidate(true);
    } else {
      setValidate(false);
      console.log('Valid');
    }
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
        {validate ? (
          <Text style={{color: 'red', alignSelf: 'center', marginTop: '4%'}}>
            Le format du numéro de plaque doit être xxx xxx
          </Text>
        ) : (
          <Text style={{}}></Text>
        )}
        <Text style={style.headerTxt}>
          {Constraints.VEHICLE_REG_CERTIFICATION_NUMBER}
        </Text>

        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            keyboardType="number-pad"
            maxLength={12}
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
            {vehicleRegCertiNumber.length}/12
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
