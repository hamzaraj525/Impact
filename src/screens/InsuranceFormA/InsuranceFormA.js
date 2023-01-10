import React, {useState, useRef, useEffect, useId} from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  Pressable,
  ToastAndroid,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import {useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import database from '@react-native-firebase/database';
import Constraints from '../../Constraints/Constraints';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const SignupSchema = Yup.object().shape({
  insuranceNum: Yup.string()
    .min(12, 'numero de assurance Too short!')
    .max(12, 'numero de assurance Too Long!')
    .matches(/^[^,.-]*$/, 'numero de assurance No period')
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, 'numero de assurance No symbols allowed')
    .matches(/^\S+$/, 'numero de assurance No Space allowed')
    .matches(/^[A-Za-z0-9]{12}$/, 'numero de assurance Invalid format.')
    .required('numero de assurance Required'),

  insuranceExpiry: Yup.string()
    .min(7, 'expiration Too short!')
    .max(7, 'expiration Too Long!')
    .matches(/^[^,.-]*$/, 'expiration No period allowed')
    .matches(/^[^!@#$%^&*=<>:;|~]*$/, 'expiration No symbols allowed')
    .matches(/^\S+$/, 'expiration No Space allowed')
    .matches(
      /(0[1-9]|1[0-2])\/?(([0-9]{4}|[0-9]{2})$)/,
      'expiration format must be xx/xxxx',
    )
    .test('is-valid', '${path} is not valid year', value => {
      if (value !== undefined && value.length === 7) {
        let val = value.split('/');
        let date = moment().year();
        if (val[1] > date) {
          return true;
        }
      } else {
      }
    })
    .required('expiration Required'),
});

const InsuranceFormA = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [loader, setLoader] = useState(false);
  const [todayDate, setTodatDate] = useState(new Date());
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async e => {
    setLoader(true);
    database()
      .ref('users/' + signUpKey + '/insuranceInformation')
      .push({
        InsuranceNumber: e.insuranceNum,
        InsuranceExpiry: e.insuranceExpiry,
      })
      .then(() => {
        setLoader(false);
        navigation.navigate('InsuranceFormB');
      })
      .catch(error => {
        setLoader(false);
        alert('Something went wrong' + error);
      });
  };

  return (
    <Formik
      initialValues={{
        insuranceNum: '',
        insuranceExpiry: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={e => {
        uploadToDatabase(e);
      }}>
      {({
        values,
        errors,
        touched,
        isValid,
        setFieldTouched,
        handleChange,
        handleSubmit,
      }) => (
        <SafeAreaView style={style.container}>
          <View style={{padding: '4%'}}>
            <Text style={style.stepTxt}>Étape 1 de 4</Text>
            <View style={style.topBar} />
          </View>
          <ScrollView contentContainerStyle={{padding: '4%'}}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <View style={{}}>
                <Text style={style.headerTxt}>
                  {Constraints.INSURANCE_PHOTO_TXT}
                </Text>
                <View style={[style.inputParent, {marginTop: '7%'}]}>
                  <View style={[style.passwordContainer, {width: '55%'}]}>
                    <TextInput
                      style={[style.TiName, {width: '100%'}]}
                      value={values.insuranceNum}
                      onChangeText={handleChange('insuranceNum')}
                      onBlur={() => setFieldTouched('insuranceNum')}
                      placeholder={'Numéro d’assurance'}
                    />
                  </View>

                  <View style={[style.passwordContainer, {width: '40%'}]}>
                    <TextInput
                      style={[style.TiName, {width: '80%'}]}
                      maxLength={7}
                      value={values.insuranceExpiry}
                      onChangeText={handleChange('insuranceExpiry')}
                      onBlur={() => setFieldTouched('insuranceExpiry')}
                      placeholder={'Expiration'}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '3%',
                  }}>
                  {errors.insuranceNum && touched.insuranceNum && (
                    <Text style={[style.errTxt, {alignSelf: 'flex-start'}]}>
                      {errors.insuranceNum}
                    </Text>
                  )}
                  {errors.insuranceExpiry && touched.insuranceExpiry && (
                    <Text style={[style.errTxt, {alignSelf: 'flex-end'}]}>
                      {errors.insuranceExpiry}
                    </Text>
                  )}
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
            </KeyboardAvoidingView>
          </ScrollView>
          <BottomBtns
            loader={loader}
            disabled={!isValid}
            uploadToDatabase={handleSubmit}
            navigation={navigation}
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};
export default InsuranceFormA;
