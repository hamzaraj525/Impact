import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  passwordContainer: {
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'grey',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    padding: 12,
    width: '100%',
    height: 60,
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputParent: {
    flexDirection: 'row',

    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TiName: {
    width: '100%',
    height: 60,
    marginLeft: 6,
  },
  subTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  subText: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 12,
  },
  parentContainers: {
    marginBottom: '6%',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'pink',
    height: 76,
  },

  subImg: {
    width: 22,
    height: 22,
  },
  naemTxt: {
    paddingHorizontal: '5%',
    fontSize: 29,
    color: 'black',
    fontWeight: '700',
    marginTop: 30,
  },
  headerTxt: {
    marginTop: '12%',
    fontSize: 26,
    color: 'black',
    fontWeight: '700',
    marginBottom: '11%',
  },
  subMitTxt: {
    paddingHorizontal: '9%',
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
    paddingBottom: 5,
  },
  headerSubTitle: {
    paddingHorizontal: '9%',
    fontSize: 15,
    color: 'grey',
    marginTop: 5,
    paddingBottom: 5,
  },
  loginBtn: {
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height / 5,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  btnsContainer: {
    position: 'absolute',
    width: width,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
  },
  bottomBtn1: {
    width: '30%',
    height: 56,
    backgroundColor: '#19363C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBtn2: {
    width: '70%',
    height: 56,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGenderPink: {
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'grey',
    width: '100%',
    marginBottom: '5%',
    height: 56,
    backgroundColor: '#F6F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGenderBlue: {
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'grey',
    width: '100%',
    marginBottom: '5%',
    height: 56,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderTxtGrey: {fontSize: 16, color: 'grey'},
  genderTxtWhite: {fontSize: 16, color: 'white'},
  picker: {
    backgroundColor: 'pink',
    borderRadius: 54,
    borderWidth: 0.2,
    borderColor: 'grey',
    width: '55%',
  },
  topBar: {
    width: '75%',
    height: 4.5,
    backgroundColor: '#CF8C58',
    marginTop: '5%',
  },
  stepTxt: {color: 'grey', alignSelf: 'center', marginTop: '12%'},
  errTxt: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: '2%',
  },
});
