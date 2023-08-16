/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Edit from '../Edit';
import Main from '../Main';
import Password from '../Password';

export type routerProfParams = {
  Main: any;
  Edit: {email: string; telp: string; nama: string; alamat: string};
  Password: any;
};

export type RootRouteProps<RouteName extends keyof routerProfParams> =
  RouteProp<routerProfParams, RouteName>;

const ProfileRouter = () => {
  const StackProf = createNativeStackNavigator();
  return (
    <StackProf.Navigator initialRouteName="proStack">
      <StackProf.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <StackProf.Screen
        name="Edit"
        component={Edit}
        options={{headerShown: false}}
      />
      <StackProf.Screen
        name="Password"
        component={Password}
        options={{headerShown: false}}
      />
    </StackProf.Navigator>
  );
};

export default ProfileRouter;
