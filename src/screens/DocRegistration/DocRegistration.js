import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Images from './../../Constraints/Images';
import BottomBtnReg from './../../Components/BottomBtns/BottomBtnReg';
import database from '@react-native-firebase/database';

const DocRegistration = ({route, navigation}) => {
  const {
    userId,
    signUpKey,
    userPersonalDetailsVerify,
    vehicleDetailsVerify,
    insuranceDetailsVerify,
  } = useSelector(reducers => reducers.regReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [color, setColor] = useState(null);
  const [RegDocData, setRegData] = useState([
    {
      key: '0',
      title: 'Informations personnelles',
      img: Images.img,
      img2: Images.img2,
    },
    {
      key: '1',
      title: 'Informations du véhicule',
      img: Images.img,
      img2: Images.img2,
    },
    {
      key: '2',
      title: 'Informations d’assurance',
      img: Images.img,
      img2: Images.img2,
    },
  ]);

  // const handleRow = (element, i) => {
  //   navigation.navigate("VehicleForm1Stack");
  //   setTimeout(() => {
  //     if (element.title === "Informations du véhicule") {
  //       setRegData([
  //         ...RegDocData,
  //         { title: "Informations du véhicule" },
  //         { title: "Informations d’assurance" },
  //       ]);
  //     } else {
  //     }
  //   }, 500);
  // };

  useEffect(() => {
    database()
      .ref('/users')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            key: child.key,
            userId: child.val().uid,
            personDetailsVerified: child.val().personDetailsVerified,
            vehicleDetailsVerified: child.val().vehicleDetailsVerified,
            insuranceDetailsVerified: child.val().insuranceDetailsVerified,
          });
        });
        setData(li);
      });
  }, []);

  const list = () => {
    return RegDocData.map((element, i) => {
      return (
        <Pressable
          key={i}
          onPress={() => {
            if (
              element.title === 'Informations personnelles' &&
              userPersonalDetailsVerify === false
            ) {
              navigation.navigate('UserForm1Stack');
            } else if (
              element.title === 'Informations du véhicule' &&
              vehicleDetailsVerify === false
            ) {
              navigation.navigate('VehicleForm1Stack');
            } else if (
              element.title === 'Informations d’assurance' &&
              insuranceDetailsVerify === false
            ) {
              navigation.navigate('InsuranceForm1Stack');
            }
          }}
          style={style.parentContainers}>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* {data.map((item, i) => {
              if (item.userId === userId) {
                return (
                  <View key={i}>
                    <Image
                      source={
                        index === 0 && item.pic1Verified === true
                          ? element.img2
                          : index === 1 && item.pic2Verified === true
                          ? element.img2
                          : index === 2 && item.pic3Verified === true
                          ? element.img2
                          : element.img
                      }
                      style={[style.subImg, {}]}
                    />
                  </View>
                );
              }
            })} */}

            {data.map((item, index) => {
              if (item.userId === userId) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      // handleRow(element, i);
                    }}
                    style={style.containerVerifyPic}>
                    {i === 0 && item.personDetailsVerified === true ? (
                      <View style={style.zeroTxtContainer}>
                        <FontAwesome5
                          name={'check'}
                          size={19}
                          color={'white'}
                        />
                      </View>
                    ) : i === 1 && item.vehicleDetailsVerified === true ? (
                      <View style={style.zeroTxtContainer}>
                        <FontAwesome5
                          name={'check'}
                          size={19}
                          color={'white'}
                        />
                      </View>
                    ) : i === 2 && item.insuranceDetailsVerified === true ? (
                      <View style={style.zeroTxtContainer}>
                        <FontAwesome5
                          name={'check'}
                          size={19}
                          color={'white'}
                        />
                      </View>
                    ) : (
                      <View
                        style={[
                          style.zeroTxtContainer,
                          {backgroundColor: null},
                        ]}>
                        <Text>0%</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }
            })}

            <View
              style={{
                marginLeft: 14,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Text style={style.subTxt}>{element.title}</Text>

              <Text style={style.subText}>4 minutes</Text>
            </View>
          </View>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={27}
            color={'black'}
          />
        </Pressable>
      );
    });
  };

  return (
    <View style={style.container}>
      <Text style={style.headerTxt}>
        Récolte des informations d’inscriptions
      </Text>
      <ScrollView contentContainerStyle={{padding: '4%'}}>{list()}</ScrollView>
      <BottomBtnReg navigation={navigation} />
    </View>
  );
};
export default DocRegistration;
