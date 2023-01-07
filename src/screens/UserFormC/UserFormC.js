import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
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
import {countries, provinces} from './../../DataStore/RegDocData';
import {Formik} from 'formik';
import * as Yup from 'yup';
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .min(10, 'Too short!')
    .max(10, 'Too Long!')
    .matches(/^[^,.-]*$/, 'No period')
    .matches(/^[^!@#$%^&*=<>:;|~]*$/, 'No symbols')
    .matches(/^[0-9]{10}$/, 'Invalid format.')
    .required('Required'),
  address: Yup.string().max(100, 'Too Long!').required('Required'),
  city: Yup.string().max(30, 'Too Long!').required('Required'),
  zipCode: Yup.string()
    .min(7, 'Code postale Too short!')
    .max(7, 'Code postale Too Long!')
    .matches(/^[^,.-]*$/, 'No period')
    .matches(/^[^!@#$%^&*=<>:;|~]*$/, 'No symbols')
    .matches(/^[A-Za-z0-9]{3} [A-Za-z0-9]{3}$/, 'Invalid format.')
    .required('Required'),
  selectedCountry: Yup.string().required('Required'),
  selectedProvince: Yup.string().required('Required'),
});

const UserFormC = ({route, navigation}) => {
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async e => {
    database()
      .ref('users/' + signUpKey + '/personalInformation')
      .push({
        phoneNumber: e.phone,
        address: e.address,
        city: e.city,
        zipCode: e.zipCode,
        country: e.selectedCountry,
        province: e.selectedProvince,
      })
      .then(() => {
        navigation.navigate('UserFormD');
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  const handleChange3 = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setCity(result);
  };

  return (
    <Formik
      initialValues={{
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        selectedCountry: 'Canada',
        selectedProvince: 'Québec',
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
            <Text style={style.stepTxt}>Étape 3 de 4</Text>
            <View style={style.topBar} />
          </View>
          <ScrollView contentContainerStyle={{padding: '4%'}}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <View>
                <Text style={style.headerTxt}>
                  {Constraints.ENTER_PHONE_NUMBER}
                </Text>

                <View style={[style.passwordContainer, {marginTop: '3%'}]}>
                  <TextInput
                    style={style.TiName}
                    placeholder={'Numéro de téléphone'}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone')}
                  />
                </View>
                {errors.phone && touched.phone && (
                  <Text style={style.errTxt}>{errors.phone}</Text>
                )}
                <Text style={style.headerTxt}>{Constraints.HOME_ADDRESS}</Text>
                <View style={[style.passwordContainer, {marginTop: '3%'}]}>
                  <TextInput
                    maxLength={100}
                    style={style.TiName}
                    placeholder={'Numéro et rue de l’adresse'}
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={() => setFieldTouched('address')}
                  />
                </View>
                {errors.address && touched.address && (
                  <Text style={style.errTxt}>{errors.address}</Text>
                )}

                <View style={[style.inputParent, {marginTop: '7%'}]}>
                  <View style={[style.passwordContainer, {width: '55%'}]}>
                    <TextInput
                      style={[style.TiName, {width: '55%'}]}
                      placeholder={'Ville'}
                      value={values.city}
                      onChangeText={handleChange('city')}
                      onBlur={() => setFieldTouched('city')}
                    />
                  </View>
                  {errors.city && touched.city && (
                    <Text style={style.errTxt}>{errors.city}</Text>
                  )}

                  <View style={[style.passwordContainer, {width: '40%'}]}>
                    <TextInput
                      style={[style.TiName, {width: '80%'}]}
                      value={values.zipCode}
                      onChangeText={handleChange('zipCode')}
                      onBlur={() => setFieldTouched('zipCode')}
                      placeholder={'Code postale'}
                    />
                  </View>
                </View>
                {errors.zipCode && touched.zipCode && (
                  <Text
                    style={[
                      style.errTxt,
                      {alignSelf: 'center', width: '100%'},
                    ]}>
                    {errors.zipCode}
                  </Text>
                )}
                <View style={[style.inputParent, {marginTop: '7%'}]}>
                  <Picker
                    mode="dropdown"
                    style={[
                      style.picker,
                      {backgroundColor: '#F6F3F5', width: '55%'},
                    ]}
                    selectedValue={values.selectedCountry}
                    onValueChange={handleChange('selectedCountry')}>
                    {countries.map(item => {
                      return (
                        <Picker.Item
                          label={item.country.toString()}
                          value={item.country.toString()}
                          key={item.id.toString()}
                        />
                      );
                    })}
                  </Picker>
                  <Picker
                    mode="dropdown"
                    style={[
                      style.picker,
                      {backgroundColor: '#F6F3F5', width: '40%'},
                    ]}
                    selectedValue={values.selectedProvince}
                    onValueChange={handleChange('selectedProvince')}>
                    {provinces.map(item => {
                      return (
                        <Picker.Item
                          label={item.province.toString()}
                          value={item.province.toString()}
                          key={item.id.toString()}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <BottomBtns
            disabled={!isValid}
            uploadToDatabase={handleSubmit}
            navigation={navigation}
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};
export default UserFormC;
