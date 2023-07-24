/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/// <reference types="nativewind/types" />

import React, {useState} from 'react';
// import Tes from './screens/Tes';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

function App(): JSX.Element {
  const [splash, setSplash] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 4800);
  return (
    <NavigationContainer>
      <GestureHandlerRootView className="flex-1 w-full h-full">
        {splash ? <Splash /> : <Router />}
      </GestureHandlerRootView>
    </NavigationContainer>
    // <View>
    //   <Tes />
    // </View>
  );
}

const Splash = () => {
  return (
    <View className="w-full h-full flex justify-center items-center bg-white">
      <Lottie
        source={require('./data/splash.json')}
        autoPlay
        loop={true}
        resizeMode="cover"
      />
    </View>
  );
};

export default App;
