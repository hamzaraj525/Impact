import React from 'react';
import {SafeAreaView, LogBox} from 'react-native';
import {ScreenNavigator} from './src/navigations/ScreenNavigator';
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenNavigator />
    </SafeAreaView>
  );
};

export default App;
