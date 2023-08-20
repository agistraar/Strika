/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Router';
import {useGlobalContext} from '../../context/context';
import Toast from 'react-native-toast-message';
import OrderModal from '../OrderModal';

type orderData = {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  berat: number;
  kusut: string;
  rapi: string;
  durasi: string;
  biaya: number;
  metode: string;
  komentar: string;
  tanggal: string;
  is_done: number;
  rating: number;
};

type cardParams = {
  id: number;
  nama: string;
  foto: string;
  alamat: string;
  biaya: number;
  tanggal: string;
};

type navbarParams = {
  alamat: string;
};

const History = () => {
  const {userId} = useGlobalContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [orderHistory, setOrderHistory] = useState<[orderData]>();
  const [data, setData] = useState({nama: '', email: '', telp: '', alamat: ''});
  useFocusEffect(
    useCallback(() => {
      getHistory(setOrderHistory, userId);
      GetData(userId, setData);
    }, [userId]),
  );

  return (
    <SafeAreaView className="w-full h-full flex bg-gray-100">
      <View className="w-full px-4 pt-4 pb-2 flex border-b-[1px] bg-white border-gray-300 space-y-2">
        <View className="flex flex-row items-center space-x-4 mb-2">
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image source={require('../../icons/back.png')} />
          </TouchableOpacity>
          <Text className="text-xl text-black font-bold">History</Text>
        </View>
      </View>
      <FlatList
        className="w-full px-5 py-2"
        data={orderHistory}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        updateCellsBatchingPeriod={50}
        initialNumToRender={4}
        renderItem={({item}) => (
          <CardMitra
            id={item.id}
            nama={item.nama}
            foto={item.email}
            alamat={item.alamat}
            biaya={item.biaya}
            tanggal={item.tanggal}
          />
        )}
      />
      <BotNavBar alamat={data.alamat} />
    </SafeAreaView>
  );
};

const CardMitra = memo(
  ({id, nama, foto, alamat, biaya, tanggal}: cardParams) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    });
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParams>>();
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('OrderRouter', {
            screen: 'Review',
            params: {
              id: id,
            },
          });
        }}>
        <View
          className={
            'w-full mb-4 border-[1px] rounded-2xl bg-white border-gray-300'
          }>
          <View
            className={
              'w-full flex items-start border-b-[1px] border-gray-300 px-4 p-2'
            }>
            <View className=" w-full flex flex-row justify-between ">
              <View className="flex flex-row items-center space-x-2 w-fit">
                <Image
                  source={{uri: `https://i.pravatar.cc/150?u=${foto}`}}
                  className="h-10 w-10 rounded-full"
                />
                <Text className="text-base text-black font-bold">{nama}</Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-sm text-black">4.3</Text>
                <Image
                  source={require('../../icons/star.png')}
                  className="w-5 h-5"
                />
              </View>
            </View>
            <Text className="text-base text-black mt-2">{alamat}</Text>
          </View>
          <View className="w-full flex flex-row justify-between items-center p-2 px-4">
            <Text className="text-lg text-black font-bold">
              {formatter.format(biaya)}
            </Text>
            <View className="flex items-end">
              <Text className="text-base text-black font-bold">
                {new Date(tanggal).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const BotNavBar = ({alamat}: navbarParams) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className=" w-full h-16 flex flex-row p-2 px-8 items-center justify-between bg-white absolute bottom-0 rounded-t-2xl">
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pr-2">
        <TouchableOpacity
          onPress={() => {
            navigation.push('Home');
          }}>
          <Image source={require('../../icons/home.png')} />
        </TouchableOpacity>
        <Image source={require('../../icons/order-on.png')} />
      </View>
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pl-2">
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Image source={require('../../icons/box.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileRouter');
          }}>
          <Image source={require('../../icons/user.png')} />
        </TouchableOpacity>
      </View>
      <View className="w-20 h-20 z-10 bg-white absolute -top-7 left-40 rounded-full box-border p-4  items-center justify-center">
        <TouchableOpacity
          className="h-full w-full"
          onPress={() => {
            setModalVisible(true);
          }}>
          <View className="w-full h-full rounded-full border-[1px] flex items-center justify-center">
            <Text className="text-3xl text-black">+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <OrderModal
        visible={modalVisible}
        set={setModalVisible}
        setParent={setModalVisible}
        alamat={alamat}
      />
    </View>
  );
};

const fiturToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Fitur Belum Tersedia',
    text2: 'Mohon maaf, fitur dalam tahap pengembangan',
    autoHide: true,
    visibilityTime: 3000,
  });
};

const GetData = (id: number, set: Function) => {
  try {
    fetch(`http://10.0.2.2:4000/pelanggan/getInfoPelanggan?id=${id}`)
      .then(response => response.json())
      .then(json => {
        set({
          nama: json.data[0].nama,
          email: json.data[0].email,
          telp: json.data[0].telp,
          alamat: json.data[0].alamat,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

const getHistory = (set: Function, id: number) => {
  try {
    fetch(`http://10.0.2.2:4000/order/history/${id}`)
      .then(response => response.json())
      .then(json => {
        set(json.data);
      });
  } catch (err) {
    console.log(err);
  }
};

export default History;
