import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import { useDispatch, useSelector } from "react-redux";

const BottomBtnReg = (props) => {
  const {
    userId,
    signUpKey,
    userPersonalDetailsVerify,
    vehicleDetailsVerify,
    insuranceDetailsVerify,
  } = useSelector((reducers) => reducers.regReducer);

  return (
    <View style={style.btnsContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={style.bottomBtn1}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Annuler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={
          userPersonalDetailsVerify === true &&
          vehicleDetailsVerify === true &&
          insuranceDetailsVerify === true
            ? false
            : true
        }
        onPress={() => {
          alert("Welcome To Main Screen");
        }}
        style={[
          style.bottomBtn2,
          {
            backgroundColor:
              userPersonalDetailsVerify === true &&
              vehicleDetailsVerify === true &&
              insuranceDetailsVerify === true
                ? "#1B6878"
                : "#8DB3BB",
          },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>M’inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BottomBtnReg;
