import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  Text,
  Dimensions,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {genderBtns} from '../../DataStore/RegDocData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {addUserid} from '../../Redux/Action/actions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Constraints from '../../Constraints/Constraints';

const UserFormB = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const {userId, signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    database()
      .ref('users/' + signUpKey + '/personalInformation')
      .push({
        DateOfBirth:
          date.getDate() +
          ' / ' +
          (date.getMonth() + 1) +
          ' / ' +
          date.getFullYear(),
      })
      .then(() => {
        navigation.navigate('UserFormC');
      })
      .catch(error => {
        alert('Something went wrong' + error);
      });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const inputsList = () => {
    return (
      <>
        <View style={{}}>
          <Text style={style.headerTxt}>{Constraints.BIRTHDAY}</Text>

          <Pressable
            onPress={() => {
              showDatepicker();
            }}
            style={[style.passwordContainer, {marginTop: '3%'}]}>
            <Text>{date.getDate()}</Text>
            <View style={{backgroundColor: 'pink', height: 60, width: 0.5}} />
            <Text>{date.getMonth() + 1}</Text>
            <View style={{backgroundColor: 'pink', height: 60, width: 0.5}} />
            <Text> {date.getFullYear()}</Text>
          </Pressable>
        </View>
        {show && (
          <DateTimePicker
            style={{
              marginTop: '2%',
            }}
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{padding: '4%'}}>
        <Text style={style.stepTxt}>Étape 2 de 4</Text>
        <View style={style.topBar} />
      </View>
      <ScrollView contentContainerStyle={{padding: '4%'}}>
        {inputsList()}
      </ScrollView>
      <BottomBtns uploadToDatabase={uploadToDatabase} navigation={navigation} />
    </SafeAreaView>
  );
};
export default UserFormB;
