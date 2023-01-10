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
  KeyboardAvoidingView,
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
import {Formik} from 'formik';
import * as Yup from 'yup';
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const SignupSchema = Yup.object().shape({
  vehiclePlateNumber: Yup.string()
    .min(7, 'Too short!')
    .max(7, 'Too Long!')
    .matches(/^[^,.-]*$/, 'No period')
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, 'No symbols')
    .matches(/^[A-Za-z0-9]{3} [A-Za-z0-9]{3}$/, 'Format must be xxx xxx.')
    .required('Required'),
  vehicleRegCertiNumber: Yup.string()
    .min(12, 'Too short!')
    .max(12, 'Too Long!')
    .matches(/^[^,.-]*$/, 'No period')
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, 'No symbols')
    .matches(/^\S+$/, 'No Space allowed')
    .matches((/[^0-9]/g, ''), 'Invalid format.')
    .required('Required'),
});

const VehicleFormB = ({route, navigation}) => {
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);
  const [loader, setLoader] = useState(false);
  const uploadToDatabase = async e => {
    setLoader(true);
    database()
      .ref('users/' + signUpKey + '/vehicleInformation')
      .push({
        vehiclePlateNumber: e.vehiclePlateNumber,
        vehicleRegCertiNumber: e.vehicleRegCertiNumber,
      })
      .then(() => {
        setLoader(false);
        navigation.navigate('VehicleFormC');
      })
      .catch(error => {
        setLoader(false);
        alert('Something went wrong' + error);
      });
  };

  return (
    <Formik
      initialValues={{
        vehiclePlateNumber: '',
        vehicleRegCertiNumber: '',
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
            <Text style={style.stepTxt}>Étape 2 de 4</Text>
            <View style={style.topBar} />
          </View>
          <ScrollView contentContainerStyle={{padding: '4%'}}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <View>
                <Text style={style.headerTxt}>
                  {Constraints.VEHICLE_PLATE_NUMBER}
                </Text>

                <View style={[style.passwordContainer, {marginTop: '3%'}]}>
                  <TextInput
                    style={style.TiName}
                    value={values.vehiclePlateNumber}
                    onChangeText={handleChange('vehiclePlateNumber')}
                    onBlur={() => setFieldTouched('vehiclePlateNumber')}
                    placeholder={'Numéro de plaque'}
                  />
                  <Text
                    style={{
                      color:
                        values.vehiclePlateNumber.length > 0 ? 'black' : 'grey',
                    }}>
                    {values.vehiclePlateNumber.length}/7
                  </Text>
                </View>
                {errors.vehiclePlateNumber && touched.vehiclePlateNumber && (
                  <Text style={style.errTxt}>{errors.vehiclePlateNumber}</Text>
                )}

                <Text style={style.headerTxt}>
                  {Constraints.VEHICLE_REG_CERTIFICATION_NUMBER}
                </Text>

                <View style={[style.passwordContainer, {marginTop: '3%'}]}>
                  <TextInput
                    keyboardType="number-pad"
                    style={style.TiName}
                    value={values.vehicleRegCertiNumber}
                    onChangeText={handleChange('vehicleRegCertiNumber')}
                    onBlur={() => setFieldTouched('vehicleRegCertiNumber')}
                    placeholder={'Numéro du certificat d’immatriculation'}
                  />

                  <Text
                    style={{
                      color:
                        values.vehicleRegCertiNumber.length > 0
                          ? 'black'
                          : 'grey',
                    }}>
                    {values.vehicleRegCertiNumber.length}/12
                  </Text>
                </View>
                {errors.vehicleRegCertiNumber &&
                  touched.vehicleRegCertiNumber && (
                    <Text style={style.errTxt}>
                      {errors.vehicleRegCertiNumber}
                    </Text>
                  )}
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
export default VehicleFormB;
