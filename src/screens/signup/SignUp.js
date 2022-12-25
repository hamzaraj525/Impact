import React, {useState, useEffect, useId} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
var validator = require('email-validator');
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  addUserid,
  userSignUpKey,
  userPersoanlVerify,
  vehicleVerify,
  insuranceVerify,
} from './../../Redux/Action/actions';
import BottomBtnSignUp from './../../Components/BottomBtns/BottomBtnSignUp';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '568457722616-2jghthkcn1sp2j9m013ggjr4v0tmfh52.apps.googleusercontent.com',
});
function SignUp({navigation, props, route}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');

  const SignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      ToastAndroid.showWithGravityAndOffset(
        'User Signed Out',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'error' + error,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    }
  };

  // const SignOut = async () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       ToastAndroid.showWithGravityAndOffset(
  //         'User Signed Out',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.BOTTOM,
  //         10,
  //         60,
  //       );
  //     })
  //     .catch(error => {
  //       ToastAndroid.showWithGravityAndOffset(
  //         'error' + error,
  //         ToastAndroid.SHORT,
  //         ToastAndroid.BOTTOM,
  //         10,
  //         60,
  //       );
  //     });
  // };

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
          setUser(userInfoo);
          console.log(userInfoo.user.displayName);
          uploadGoogleInDataToDatabase(userInfoo);
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
        setUser(userInfoo2);
        uploadFaceBookInDataToDatabase(userInfoo2);
      })
      .catch(error => {
        alert(error);
      });
  };

  const signUpValidation = () => {
    const valid = validator.validate(email); // true
    if (email === '' || password === '' || confirmpass === '') {
      alert('Enter Email and Password');
    } else if (!valid) {
      alert('Email not valid');
    } else if (password.length < 8) {
      alert('Password must be greater than 8 charcter');
    } else if (password !== confirmpass) {
      alert('Password not matched');
    } else {
      signUpUser();
    }
  };

  const uploadGoogleInDataToDatabase = async userInfoo => {
    setLoader(true);
    const newReference = database().ref('/users').push();
    newReference
      .set({
        key: newReference.key,
        userEmail: userInfoo.user.email,
        uid: userInfoo.user.uid,
        personDetailsVerified: false,
        vehicleDetailsVerified: false,
        insuranceDetailsVerified: false,
      })
      .then(() => {
        setLoader(false);
        navigation.navigate('DocRegistration');
        dispatch(addUserid(userInfoo.user.uid));
        dispatch(userSignUpKey(newReference.key));
        dispatch(userPersoanlVerify(false));
        dispatch(vehicleVerify(false));
        dispatch(insuranceVerify(false));
        setEmail('');
        setPassword('');
        setConfirmPass('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
        setLoader(false);
      });
  };

  const uploadFaceBookInDataToDatabase = async userInfoo2 => {
    setLoader(true);
    const newReference = database().ref('/users').push();
    newReference
      .set({
        key: newReference.key,
        userEmail: userInfoo2.user.email,
        uid: userInfoo2.user.uid,
        personDetailsVerified: false,
        vehicleDetailsVerified: false,
        insuranceDetailsVerified: false,
      })
      .then(() => {
        setLoader(false);
        navigation.navigate('DocRegistration');
        dispatch(addUserid(userInfoo2.user.uid));
        dispatch(userSignUpKey(newReference.key));
        dispatch(userPersoanlVerify(false));
        dispatch(vehicleVerify(false));
        dispatch(insuranceVerify(false));
        setEmail('');
        setPassword('');
        setConfirmPass('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
        setLoader(false);
      });
  };

  const uploadToDatabase = async emailPassswordUser => {
    setLoader(true);
    const newReference = database().ref('/users').push();
    newReference
      .set({
        key: newReference.key,
        userEmail: email,
        userPassword: password,
        uid: emailPassswordUser.user.uid,
        personDetailsVerified: false,
        vehicleDetailsVerified: false,
        insuranceDetailsVerified: false,
      })
      .then(() => {
        setLoader(false);
        navigation.navigate('DocRegistration');
        dispatch(addUserid(emailPassswordUser.user.uid));
        dispatch(userSignUpKey(newReference.key));
        dispatch(userPersoanlVerify(false));
        dispatch(vehicleVerify(false));
        dispatch(insuranceVerify(false));
        setEmail('');
        setPassword('');
        setConfirmPass('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
        setLoader(false);
      });
  };

  const signUpUser = async () => {
    setLoader(true);
    console.log('request send');
    if (isChecked === true) {
      try {
        const emailPassswordUser = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        uploadToDatabase(emailPassswordUser);
        setLoader(false);
        return {emailPassswordUser};
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
          setLoader(false);
        }
      }
    } else {
      setLoader(false);
      alert('Termes et conditions requis');
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
            Inscription
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
              navigation.navigate('Login');
            }}>
            <Text style={{color: '#0006', fontSize: 18, marginLeft: h('1%')}}>
              Connexion
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
          Bienvenue sur{' '}
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
            style={{paddingLeft: h('2%')}}
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
            style={{paddingLeft: h('2%')}}
            placeholder={'Mot de passe'}
            placeholderTextColor={'#0003'}
            secureTextEntry
            onChangeText={password => {
              setPassword(password);
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
            style={{paddingLeft: h('2%')}}
            placeholder={'Confirmer le mot de passe'}
            placeholderTextColor={'#0003'}
            secureTextEntry
            onChangeText={confirmpass => {
              setConfirmPass(confirmpass);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: h('2%'),
            marginTop: h('2%'),
            alignItems: 'center',
          }}>
          <CheckBox
            style={{margin: 8}}
            value={isChecked}
            onValueChange={isChecked => {
              setIsChecked(isChecked);
              console.log(isChecked);
            }}
            color={isChecked ? '#000' : undefined}
          />
          <Text style={{color: '#0009', fontSize: 12}}>J’accepte les </Text>
          <Text
            style={{color: '#000', fontSize: 12, borderBottomWidth: h('.1%')}}>
            conditions d’utilisations
          </Text>
          <Text style={{color: '#0009', fontSize: 12}}> du service.</Text>
        </View>
        <View
          style={{
            height: h('10%'),
            width: '90%',
            // backgroundColor:'#ada',
            marginTop: h('17%'),
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

        <TouchableOpacity
          onPress={() => {
            SignOut();
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
          <Text style={{color: '#000', marginLeft: h('1%')}}>SignOut</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomBtnSignUp
        loader={loader}
        navigation={navigation}
        signUpValidation={signUpValidation}
      />
    </View>
  );
}

export default SignUp;
