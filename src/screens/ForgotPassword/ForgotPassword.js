import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import BottomBtnSignUp from '../../Components/BottomBtns/BottomBtnSignUp';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {removeUserId} from './../../Redux/Action/actions';

function ForgotPassword({navigation, props, route}) {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');

  const forgotPasswordBtn = () => {
    if (email.length > 0) {
      setLoader(true);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setLoader(false);
          alert('Please check your email...');
        })
        .then(() => {
          navigation.navigate('Login');
        })
        .catch(function (e) {
          alert(
            'You Can Not Reset Your Passwoord Because There Is No Record Found Of This Email Adress',
            e,
          );
        });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter your Email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View
          style={{
            height: h('12%'),
            width: '100%',
            // backgroundColor:'#ada',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#000', fontSize: 18, marginLeft: h('2%')}}>
            Connexion
          </Text>
          <View
            style={{
              height: h('2.5%'),
              width: '.4%',
              marginLeft: h('1%'),
              marginBottom: h('.4%'),
              backgroundColor: '#0006',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: '#0006', fontSize: 18, marginLeft: h('1%')}}>
              Inscription
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            marginLeft: h('2%'),
            marginTop: h('3%'),
            fontWeight: 'bold',
          }}>
          réinitialisez
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            marginLeft: h('2%'),
            fontWeight: 'bold',
          }}>
          votre mot de passe
        </Text>
        <Text
          style={{
            color: '#CF8C58',
            fontSize: 30,
            marginLeft: h('2%'),
            fontWeight: 'bold',
          }}>
          Impact.
        </Text>
        <View
          style={{
            height: h('6.6%'),
            width: '88%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: h('5%'),
            borderRadius: h('.5%'),
            justifyContent: 'center',
          }}>
          <TextInput
            value={email}
            style={{paddingLeft: h('2%'), color: '#000'}}
            placeholder={'Adresse courriel'}
            placeholderTextColor={'#0003'}
            onChangeText={e => {
              setEmail(e);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            forgotPasswordBtn();
          }}
          style={{
            marginTop: '40%',
            alignSelf: 'center',
            height: h('6.5%'),
            width: '60%',
            backgroundColor: '#1B6878',
            borderRadius: h('.5%'),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text style={{color: '#fff', fontSize: 16}}>va</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      {/* <BottomBtnSignUp
        loader={loader}
        navigation={navigation}
        signUpValidation={signInValidation}
      /> */}
    </View>
  );
}

export default ForgotPassword;
