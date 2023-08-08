/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login} from '../screens';
import OrderRouter from '../screens/Orders/OrderRouter';
import RegRouter from '../screens/Register/RegRouter';

export type RootStackParams = {
  Login: any;
  RegRouter: any;
  Home: any;
  OrderRouter: any;
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
        name="OrderRouter"
        component={OrderRouter}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Router;
