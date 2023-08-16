/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, OrderRouter, RegRouter} from '../screens';
import ProfileRouter from '../screens/Profile/ProfileRouter';

export type RootStackParams = {
  Login: any;
  RegRouter: any;
  Home: any;
  OrderRouter: any;
  ProfileRouter: any;
};

const RootStack = createNativeStackNavigator();

const Router = () => {
  return (
    <RootStack.Navigator initialRouteName="Pages">
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="RegRouter"
        component={RegRouter}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ProfileRouter"
        component={ProfileRouter}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="OrderRouter"
        component={OrderRouter}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Router;
