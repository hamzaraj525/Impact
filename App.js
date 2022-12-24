import React from 'react';
import {SafeAreaView} from 'react-native';
import {ScreenNavigator} from './src/navigations/ScreenNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenNavigator />
    </SafeAreaView>
  );
};

export default App;
