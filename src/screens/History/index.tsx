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

const History = () => {
  const {userId} = useGlobalContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [orderHistory, setOrderHistory] = useState<[orderData]>();
  useFocusEffect(
    useCallback(() => {
      getHistory(setOrderHistory, userId);
    }, [userId]),
  );

  return (
    <SafeAreaView className="w-full h-full flex bg-white">
      <View className="w-full px-4 pt-6 pb-3 flex border-b-[1px] border-gray-300 space-y-2">
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
            "w-full mb-4 border-[1px] rounded-2xl 'bg-white border-gray-300"
          }>
          <View
            className={
              'w-full flex items-start border-b-[1px] border-gray-300p-2 px-4'
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
              <Text className="text-base text-black font-bold">{tanggal}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

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
