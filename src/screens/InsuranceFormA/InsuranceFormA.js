import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  ToastAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import {useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import database from '@react-native-firebase/database';
import Constraints from '../../Constraints/Constraints';

const InsuranceFormA = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [insuranceNum, setInsuranceNum] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [todayDate, setTodatDate] = useState(new Date());
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    if (insuranceNum.length > 0) {
      if (insuranceExpiry.length > 0) {
        if (
          moment().format('DD') + '/' + todayDate.getFullYear() ===
          insuranceExpiry
        ) {
          ToastAndroid.showWithGravityAndOffset(
            'Expiry date should not be todays date',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            10,
            60,
          );
        } else {
          database()
            .ref('users/' + signUpKey + '/insuranceInformation')
            .push({
              LicenseNumber: insuranceNum,
              LicenseExpiry: insuranceExpiry,
            })
            .then(() => {
              navigation.navigate('InsuranceFormB');
            })
            .catch(error => {
              alert('Something went wrong' + error);
            });
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

  const handleChange3 = e => {
    const result = e.replace(/(\d{2})(\d{4})/, '$1/$2');
    setInsuranceExpiry(result);
  };

  const inputsList = () => {
    return (
      <View style={{}}>
        <Text style={style.headerTxt}>{Constraints.INSURANCE_PHOTO_TXT}</Text>
        <View style={[style.inputParent, {marginTop: '7%'}]}>
          <View style={[style.passwordContainer, {width: '55%'}]}>
            <TextInput
              maxLength={10}
              keyboardType="number-pad"
              style={[style.TiName, {width: '100%'}]}
              value={insuranceNum}
              onChangeText={e => {
                setInsuranceNum(e);
              }}
              placeholder={'Numéro d’assurance'}
            />
          </View>

          <View style={[style.passwordContainer, {width: '40%'}]}>
            <TextInput
              style={[style.TiName, {width: '80%'}]}
              maxLength={7}
              keyboardType="number-pad"
              value={insuranceExpiry}
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
          <Text style={style.photoTxt}>
            {Constraints.UPLOAD_iNSURANCE_PHOTO_TXT1}
          </Text>
          <Text style={style.photoTxt}>
            {Constraints.UPLOAD_iNSURANCE_PHOTO_TXT2}
          </Text>
        </Pressable>
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
      <BottomBtns uploadToDatabase={uploadToDatabase} navigation={navigation} />
    </SafeAreaView>
  );
};
export default InsuranceFormA;
