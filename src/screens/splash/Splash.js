import React,{Component} from 'react';
import {View,Text,Image,Platform,StatusBar,PermissionsAndroid,TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
  } from 'react-native-responsive-screen';

class Splash extends Component {
    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.replace('Intro1')
        }, 3000);
    }
    render(){
        return(
            <View style={{
                flex:1,
                alignItems:'center',
                backgroundColor:'#353535',
            }}>
                <Image
                source={require('../../assets/logo.png')}
                style={{
                    height:h('20%'),
                    width:'80%',
                    resizeMode:'contain',
                    marginTop:h('22%')
                }}/>
                <View style={{
                    height:h('10%'),
                    width:'90%',
                    // backgroundColor:'#ada',
                    marginTop:h('50%'),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Présenté par </Text>
                    <Text style={{color:'#1B6878',fontWeight:'bold'}}>Winlogistikdevelopment</Text>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>, les</Text>
                    </View>
                    <Text style={{color:'#fff',fontWeight:'bold'}}> experts en applications mobile au Québec</Text>
                </View>
            </View>
        );
    }
};

export default Splash;