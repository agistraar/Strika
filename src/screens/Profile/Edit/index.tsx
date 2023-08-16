/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useGlobalContext} from '../../../context/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, routerProfParams} from '../ProfileRouter';

const Edit = () => {
  const {userId} = useGlobalContext();
  const route = useRoute<RootRouteProps<'Edit'>>();
  const [email, setEmail] = useState(route.params.email);
  const [warningEmail, setWarningEmail] = useState(false);

  const [phone, setPhone] = useState(route.params.telp);
  const [warningPhone, setWarningPhone] = useState(false);

  const [nama, setNama] = useState(route.params.nama);
  const [alamat, setAlamat] = useState(route.params.alamat);

  const profileNav =
    useNavigation<NativeStackNavigationProp<routerProfParams>>();
  return (
    <SafeAreaView className="bg-white w-full h-screen p-4 flex-col justify-between">
      <View className="w-full">
        <View className="w-full flex flex-row items-center justify-between mb-8">
          <TouchableOpacity
            onPress={() => {
              profileNav.pop();
            }}>
            <Image source={require('../../../icons/back.png')} />
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-black font-bold mb-2">Email</Text>
        <View className="flex flex-row items-center w-full mb-1">
          <TextInput
            className={`w-full h-10 border-[1px] ${
              warningEmail ? 'border-red-300' : 'border-gray-300'
            }  rounded-full p-2 px-5 text-black`}
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        {warningEmail ? (
          <Text className="text-small text-red-600 pl-4">
            Email Tidak Valid!
          </Text>
        ) : null}
        <Text className="text-xl text-black font-bold mb-2">
          Nomor Handphone
        </Text>
        <View className="flex flex-row items-center w-full mb-1">
          <TextInput
            className={`w-full h-10 border-[1px] ${
              warningPhone ? 'border-red-300' : 'border-gray-300'
            }  rounded-full p-2 px-5 text-black`}
            onChangeText={text => setPhone(text)}
            value={phone}
            keyboardType="phone-pad"
          />
        </View>
        {warningPhone ? (
          <Text className="text-small text-red-600 pl-4">
            Nomor HP Tidak Valid!
          </Text>
        ) : null}
        <Text className="text-xl text-black font-bold mb-2">Nama</Text>
        <View className="flex flex-row items-center w-full mb-1">
          <TextInput
            className="w-full h-10 border-[1px] border-gray-300 rounded-full p-2 px-5 text-black"
            onChangeText={text => setNama(text)}
            value={nama}
          />
        </View>
        <Text className="text-xl text-black font-bold mb-2">Alamat</Text>
        <TextInput
          className="w-full border-[1px] border-gray-300 rounded-2xl p-2 px-5 text-black"
          multiline
          textAlignVertical="top"
          numberOfLines={6}
          onChangeText={text => setAlamat(text)}
          value={alamat}
        />
      </View>
      <TouchableOpacity
        className="w-full bg-primary py-2 rounded-3xl"
        onPress={() => {
          if (
            validateEmail(email) &&
            phone.length >= 9 &&
            nama !== '' &&
            alamat !== ''
          ) {
            setWarningEmail(false);
            setWarningPhone(false);
            const dataPhone = getPhone(phone);
            const data = {
              email: email,
              telp: dataPhone,
              nama: nama,
              alamat: alamat,
            };
            try {
              fetch(`http://10.0.2.2:4000/pelanggan/${userId}`, {
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
              console.log('error try catch');
              errorToast();
            }
          } else {
            setWarningPhone(true);
            setWarningEmail(true);
            console.log('error validasi');
            errorToast();
          }
        }}>
        <Text className="text-base font-bold text-white w-full text-center">
          Konfirmasi
        </Text>
      </TouchableOpacity>
      <Toast position="top" topOffset={20} />
    </SafeAreaView>
  );
};

const errorToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Update Informasi Gagal',
    text2: 'Silahkan Coba Lagi Dalam Beberapa Saat',
    autoHide: true,
    visibilityTime: 3000,
  });
};

const validateEmail = (valEmail: string) => {
  return String(valEmail).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const getPhone = (phone: string) => {
  if (phone[0] !== '0') {
    phone = '0' + phone;
    return phone;
  }
  return phone;
};

export default Edit;
