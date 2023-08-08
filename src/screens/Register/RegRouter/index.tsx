/* eslint-disable prettier/prettier */
import React from 'react';
import Handphone from '../Handphone';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type routerRegParams = {
  Handphone: any;
};

const RegRouter = () => {
  const StackReg = createNativeStackNavigator();
  return (
    <StackReg.Navigator initialRouteName="Register">
      <StackReg.Screen
        name="Handphone"
        component={Handphone}
        options={{headerShown: false}}
      />
    </StackReg.Navigator>
  );
};

export default RegRouter;
