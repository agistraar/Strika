/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../Detail';
import Mitra from '../Mitra';
import OrderInfo from '../OrderInfo';

export type routeOrderParams = {
  Detail: any;
  Mitra: any;
  OrderInfo: any;
};
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
    </StackOrder.Navigator>
  );
};

export default OrderRouter;
