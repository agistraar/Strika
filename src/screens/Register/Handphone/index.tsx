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

const Handphone = () => {
  const navigationReg =
    useNavigation<NativeStackNavigationProp<routerRegParams>>();
  const [phone, setPhone] = useState('');
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
          Masukkan nomor HP kamu!
        </Text>
        <View className="flex flex-row items-center w-full mb-1">
          <View className="w-3/12 bg-gray-200 border-[1px] border-r-0 border-gray-300 rounded-l-full h-10 items-center justify-center px-2 flex-row space-x-2">
            <Image source={require('../../../image/indo.png')} />
            <Text className="text-base text-black">+62</Text>
          </View>
          <TextInput
            className={`w-9/12 h-10 border-[1px] ${
              warning ? 'border-red-300' : 'border-gray-300'
            }  rounded-r-full p-2 px-5 text-black`}
            onChangeText={text => {
              if (text[0] !== '0') {
                setPhone(text);
              }
            }}
            value={phone}
            maxLength={14}
            placeholder="81234567890"
            keyboardType="phone-pad"
            onEndEditing={() => {
              if (phone.length >= 9) {
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
            Nomor HP Tidak Valid!
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            navigationReg.replace('Email');
          }}>
          <Text className="text-sm text-primary underline">Gunakan email</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-full bg-primary py-2 rounded-3xl"
        onPress={async () => {
          if (isValid) {
            const dataPhone = await getPhone(phone);
            navigationReg.push('Nama', {
              email: '',
              telp: dataPhone,
              nama: '',
              pass: '',
            });
          }
        }}>
        <Text className="text-base font-bold text-white w-full text-center">
          Selanjutnya
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getPhone = (phone: string) => {
  phone = '0' + phone;
  return phone;
};

export default Handphone;
