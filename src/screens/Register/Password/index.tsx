/* eslint-disable prettier/prettier */
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, routerRegParams} from '../RegRouter';
import {RootStackParams} from '../../../Router';

type modalParams = {
  visible: boolean;
};

const Password = () => {
  const navigationReg =
    useNavigation<NativeStackNavigationProp<routerRegParams>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RootRouteProps<'Password'>>();
  const dataEmail = route.params.email;
  const dataTelp = route.params.telp;
  const dataNama = route.params.nama;
  const [pass, setPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [passConf, setPassConf] = useState('');
  const [hidePassConf, setHidePassConf] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [warning, setWarning] = useState(false);
  const [warningConf, setWarningConf] = useState(false);
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
        <View className="w-full">
          <Text className="text-xl text-black font-bold mb-2">
            Buat Password
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
                onEndEditing={() => {
                  if (
                    !String(pass).match(
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    )
                  ) {
                    setWarning(true);
                  } else {
                    setWarning(false);
                  }
                }}
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
          {warning ? (
            <Text className="text-small text-red-600 pl-4">
              Password harus terdiri dari minimal 6 karakter, sebuah simbol,
              huruf kecil, dan huruf besar!
            </Text>
          ) : null}
        </View>
        <View className="w-full mt-4">
          <Text className="text-xl text-black font-bold mb-2">
            Konfirmasi Password
          </Text>
          <View className="flex flex-row items-center w-full mb-1">
            <View className="w-full flex flex-row items-center">
              <TextInput
                className={`w-full h-10 border-[1px] ${
                  warning ? 'border-red-300' : 'border-gray-300'
                }  rounded-full p-2 px-5 text-black`}
                secureTextEntry={hidePassConf}
                onChangeText={text => setPassConf(text)}
                value={passConf}
                onEndEditing={() => {
                  if (passConf !== pass) {
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
          if (pass.length >= 6 && passConf === pass) {
            setModalVisible(true);
            const data = {
              email: dataEmail,
              telp: dataTelp,
              nama: dataNama,
              pass: pass,
              alamat: '',
            };
            try {
              fetch('http://10.0.2.2:4000/pelanggan', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then(response => response.json())
                .then(() => {
                  navigationReg.reset({
                    index: 0,
                    routes: [{name: 'Handphone'}],
                  });
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
                  setModalVisible(false);
                });
            } catch (err) {
              console.log(err);
            }
            // setTimeout(() => {
            //   navigationReg.popToTop();
            //   navigation.popToTop();
            //   setModalVisible(false);
            // }, 5000);
          }
        }}>
        <Text className="text-base font-bold text-white w-full text-center">
          Buat Akun
        </Text>
      </TouchableOpacity>
      <AccountModal visible={modalVisible} />
    </SafeAreaView>
  );
};

const AccountModal = ({visible}: modalParams) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View className="h-screen w-full bg-white items-center justify-center">
        <Image source={require('../../../image/ayaka.png')} />
        <Text className="text-lg text-black font-bold w-2/3 text-center mt-4">
          Mohon tunggu sebentar akunmu sedang diproses
        </Text>
      </View>
    </Modal>
  );
};

export default Password;
