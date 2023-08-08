/* eslint-disable prettier/prettier */
import {Text, SafeAreaView, View, Image} from 'react-native';
import React, {useState} from 'react';
import ReactNativePhoneInput from 'react-native-phone-input';

const Handphone = () => {
  const [phone, setPhone] = useState('');
  return (
    <SafeAreaView className="bg-white w-full h-screen p-4">
      <View className="w-full">
        <View className="w-full flex flex-row items-center justify-between">
          <Image source={require('../../../icons/back.png')} />
          <View className=" h-6 w-6 rounded-full bg-black items-center ju">
            <Text className="text-base text-white">?</Text>
          </View>
        </View>
        <View>
          <ReactNativePhoneInput
            initialValue={phone}
            initialCountry="id"
            onChangePhoneNumber={val => {
              setPhone(val);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Handphone;
