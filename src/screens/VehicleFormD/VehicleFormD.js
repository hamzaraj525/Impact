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
import {
  addUserid,
  userPersoanlVerify,
  vehicleVerify,
  insuranceVerify,
} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';

const VehicleFormD = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [validate, setValidate] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [selectedProvince, setSelectedProvince] = useState('Québec');
  const {
    userId,
    signUpKey,
    userPersonalDetailsVerify,
    vehicleDetailsVerify,
    insuranceDetailsVerify,
  } = useSelector(reducers => reducers.regReducer);

  const updateVehicleVerify = () => {
    database()
      .ref('users/' + signUpKey)
      .update({
        vehicleDetailsVerified: true,
      })
      .then(() => {
        dispatch(vehicleVerify(true));
        navigation.navigate('DocRegistration');
        console.log('vehicle Verify updated.');
      });
  };

  const uploadToDatabase = async () => {
    if (phone.length > 0) {
      if (address.length > 0) {
        if (city.length > 0) {
          if (zipCode.length > 0) {
            if (selectedCountry.length > 0) {
              if (selectedProvince.length > 0) {
                if (validate === false) {
                  database()
                    .ref('users/' + signUpKey + '/vehicleInformation')
                    .push({
                      OwnerPhoneNumber: phone,
                      OwnerAddress: address,
                      OwnerCity: city,
                      OwnerZipCode: zipCode,
                      OwnerCountry: selectedCountry,
                      OwnerProvince: selectedProvince,
                      vehicleDetailsVerified: true,
                    })
                    .then(() => {
                      updateVehicleVerify();
                      setPhone('');
                      setAddress('');
                      setCity('');
                      setZipCode('');
                    })
                    .catch(error => {
                      alert('Something went wrong' + error);
                    });
                } else {
                  console.log('Validation required');
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
    setPhone(result);
  };

  const handleChange3 = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setCity(result);
  };

  const handlePostalCode = e => {
    let regex = /[A-Za-z0-9]{3}([A-Za-z0-9]+ ?)*$/gi;
    setZipCode(e);
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
        <Text style={style.headerTxt}>
          {Constraints.VEHICLE_OWNER_PHONE_NUMBER}
        </Text>

        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            maxLength={10}
            keyboardType="number-pad"
            style={style.TiName}
            value={phone}
            onChangeText={e => {
              handleChange2(e);
            }}
            placeholder={'Numéro de téléphone'}
          />
        </View>
        <Text style={style.headerTxt}>
          {Constraints.VEHICLE_OWNER_HOME_ADDRESS}
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
              maxLength={7}
              style={[style.TiName, {width: '80%'}]}
              value={zipCode}
              onChangeText={e => {
                handlePostalCode(e);
              }}
              placeholder={'Code postale'}
            />
          </View>
        </View>
        {validate ? (
          <Text style={{color: 'red', alignSelf: 'center', marginTop: '4%'}}>
            Le format du code postal doit être xxx xxx
          </Text>
        ) : (
          <Text style={{}}></Text>
        )}

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
        <Text style={style.stepTxt}>Étape 4 de 4</Text>
        <View style={style.topBar} />
      </View>
      <ScrollView contentContainerStyle={{padding: '4%'}}>
        {inputsList()}
      </ScrollView>
      <BottomBtns uploadToDatabase={uploadToDatabase} navigation={navigation} />
    </SafeAreaView>
  );
};
export default VehicleFormD;
