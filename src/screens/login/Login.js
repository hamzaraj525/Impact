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
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

function Login({navigation, props, route}) {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);
      user_sign_in
        .then(userInfoo => {
          setEmail(userInfoo.user.email);
          console.log('---googleSignIn User--' + userInfoo.user.displayName);
          alert('Successfull login');
        })
        .catch(error => {
          alert(error);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravityAndOffset(
          'You have Canceled the Google Sign In',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravityAndOffset(
          'Google Sign Already In progress',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravityAndOffset(
          'Play services not available or outdated',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      } else if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
        setLoader(false);
      }
    }
  };
  //  Handle user state changes
  // function onAuthStateChanged(user) {
  //   if (user) {
  //     setUser(user);
  //   } else {
  //     console.log('User Is Not There');
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(facebookCredential);
    user_sign_in
      .then(userInfoo2 => {
        setEmail('---FbSignIn----' + userInfoo2.user.email);
        alert('Successfull login');
      })
      .catch(error => {
        alert(error);
      });
  };

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
      alert('Successfull Login');
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          style={{}}>
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
        </TouchableOpacity>
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
            onPress={() => {
              onGoogleButtonPress();
            }}
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
            onPress={() => {
              onFacebookButtonPress();
            }}
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
