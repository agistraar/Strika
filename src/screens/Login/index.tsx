/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Router';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [userValue, setUserValue] = useState('');
  const [userPass, setUserPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  return (
    <KeyboardAvoidingScrollView className="bg-white">
      <SafeAreaView className="flex w-full h-screen items-center justify-center p-4">
        <Text className="text-2xl text-black font-bold">
          Selamat Datang di Strika.in!
        </Text>
        <Image
          source={require('../../image/LoginImage.png')}
          className="mb-6"
        />
        <View className="w-full flex space-y-1">
          <Text className="text-base text-black pl-4">
            Email atau Nomor Handphone
          </Text>
          <TextInput
            className="w-full border-[1px] border-gray-300 rounded-full p-2 text-black"
            onChangeText={text => setUserValue(text)}
            value={userValue}
          />
        </View>
        <View className="w-full flex space-y-1 mt-2">
          <Text className="text-base text-black pl-4">Password</Text>
          <View className="w-full flex flex-row items-center">
            <TextInput
              className="w-full border-[1px] border-gray-300 rounded-full p-2 px-5 text-black"
              secureTextEntry={hidePass}
              onChangeText={text => setUserPass(text)}
              value={userPass}
            />
            <TouchableOpacity
              className="absolute right-4"
              onPress={() => {
                setHidePass(!hidePass);
              }}>
              {!hidePass ? (
                <Image
                  source={require('../../icons/eye-close-up.png')}
                  className="h-6 w-6"
                />
              ) : (
                <Image
                  source={require('../../icons/closed-eyes.png')}
                  className="h-6 w-6"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full flex space-y-3 pt-10">
          <TouchableOpacity
            className="w-full bg-primary py-2 rounded-3xl"
            onPress={() => {
              navigation.replace('Home');
            }}>
            <Text className="text-base font-bold text-white w-full text-center">
              Masuk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full bg-white border-primary border-[1px] py-2 rounded-3xl"
            onPress={() => {
              console.log('gas');
              navigation.navigate('RegRouter');
            }}>
            <Text className="text-base font-bold text-primary w-full text-center">
              Belum punya akun? Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-black text-center mt-4 ">
          Dengan masuk atau mendaftar, anda menyetujui{' '}
          <Text className="text-primary">Ketentuan Layanan</Text> dan{' '}
          <Text className="text-primary">Kebijakan Privasi</Text> Kami.
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingScrollView>
  );
};

export default Login;
