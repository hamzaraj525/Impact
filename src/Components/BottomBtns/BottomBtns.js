import React, {useState, useRef, useEffect, useId} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {genderBtns} from '../../DataStore/RegDocData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import database from '@react-native-firebase/database';
import {addUserid} from '../../Redux/Action/actions';

import Constraints from '../../Constraints/Constraints';

const BottomBtns = props => {
  return (
    <View style={style.btnsContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={style.bottomBtn1}>
        <Fontisto name={'arrow-left-l'} size={27} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={() => {
          props.uploadToDatabase();
        }}
        style={[style.bottomBtn2, {backgroundColor: '#1B6878'}]}>
        {props.loader ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={{color: '#fff', fontSize: 16}}>Continuer</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default BottomBtns;
