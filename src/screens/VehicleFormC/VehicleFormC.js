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
import BottomBtnsC from './../../Components/BottomBtns/BottomBtnsC';
import * as Animatable from 'react-native-animatable';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {vehicleRadioBtns} from '../../DataStore/RegDocData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  addUserid,
  userPersoanlVerify,
  vehicleVerify,
  insuranceVerify,
} from '../../Redux/Action/actions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Constraints from '../../Constraints/Constraints';

const VehicleFormC = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [vehicleRadio, setVehicleRadio] = useState('');
  const [color, setColor] = useState(null);
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
    database()
      .ref('users/' + signUpKey + '/vehicleInformation')
      .push({
        VehicleOwnerYesorNo: vehicleRadio,
        VehicleOwnerFirstName: fName,
        VehicleOwnerLastName: lName,
      })
      .then(() => {
        if (color === '0') {
          updateVehicleVerify();
          navigation.navigate('DocRegistration');
        } else {
          navigation.navigate('VehicleFormD');
        }
        setFName('');
        setLName('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  const changeColor = id => {
    setColor(id);
  };

  const handleChange = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setFName(result);
  };

  const handleChange2 = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setLName(result);
  };

  const btnFunction = item => {
    changeColor(item.key);
    setVehicleRadio(item.title);
  };

  const inputsList = () => {
    return (
      <View style={{}}>
        <Text style={style.headerTxt}>{Constraints.VEHICLE_OWNER_WHO}</Text>
        {vehicleRadioBtns.map(item => {
          return (
            <View style={{padding: '4%'}} key={item.key}>
              <TouchableOpacity
                onPress={() => {
                  btnFunction(item);
                }}
                style={
                  color === item.key ? style.btnGenderBlue : style.btnGenderPink
                }>
                <Text
                  style={
                    color === item.key
                      ? style.genderTxtWhite
                      : style.genderTxtGrey
                  }>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
        {color === '1' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'slideInLeft'}>
            <Text style={style.headerTxt}>
              {Constraints.VEHICLE_OWNER_FULLNAME}
            </Text>
            <View style={[style.passwordContainer, {marginTop: '1%'}]}>
              <TextInput
                keyboardType="default"
                style={style.TiName}
                value={fName}
                onChangeText={e => {
                  handleChange(e);
                }}
                placeholder={'Prénom'}
              />
            </View>
            <View
              style={[
                style.passwordContainer,
                {marginTop: '5%', marginBottom: '1%'},
              ]}>
              <TextInput
                style={style.TiName}
                value={lName}
                onChangeText={e => {
                  handleChange2(e);
                }}
                placeholder={'Nom'}
              />
            </View>
            <Text></Text>
          </Animatable.View>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{padding: '4%'}}>
        <Text style={style.stepTxt}>Étape 3 de 4</Text>
        <View style={style.topBar} />
      </View>
      <ScrollView contentContainerStyle={{padding: '4%'}}>
        {inputsList()}
      </ScrollView>

      <BottomBtnsC
        color={color}
        uploadToDatabase={uploadToDatabase}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default VehicleFormC;
