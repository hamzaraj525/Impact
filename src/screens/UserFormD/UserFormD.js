import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import {useDispatch, useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Constraints from '../../Constraints/Constraints';
import {userPersoanlVerify} from './../../Redux/Action/actions';

const UserFormD = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [licenseNum, setLicenseNum] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');

  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const updateUserVerify = () => {
    database()
      .ref('users/' + signUpKey)
      .update({
        personDetailsVerified: true,
      })
      .then(() => {
        dispatch(userPersoanlVerify(true));
        navigation.navigate('DocRegistration');
        console.log('persoanl Verify updated.');
      });
  };

  const uploadToDatabase = async () => {
    if (licenseNum.length > 0) {
      if (licenseExpiry.length > 0) {
        database()
          .ref('users/' + signUpKey + '/personalInformation')
          .push({
            LicenseNumber: licenseNum,
            LicenseExpiry: licenseExpiry,
          })
          .then(() => {
            updateUserVerify();
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

  const changeColor = id => {
    setColor(id);
  };

  const handleChange2 = e => {
    const result = e.replace(/(\d{5})(\d{6})(\d{2})/, '$1-$2-$3');
    setLicenseNum(result);
  };
  const handleChange3 = e => {
    const result = e.replace(/(\d{2})(\d{4})/, '$1/$2');
    setLicenseExpiry(result);
  };

  const inputsList = () => {
    return (
      <View style={{}}>
        <Text style={style.headerTxt}>{Constraints.DRIVER_LICENSE_TXT}</Text>
        <View style={[style.inputParent, {marginTop: '7%'}]}>
          <View style={[style.passwordContainer, {width: '55%'}]}>
            <TextInput
              maxLength={15}
              keyboardType="number-pad"
              style={[style.TiName, {}]}
              value={licenseNum}
              onChangeText={e => {
                handleChange2(e);
              }}
              placeholder={'Numéro de permis'}
            />
            <Text style={{color: licenseNum.length > 0 ? 'black' : 'grey'}}>
              {licenseNum.length}/13
            </Text>
          </View>

          <View style={[style.passwordContainer, {width: '40%'}]}>
            <TextInput
              style={[style.TiName, {width: '80%'}]}
              maxLength={7}
              keyboardType="number-pad"
              value={licenseExpiry}
              onChangeText={e => {
                handleChange3(e);
              }}
              placeholder={'Expiration'}
            />
          </View>
        </View>
        <Pressable onPress={() => {}} style={style.bottomContainer}>
          <SimpleLineIcons
            style={{marginBottom: '2%'}}
            name={'cloud-upload'}
            size={27}
            color={'grey'}
          />
          <Text style={style.photoTxt}>{Constraints.UPLOAD_PHOTO_TXT1}</Text>
          <Text style={style.photoTxt}>{Constraints.UPLOAD_PHOTO_TXT2}</Text>
        </Pressable>
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
export default UserFormD;
