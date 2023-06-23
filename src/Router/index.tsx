/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Detail} from '../screens';

export type RootStackParams = {
  Home: any;
  Detail: any;
};

const RootStack = createNativeStackNavigator();

const Router = () => {
  return (
    <RootStack.Navigator initialRouteName="Pages">
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Router;
