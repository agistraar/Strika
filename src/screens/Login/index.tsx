/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Router';
import {useGlobalContext} from '../../context/context';
import Toast from 'react-native-toast-message';

type modalParams = {
  visible: boolean;
};

const Login = () => {
  const {setUserId} = useGlobalContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [userValue, setUserValue] = useState('');
  const [userPass, setUserPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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
            className="w-full border-[1px] border-gray-300 rounded-full p-2 px-5 text-black"
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
              if (userValue !== '' && userPass !== '') {
                setModalVisible(true);
                const data = {
                  user: userValue,
                  pass: userPass,
                };
                try {
                  fetch('http://10.0.2.2:4000/pelanggan/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  })
                    .then(response => response.json())
                    .then(json => {
                      if (json.code === 200) {
                        setUserId(json.data);
                        navigation.replace('Home');
                        setModalVisible(false);
                      } else if (json.code === 404) {
                        setModalVisible(false);
                        failedToast();
                      }
                    });
                } catch (err) {
                  setModalVisible(false);
                  failedToast();
                }
              } else {
                emptyToast();
              }
            }}>
            <Text className="text-base font-bold text-white w-full text-center">
              Masuk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full bg-white border-primary border-[1px] py-2 rounded-3xl"
            onPress={() => {
              navigation.navigate('RegRouter', {
                screen: 'Handphone',
              });
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
        <AccountModal visible={modalVisible} />
      </SafeAreaView>
      <Toast position="top" topOffset={20} />
    </KeyboardAvoidingScrollView>
  );
};

const AccountModal = ({visible}: modalParams) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View className="h-screen w-full bg-white items-center justify-center">
        <Image source={require('../../image/ayaka.png')} />
        <Text className="text-lg text-black font-bold w-2/3 text-center mt-4">
          Mohon tunggu sebentar untuk melakukan validasi akun anda
        </Text>
      </View>
    </Modal>
  );
};

const failedToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Login Gagal',
    text2: 'Periksa Username atau Password Anda',
    autoHide: true,
    visibilityTime: 3000,
  });
};

const emptyToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Data tidak lengkap',
    text2: 'Mohon isi Username atau Password Anda',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default Login;
