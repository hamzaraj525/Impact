import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BottomBtnsC from './../../Components/BottomBtns/BottomBtnsC';
import * as Animatable from 'react-native-animatable';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {vehicleRadioBtns} from '../../DataStore/RegDocData';
import {vehicleVerify, insuranceVerify} from '../../Redux/Action/actions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Constraints from '../../Constraints/Constraints';

const InsuranceFormC = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [vehicleRadio, setVehicleRadio] = useState('');
  const [color, setColor] = useState(null);
  const {signUpKey} = useSelector(reducers => reducers.regReducer);

  const updateVehicleVerify = () => {
    database()
      .ref('users/' + signUpKey)
      .update({insuranceDetailsVerified: true})
      .then(() => {
        dispatch(insuranceVerify(true));
        navigation.navigate('DocRegistration');
        console.log('vehicle Verify updated.');
      });
  };

  const updateVehicleVerifyRadio = () => {
    setLoader(true);
    database()
      .ref('users/' + signUpKey + '/insuranceInformation')
      .update({VehicleOwnerYesorNo: vehicleRadio})
      .then(() => {
        setLoader(false);
        updateVehicleVerify();
        console.log('vehicle Verify radio.');
      });
  };

  const uploadToDatabase = async () => {
    setLoader(true);
    if (color === '0') {
      updateVehicleVerifyRadio();
    } else {
      if (fName.length > 0) {
        if (lName.length > 0) {
          setLoader(true);
          database()
            .ref('users/' + signUpKey + '/insuranceInformation')
            .push({
              VehicleOwnerYesorNo: vehicleRadio,
              VehicleOwnerFirstName: fName,
              VehicleOwnerLastName: lName,
            })
            .then(() => {
              setLoader(false);
              navigation.navigate('InsuranceFormD');
              setFName('');
              setLName('');
            })
            .catch(error => {
              setLoader(false);
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
    }
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
        loader={loader}
        color={color}
        uploadToDatabase={uploadToDatabase}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default InsuranceFormC;
