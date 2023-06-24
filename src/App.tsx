/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/// <reference types="nativewind/types" />

import React from 'react';
// import {View} from 'react-native';
// import Tes from './screens/Tes';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    // <View>
    //   <Tes />
    // </View>
  );
}

export default App;
