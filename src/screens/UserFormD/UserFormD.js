import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import {useDispatch, useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import database from '@react-native-firebase/database';
import Constraints from '../../Constraints/Constraints';
import {userPersoanlVerify} from './../../Redux/Action/actions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
const todatDate = moment().year();

const SignupSchema = Yup.object().shape({
  licenseNum: Yup.string()
    .min(12, 'numero de permis Too short!')
    .max(12, 'numero de permis Too Long!')
    .matches(/^[^,.-]*$/, 'numero de permis No period')
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, 'numero de permis No symbols allowed')
    .matches(/^\S+$/, 'numero de permis No Space allowed')
    .matches(/^[A-Za-z0-9]{12}$/, 'numero de permis Invalid format.')
    .required('numero de permis Required'),

  licenseExpiry: Yup.string()
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
        console.log('-----' + val[1], date);

        if (val[1] > date) {
          return true;
        }
      } else {
      }
    })
    .required('expiration Required'),
});

const UserFormD = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const updateUserVerify = () => {
    setLoader(true);
    database()
      .ref('users/' + signUpKey)
      .update({
        personDetailsVerified: true,
      })
      .then(() => {
        setLoader(false);
        dispatch(userPersoanlVerify(true));
        navigation.navigate('DocRegistration');
        console.log('persoanl Verify updated.');
      });
  };

  const uploadToDatabase = async e => {
    setLoader(true);
    database()
      .ref('users/' + signUpKey + '/personalInformation')
      .push({
        LicenseNumber: e.licenseNum,
        LicenseExpiry: e.licenseExpiry,
      })
      .then(() => {
        setLoader(false);
        updateUserVerify();
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  return (
    <Formik
      initialValues={{
        licenseNum: '',
        licenseExpiry: '',
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
            <Text style={style.stepTxt}>Étape 4 de 4</Text>
            <View style={style.topBar} />
          </View>
          <ScrollView contentContainerStyle={{padding: '4%'}}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <View style={{}}>
                <Text style={style.headerTxt}>
                  {Constraints.DRIVER_LICENSE_TXT}
                </Text>
                <View style={[style.inputParent, {marginTop: '7%'}]}>
                  <View
                    style={{
                      width: '60%',
                    }}>
                    <View
                      style={[
                        style.passwordContainer,
                        {paddingHorizontal: '3%', width: '100%'},
                      ]}>
                      <TextInput
                        style={[style.TiName, {width: '70%'}]}
                        value={values.licenseNum}
                        onChangeText={handleChange('licenseNum')}
                        onBlur={() => setFieldTouched('licenseNum')}
                        placeholder={'Numéro de permis'}
                      />
                      <Text
                        style={{
                          color:
                            values.licenseNum.length > 0 ? 'black' : 'grey',
                        }}>
                        {values.licenseNum.length}/12
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '35%',
                    }}>
                    <View
                      style={[
                        style.passwordContainer,
                        {paddingHorizontal: '3%', width: '100%'},
                      ]}>
                      <TextInput
                        style={[style.TiName, {width: '100%'}]}
                        value={values.licenseExpiry}
                        onChangeText={handleChange('licenseExpiry')}
                        onBlur={() => setFieldTouched('licenseExpiry')}
                        placeholder={'Expiration'}
                      />
                    </View>
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
                  {errors.licenseNum && touched.licenseNum && (
                    <Text style={[style.errTxt, {alignSelf: 'flex-start'}]}>
                      {errors.licenseNum}
                    </Text>
                  )}
                  {errors.licenseExpiry && touched.licenseExpiry && (
                    <Text style={[style.errTxt, {alignSelf: 'flex-end'}]}>
                      {errors.licenseExpiry}
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
                    {Constraints.UPLOAD_PHOTO_TXT1}
                  </Text>
                  <Text style={style.photoTxt}>
                    {Constraints.UPLOAD_PHOTO_TXT2}
                  </Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <BottomBtns
            disabled={!isValid}
            loader={loader}
            uploadToDatabase={handleSubmit}
            navigation={navigation}
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};
export default UserFormD;
