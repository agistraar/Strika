/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../Router';

const Detail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView className="px-6 flex flex-col w-full h-screen justify-start items-center box-border bg-white">
      <View className="flex flex-row py-4 w-full h-fit items-center justify-between">
        <Text className="text-black text-xl font-bold">Detail Order</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Home');
          }}>
          <Image source={require('../../../icons/close.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-fit box-border">
        <Metode />
        <Alamat />
        <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-3xl mt-4">
          <Text className="text-black text-base">Berat Pakaian</Text>
          <Text className="text-black text-base font-bold">10Kg</Text>
        </View>
        <Harga />
        <Info />
        <BtnKonfirmasi />
      </ScrollView>
    </SafeAreaView>
  );
};

const Metode = () => {
  return (
    <View className="w-full flex">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Metode Order</Text>
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-1">
            <View className="w-1 h-1 border-[1px] rounded-full"></View>
            <View className="w-1 h-1 border-[1px] rounded-full"></View>
            <View className="w-1 h-1 border-[1px] rounded-full"></View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0">
        <Text className="text-black text-base">Pakaian Kusut</Text>
        <Text className="text-black text-base font-bold">Diambil</Text>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base">Pakaian Rapi</Text>
        <Text className="text-black text-base font-bold">Diantar</Text>
      </View>
    </View>
  );
};

const Alamat = () => {
  return (
    <View className="w-full flex mt-4">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Pakaian diambil dari</Text>
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-1">
            <View className="w-1 h-1 border-[1px] rounded-full"></View>
            <View className="w-1 h-1 border-[1px] rounded-full"></View>
            <View className="w-1 h-1 border-[1px] rounded-full"></View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex border-2 border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base font-bold">Rumah</Text>
        <Text className="text-black text-base">
          Jl. Adi Sucipto, Gg. Fitrah, No. 356
        </Text>
      </View>
    </View>
  );
};

const Harga = () => {
  return (
    <View className="w-full flex mt-4">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Harga</Text>
      </View>
      <View className="flex border-[1px] border-gray-300 px-3 py-2 border-t-0 space-y-2">
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Harga Awal</Text>
          <Text className="text-black text-base">40.000</Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Paket Gold</Text>
          <Text className="text-black text-base">-10.000</Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Durasi Kilat</Text>
          <Text className="text-black text-base">30.000</Text>
        </View>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base font-bold">Total</Text>
        <Text className="text-black text-base font-bold">60.000</Text>
      </View>
    </View>
  );
};

const Info = () => {
  return (
    <View className="w-full flex flex-row mt-4 box-border items-start space-x-2">
      <View className="w-6 h-fit bg-black rounded-full flex items-center justify-center">
        <Text className="text-white text-base font-bold">i</Text>
      </View>
      <Text className="text-black text-sm -mt-1 ">
        Harga di atas masih berupa harga perkiraan, Harga akhir akan ditampilkan
        setelah dilakukan penimbangan oleh mitra Strika.in
      </Text>
    </View>
  );
};

const BtnKonfirmasi = () => {
  return (
    <TouchableOpacity className="w-full mt-4">
      <View className="w-full rounded-3xl bg-primary flex justify-center items-center py-2">
        <Text className="text-white text-lg font-bold">Konfirmasi Order</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Detail;
