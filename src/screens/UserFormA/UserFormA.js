import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import {useDispatch, useSelector} from 'react-redux';
import {genderBtns} from './../../DataStore/RegDocData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {addUserid} from './../../Redux/Action/actions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const UserFormA = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState(0);
  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  console.log('---------' + signUpKey);

  const uploadToDatabase = async () => {
    database()
      .ref('users/' + signUpKey + '/personalInformation')
      .push({
        FirstName: fName,
        lastName: lName,
        Gender: gender,
      })
      .then(() => {
        navigation.navigate('UserFormB');
        setFName('');
        setLName('');
        setGender('');
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  const changeColor = id => {
    setColor(id);
  };

  const btnFunction = item => {
    changeColor(item.key);
    setGender(item.title);
  };

  const handleChange = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setFName(result);
  };
  const handleChange2 = e => {
    const result = e.replace(/[^a-z]/gi, '');
    setLName(result);
  };

  const inputsList = () => {
    return (
      <View>
        <Text style={style.headerTxt}>Quel est votre nom complet ?</Text>
        <View style={[style.passwordContainer, {marginTop: '1%'}]}>
          <TextInput
            keyboardType="default"
            style={style.TiName}
            value={fName}
            onChangeText={e => {
              handleChange(e);
            }}
            placeholder={'Prénom'}
          />
        </View>
        <View style={[style.passwordContainer, {marginTop: '5%'}]}>
          <TextInput
            style={style.TiName}
            value={lName}
            onChangeText={e => {
              handleChange2(e);
            }}
            placeholder={'Nom'}
          />
        </View>
        <Text style={style.headerTxt}>Quel est votre genre ?</Text>
        {genderBtns.map(item => {
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => {
                btnFunction(item);
              }}
              style={
                color === item.key ? style.btnGenderBlue : style.btnGenderPink
              }>
              <Text
                style={
                  color === item.key
                    ? style.genderTxtWhite
                    : style.genderTxtGrey
                }>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
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
export default UserFormA;
