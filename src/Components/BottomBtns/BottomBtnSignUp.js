import React, {useState, useRef, useEffect, useId} from 'react';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {genderBtns} from '../../DataStore/RegDocData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import database from '@react-native-firebase/database';
import {addUserid} from '../../Redux/Action/actions';

import Constraints from '../../Constraints/Constraints';

const BottomBtnSignUp = props => {
  const {width} = Dimensions.get('window');
  return (
    <View style={style.btnsContainer}>
      <TouchableOpacity
        disabled={props.loader === true ? true : false}
        onPress={() => {
          props.signUpValidation();
        }}
        style={{
          width: width,
          height: 56,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: '#1B6878',
        }}>
        {props.loader === true ? (
          <ActivityIndicator color={'white'} size="small" />
        ) : (
          <Text style={{color: '#fff', fontSize: 20}}>Continuer</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default BottomBtnSignUp;
