/* eslint-disable prettier/prettier */
import React from 'react';
import Handphone from '../Handphone';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Email from '../Email';
import Nama from '../Nama';
import Password from '../Password';
import {RouteProp} from '@react-navigation/native';

export type routerRegParams = {
  Handphone: any;
  Email: any;
  Nama:  {email: string; nama: string; telp: string; pass: string};
  Password: {email: string; nama: string; telp: string; pass: string};
};

export type RootRouteProps<RouteName extends keyof routerRegParams> = RouteProp<
  routerRegParams,
  RouteName
>;

const RegRouter = () => {
  const StackReg = createNativeStackNavigator();
  return (
    <StackReg.Navigator initialRouteName="Register">
      <StackReg.Screen
        name="Handphone"
        component={Handphone}
        options={{headerShown: false}}
      />
      <StackReg.Screen
        name="Email"
        component={Email}
        options={{headerShown: false}}
      />
      <StackReg.Screen
        name="Nama"
        component={Nama}
        options={{headerShown: false}}
      />
      <StackReg.Screen
        name="Password"
        component={Password}
        options={{headerShown: false}}
      />
    </StackReg.Navigator>
  );
};

export default RegRouter;
