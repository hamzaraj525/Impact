import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import BottomBtnSignUp from './../../Components/BottomBtns/BottomBtnSignUp';
import CheckBox from '@react-native-community/checkbox';
var validator = require('email-validator');
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

function Login({navigation, props, route}) {
  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');

  const signInValidation = () => {
    const valid = validator.validate(email); // true
    if (email === '' || password === '') {
      alert('Enter Email and Password');
    } else if (!valid) {
      alert('Email not valid');
    } else {
      signInUser();
    }
  };

  const signInUser = async () => {
    setLoader(true);
    console.log('request send');
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
      setLoader(false);
      alert('Done');
      return {user};
    } catch (error) {
      setLoader(false);
      alert(error);

      console.log(error);
      return {
        error: error.message,
      };
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
          Bon retour sur{' '}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            marginLeft: h('2%'),
            fontWeight: 'bold',
          }}>
          l’application mobile
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
            style={{paddingLeft: h('2%'), color: '#000'}}
            placeholder={'Adresse courriel'}
            placeholderTextColor={'#0003'}
            onChangeText={email => {
              setEmail(email);
            }}
          />
        </View>
        <View
          style={{
            height: h('6.6%'),
            width: '88%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: h('2%'),
            borderRadius: h('.5%'),
            justifyContent: 'center',
          }}>
          <TextInput
            style={{paddingLeft: h('2%'), color: '#000'}}
            placeholder={'Mot de passe'}
            placeholderTextColor={'#0003'}
            secureTextEntry
            onChangeText={password => {
              setPassword(password);
            }}
          />
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: 12,
            alignSelf: 'flex-end',
            borderBottomWidth: h('.1%'),
            marginRight: h('3%'),
            marginTop: h('2%'),
          }}>
          Mot de passe oublié
        </Text>
        <View
          style={{
            height: h('10%'),
            width: '90%',
            // backgroundColor:'#ada',
            marginTop: h('28%'),
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              height: h('6.5%'),
              width: '48%',
              backgroundColor: '#fff',
              borderRadius: h('.5%'),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/google.png')}
              style={{
                height: h('3%'),
                width: '15%',
                resizeMode: 'contain',
              }}
            />
            <Text style={{color: '#000', marginLeft: h('1%')}}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: h('6.5%'),
              width: '48%',
              backgroundColor: '#fff',
              borderRadius: h('.5%'),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/facebook.png')}
              style={{
                height: h('3%'),
                width: '15%',
                resizeMode: 'contain',
              }}
            />
            <Text style={{color: '#000', marginLeft: h('1%')}}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBtnSignUp
        loader={loader}
        navigation={navigation}
        signUpValidation={signInValidation}
      />
    </View>
  );
}

export default Login;
