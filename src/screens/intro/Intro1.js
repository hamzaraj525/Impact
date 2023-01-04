import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

class Intro1 extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../assets/splash.png')}
          style={{
            height: h('110%'),
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: h('40%'),
              width: '100%',
              backgroundColor: '#fff',
              borderTopLeftRadius: h('3%'),
              borderTopRightRadius: h('3%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 22,
                width: '90%',
                marginTop: h('3%'),
                fontWeight: 'bold',
              }}>
              À chaque situation compliquée, sa solution simple.
            </Text>
            <Text style={{color: '#0008', width: '90%', marginTop: h('3%')}}>
              Nous savons qu’un accident n’est pas un événement facile. C’est
              pour cette raison que l’application Impact vous aidera en vous
              guidant dans la démarche à suivre suite à un accident.
            </Text>
            <View
              style={{
                height: h('10%'),
                width: '90%',
                // backgroundColor:'#ada',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  height: h('6%'),
                  width: '44%',
                  backgroundColor: '#0001',
                  borderRadius: h('.5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{color: '#0007'}}>Passer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Intro2');
                }}
                style={{
                  height: h('6%'),
                  width: '44%',
                  backgroundColor: '#0B8BA8',
                  borderRadius: h('.5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{color: '#fff'}}>Suivant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Intro1;
