import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './../Redux/Store/store';
import DocRegistration from '../screens/DocRegistration/DocRegistration';
import UserFormA from '../screens/UserFormA/UserFormA';
import UserFormB from '../screens/UserFormB/UserFormB';
import UserFormC from '../screens/UserFormC/UserFormC';
import UserFormD from '../screens/UserFormD/UserFormD';
import InsuranceFormA from '../screens/InsuranceFormA/InsuranceFormA';
import InsuranceFormB from '../screens/InsuranceFormB/InsuranceFormB';
import InsuranceFormC from '../screens/InsuranceFormC/InsuranceFormC';
import InsuranceFormD from '../screens/InsuranceFormD/InsuranceFormD';
import VehicleFormA from '../screens/VehicleFormA/VehicleFormA';
import VehicleFormB from '../screens/VehicleFormB/VehicleFormB';
import VehicleFormC from '../screens/VehicleFormC/VehicleFormC';
import VehicleFormD from '../screens/VehicleFormD/VehicleFormD';
import Splash from '../screens/splash/Splash';
import SignUp from '../screens/signup/SignUp';
import Login from '../screens/login/Login';
import Intro1 from '../screens/intro/Intro1';
import Intro2 from '../screens/intro/Intro2';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';

const Stack = createNativeStackNavigator();

export const ScreenNavigator = () => {
  const UserForm1Stack = () => (
    <Stack.Navigator
      initialRouteName="UserForm1Stack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="UserFormA"
        component={UserFormA}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="UserFormB"
        component={UserFormB}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="UserFormC"
        component={UserFormC}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="UserFormD"
        component={UserFormD}
      />
    </Stack.Navigator>
  );

  const InsuranceForm1Stack = () => (
    <Stack.Navigator
      initialRouteName="InsuranceForm1Stack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="InsuranceFormA"
        component={InsuranceFormA}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="InsuranceFormB"
        component={InsuranceFormB}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="InsuranceFormC"
        component={InsuranceFormC}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="InsuranceFormD"
        component={InsuranceFormD}
      />
    </Stack.Navigator>
  );
  const VehicleForm1Stack = () => (
    <Stack.Navigator
      initialRouteName="VehicleForm1Stack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="VehicleFormA"
        component={VehicleFormA}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="VehicleFormB"
        component={VehicleFormB}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="VehicleFormC"
        component={VehicleFormC}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="VehicleFormD"
        component={VehicleFormD}
      />
    </Stack.Navigator>
  );

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Intro2"
                component={Intro2}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Intro1"
                component={Intro1}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DocRegistration"
                component={DocRegistration}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UserForm1Stack"
                component={UserForm1Stack}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="InsuranceForm1Stack"
                component={InsuranceForm1Stack}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VehicleForm1Stack"
                component={VehicleForm1Stack}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};
