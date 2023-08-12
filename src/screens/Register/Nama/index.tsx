/* eslint-disable prettier/prettier */
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {routerRegParams} from '../RegRouter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Nama = () => {
  const navigationReg =
    useNavigation<NativeStackNavigationProp<routerRegParams>>();
  const [nama, setNama] = useState('');
  return (
    <SafeAreaView className="bg-white w-full h-screen p-4 flex-col justify-between">
      <View className="w-full">
        <View className="w-full flex flex-row items-center justify-between mb-8">
          <TouchableOpacity
            onPress={() => {
              navigationReg.pop();
            }}>
            <Image source={require('../../../icons/back.png')} />
          </TouchableOpacity>
          <View className=" h-6 w-6 rounded-full bg-black items-center ju">
            <Text className="text-base text-white">?</Text>
          </View>
        </View>
        <Text className="text-xl text-black font-bold mb-2">
          Masukkan nama lengkap
        </Text>
        <View className="flex flex-row items-center w-full mb-1">
          <TextInput
            className="w-full h-10 border-[1px] border-gray-300 rounded-full p-2 px-5 text-black"
            onChangeText={text => setNama(text)}
            value={nama}
            placeholder="Nama Lengkap"
            keyboardType="email-address"
          />
        </View>
        <Text className="text-sm text-gray-300">Contoh: John Doe</Text>
      </View>
      <TouchableOpacity
        className="w-full bg-primary py-2 rounded-3xl"
        onPress={() => {
          navigationReg.push('Password');
        }}>
        <Text className="text-base font-bold text-white w-full text-center">
          Selanjutnya
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Nama;
