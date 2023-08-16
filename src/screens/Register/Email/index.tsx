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

const Email = () => {
  const navigationReg =
    useNavigation<NativeStackNavigationProp<routerRegParams>>();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [warning, setWarning] = useState(false);
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
          Masukkan email kamu!
        </Text>
        <View className="flex flex-row items-center w-full mb-1">
          <TextInput
            className={`w-full h-10 border-[1px] ${
              warning ? 'border-red-300' : 'border-gray-300'
            }  rounded-full p-2 px-5 text-black`}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="example@email.com"
            keyboardType="email-address"
            onEndEditing={() => {
              if (validateEmail(email)) {
                setIsValid(true);
                setWarning(false);
              } else {
                setWarning(true);
              }
            }}
          />
        </View>
        {warning ? (
          <Text className="text-small text-red-600 pl-4">
            Email Tidak Valid!
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            navigationReg.replace('Handphone');
          }}>
          <Text className="text-sm text-primary underline">
            Gunakan nomor HP
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-full bg-primary py-2 rounded-3xl"
        onPress={() => {
          if (isValid) {
            navigationReg.push('Nama', {email: email, telp: '', nama: '', pass: ''});
          }
        }}>
        <Text className="text-base font-bold text-white w-full text-center">
          Selanjutnya
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const validateEmail = (valEmail: string) => {
  return String(valEmail).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export default Email;
