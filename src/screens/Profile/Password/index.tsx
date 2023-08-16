/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routerProfParams} from '../ProfileRouter';
import Toast from 'react-native-toast-message';
import {useGlobalContext} from '../../../context/context';

const Password = () => {
  const [pass, setPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [passNew, setPassNew] = useState('');
  const [hidePassNew, setHidePassNew] = useState(true);
  const [passConf, setPassConf] = useState('');
  const [hidePassConf, setHidePassConf] = useState(true);

  const [warning, setWarning] = useState(false);
  const [warningNew, setWarningNew] = useState(false);
  const [warningConf, setWarningConf] = useState(false);

  const profileNav =
    useNavigation<NativeStackNavigationProp<routerProfParams>>();
  const {userId} = useGlobalContext();

  return (
    <View className="bg-white w-full h-screen p-4 flex-col justify-between">
      <View className="w-full">
        <View className="w-full flex flex-row items-center justify-between mb-8">
          <TouchableOpacity
            onPress={() => {
              profileNav.pop();
            }}>
            <Image source={require('../../../icons/back.png')} />
          </TouchableOpacity>
        </View>
        <View className="w-full">
          <Text className="text-xl text-black font-bold mb-2">
            Password Lama
          </Text>
          <View className="flex flex-row items-center w-full mb-1">
            <View className="w-full flex flex-row items-center">
              <TextInput
                className={`w-full h-10 border-[1px] ${
                  warning ? 'border-red-300' : 'border-gray-300'
                }  rounded-full p-2 px-5 text-black`}
                secureTextEntry={hidePass}
                onChangeText={text => setPass(text)}
                value={pass}
              />
              <TouchableOpacity
                className="absolute right-4"
                onPress={() => {
                  setHidePass(!hidePass);
                }}>
                {!hidePass ? (
                  <Image
                    source={require('../../../icons/eye-close-up.png')}
                    className="h-6 w-6"
                  />
                ) : (
                  <Image
                    source={require('../../../icons/closed-eyes.png')}
                    className="h-6 w-6"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="w-full mt-4">
          <Text className="text-xl text-black font-bold mb-2">
            Password Baru
          </Text>
          <View className="flex flex-row items-center w-full mb-1">
            <View className="w-full flex flex-row items-center">
              <TextInput
                className={`w-full h-10 border-[1px] ${
                  warningNew ? 'border-red-300' : 'border-gray-300'
                }  rounded-full p-2 px-5 text-black`}
                secureTextEntry={hidePassNew}
                onChangeText={text => setPassNew(text)}
                value={passNew}
                onEndEditing={() => {
                  if (
                    !String(passNew).match(
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    )
                  ) {
                    setWarningNew(true);
                  } else {
                    setWarningNew(false);
                  }
                }}
              />
              <TouchableOpacity
                className="absolute right-4"
                onPress={() => {
                  setHidePassNew(!hidePassNew);
                }}>
                {!hidePassNew ? (
                  <Image
                    source={require('../../../icons/eye-close-up.png')}
                    className="h-6 w-6"
                  />
                ) : (
                  <Image
                    source={require('../../../icons/closed-eyes.png')}
                    className="h-6 w-6"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {warningNew ? (
            <Text className="text-small text-red-600 pl-4">
              Password harus terdiri dari minimal 6 karakter, sebuah simbol,
              huruf kecil, dan huruf besar!
            </Text>
          ) : null}
        </View>
        <View className="w-full mt-4">
          <Text className="text-xl text-black font-bold mb-2">
            Konfirmasi Password Baru
          </Text>
          <View className="flex flex-row items-center w-full mb-1">
            <View className="w-full flex flex-row items-center">
              <TextInput
                className={`w-full h-10 border-[1px] ${
                  warningConf ? 'border-red-300' : 'border-gray-300'
                }  rounded-full p-2 px-5 text-black`}
                secureTextEntry={hidePassConf}
                onChangeText={text => setPassConf(text)}
                value={passConf}
                onEndEditing={() => {
                  if (passConf !== passNew) {
                    setWarningConf(true);
                  } else {
                    setWarningConf(false);
                  }
                }}
              />
              <TouchableOpacity
                className="absolute right-4"
                onPress={() => {
                  setHidePassConf(!hidePassConf);
                }}>
                {!hidePassConf ? (
                  <Image
                    source={require('../../../icons/eye-close-up.png')}
                    className="h-6 w-6"
                  />
                ) : (
                  <Image
                    source={require('../../../icons/closed-eyes.png')}
                    className="h-6 w-6"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {warningConf ? (
            <Text className="text-small text-red-600 pl-4">
              Password tidak sesuai!
            </Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        className="w-full bg-primary py-2 rounded-3xl"
        onPress={() => {
          if (passConf === passNew) {
            const data = {
              oldPass: pass,
              newPass: passNew,
            };
            try {
              fetch(`http://10.0.2.2:4000/pelanggan/pass/${userId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then(response => response.json())
                .then(json => {
                  if (json.code === 200) {
                    profileNav.pop();
                  } else if (json.code === 404) {
                    console.log('error code http');
                    errorToast();
                  }
                });
            } catch (err) {
              setWarning(false);
              console.log('error try catch');
              errorToast();
            }
          }
        }}>
        <Text className="text-base font-bold text-white w-full text-center">
          Ganti Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const errorToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Ganti Password Gagal',
    text2: 'Silahkan Coba Lagi Dalam Beberapa Saat',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default Password;
