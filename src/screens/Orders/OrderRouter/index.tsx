/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../Detail';
import Mitra from '../Mitra';
import OrderInfo from '../OrderInfo';
import Ulasan from '../Ulasan';
import Review from '../Review';
import {RouteProp} from '@react-navigation/native';

export type routeOrderParams = {
  Detail: {
    berat: number;
    kusut: string;
    rapi: string;
    durasi: string;
    alamat: string;
  };
  Mitra: {
    berat: number;
    kusut: string;
    rapi: string;
    durasi: string;
    alamat: string;
  };
  OrderInfo: {
    id: number;
  };
  Ulasan: {
    id: number;
  };
  Review: {
    id: number;
  };
};

export type RootRouteProps<RouteName extends keyof routeOrderParams> =
  RouteProp<routeOrderParams, RouteName>;
const StackOrder = createNativeStackNavigator();

const OrderRouter = () => {
  return (
    <StackOrder.Navigator initialRouteName="Order">
      <StackOrder.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <StackOrder.Screen
        name="Mitra"
        component={Mitra}
        options={{headerShown: false}}
      />
      <StackOrder.Screen
        name="OrderInfo"
        component={OrderInfo}
        options={{headerShown: false}}
      />
      <StackOrder.Screen
        name="Ulasan"
        component={Ulasan}
        options={{headerShown: false}}
      />
      <StackOrder.Screen
        name="Review"
        component={Review}
        options={{headerShown: false}}
      />
    </StackOrder.Navigator>
  );
};

export default OrderRouter;
