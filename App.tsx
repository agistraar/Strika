/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/// <reference types="nativewind/types" />

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
// import Home from './src/screens/Home';
import Orders from './src/screens/Orders';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Home></Home> */}
        <Orders />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
