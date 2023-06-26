/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens';
import OrderRouter from '../screens/Orders/OrderRouter';

export type RootStackParams = {
  Home: any;
  OrderRouter: any;
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
        name="OrderRouter"
        component={OrderRouter}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Router;
