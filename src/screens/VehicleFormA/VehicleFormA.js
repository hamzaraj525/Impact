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

const VehicleFormA = ({route, navigation}) => {
  const [loader, setLoader] = useState(false);
  const [vehivleModel, setVehicleModel] = useState('');
  const [vehicleModelYear, setVehicleModelYear] = useState('');
  const [colorVehicle, setVehicleColor] = useState('');

  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    if (vehivleModel.length > 0) {
      if (vehicleModelYear.length > 0) {
        if (colorVehicle.length > 0) {
          setLoader(true);
          database()
            .ref('users/' + signUpKey + '/vehicleInformation')
            .push({
              vehivleModel: vehivleModel,
              vehicleModelYear: vehicleModelYear,
              colorVehicle: colorVehicle,
            })
            .then(() => {
              setLoader(false);
              navigation.navigate('VehicleFormB');
              setVehicleModel('');
              setVehicleModelYear('');
              setVehicleColor('');
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

  const changeColor = id => {
    setColor(id);
  };

  const handleChange2 = e => {
    const result = e.replace(/[^a-z]/g, '');
    setVehicleColor(result);
  };

  const inputsList = () => {
    return (
      <View>
        <Text style={style.headerTxt}>{Constraints.VEHICLE_MODEL}</Text>

        <View style={[style.inputParent, {marginTop: '7%'}]}>
          <View style={[style.passwordContainer, {width: '55%'}]}>
            <TextInput
              maxLength={20}
              style={[style.TiName, {width: '55%'}]}
              value={vehivleModel}
              onChangeText={e => {
                setVehicleModel(e);
              }}
              placeholder={'Modèle de véhicule'}
            />
          </View>

          <View style={[style.passwordContainer, {width: '40%'}]}>
            <TextInput
              maxLength={4}
              keyboardType="number-pad"
              style={[style.TiName, {width: '80%'}]}
              value={vehicleModelYear}
              onChangeText={e => {
                setVehicleModelYear(e);
              }}
              placeholder={'Année'}
            />
          </View>
        </View>
        <Text style={style.headerTxt}>{Constraints.VEHICLE_COLOR}</Text>

        <View style={[style.passwordContainer, {marginTop: '3%'}]}>
          <TextInput
            style={style.TiName}
            value={colorVehicle}
            onChangeText={e => {
              setVehicleColor(e);
            }}
            placeholder={'Couleur du véhicule'}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{padding: '4%'}}>
        <Text style={style.stepTxt}>Étape 1 de 4</Text>
        <View style={style.topBar} />
      </View>
      <ScrollView contentContainerStyle={{padding: '4%'}}>
        {inputsList()}
      </ScrollView>
      <BottomBtns
        loader={loader}
        uploadToDatabase={uploadToDatabase}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default VehicleFormA;
