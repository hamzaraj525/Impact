import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  View,
  Pressable,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';

import BottomBtns from './../../Components/BottomBtns/BottomBtns';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Constraints from '../../Constraints/Constraints';

const UserFormB = ({route, navigation}) => {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [todayDate, setTodatDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const {signUpKey} = useSelector(reducers => reducers.regReducer);

  const uploadToDatabase = async () => {
    if (todayDate.getFullYear() - date.getFullYear() < 18) {
      ToastAndroid.showWithGravityAndOffset(
        'Age must be 18 years old or above',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    } else {
      setLoader(true);
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
          setLoader(false);
          navigation.navigate('UserFormC');
        })
        .catch(error => {
          setLoader(false);
          alert('Something went wrong' + error);
        });
    }
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
        <Text style={style.stepTxt}>??tape 2 de 4</Text>
        <View style={style.topBar} />
      </View>
      <ScrollView contentContainerStyle={{padding: '4%'}}>
        {inputsList()}
      </ScrollView>
      <BottomBtns
        loader={loader}
        uploadToDatabase={uploadToDatabase}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default UserFormB;
