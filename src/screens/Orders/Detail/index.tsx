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
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, routeOrderParams} from '../OrderRouter';
import {RootStackParams} from '../../../Router';

type hargaParams = {
  harga: number;
  durasi: String;
};

type metodeParams = {
  rapi: string;
  kusut: string;
};

type confirParams = {
  berat: string;
  kusut: string;
  rapi: string;
  durasi: string;
};

const Detail = () => {
  const route = useRoute<RootRouteProps<'Detail'>>();
  const totalHarga = parseInt(route.params.berat, 10) * 1100;
  const kusut = route.params.kusut;
  const rapi = route.params.rapi;
  const durasi = route.params.durasi;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView className="px-6 flex flex-col w-full h-screen justify-start items-center box-border bg-white">
      <View className="flex flex-row py-4 w-full h-fit items-center justify-between">
        <Text className="text-black text-xl font-bold">Detail Order</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../../../icons/close.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-fit box-border">
        <Metode kusut={kusut} rapi={rapi} />
        <Alamat />
        <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-3xl mt-4">
          <Text className="text-black text-base">Berat Pakaian</Text>
          <Text className="text-black text-base font-bold">
            {route.params.berat}Kg
          </Text>
        </View>
        <Harga harga={totalHarga} durasi={durasi} />
        <Info />
        <BtnKonfirmasi
          berat={route.params.berat}
          kusut={kusut}
          rapi={rapi}
          durasi={durasi}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Metode = ({kusut, rapi}: metodeParams) => {
  return (
    <View className="w-full flex">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Metode Order</Text>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0">
        <Text className="text-black text-base">Pakaian Kusut</Text>
        <Text className="text-black text-base font-bold">{kusut}</Text>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base">Pakaian Rapi</Text>
        <Text className="text-black text-base font-bold">{rapi}</Text>
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
            <View className="w-1 h-1 border-[1px] rounded-full bg-black"></View>
            <View className="w-1 h-1 border-[1px] rounded-full bg-black"></View>
            <View className="w-1 h-1 border-[1px] rounded-full bg-black"></View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex border-[1px] border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base font-bold">Rumah</Text>
        <Text className="text-black text-base">
          Jl. Adi Sucipto, Gg. Fitrah, No. 356
        </Text>
      </View>
    </View>
  );
};

const Harga = ({harga, durasi}: hargaParams) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const biayaDurasi = durasi === 'Kilat' ? 30000 : 0;

  return (
    <View className="w-full flex mt-4">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Harga</Text>
      </View>
      <View className="flex border-[1px] border-gray-300 px-3 py-2 border-t-0 space-y-2">
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Harga Awal</Text>
          <Text className="text-black text-base">
            {formatter.format(harga)}
          </Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Durasi {durasi}</Text>
          <Text className="text-black text-base">
            {formatter.format(biayaDurasi)}
          </Text>
        </View>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base font-bold">Total</Text>
        <Text className="text-black text-base font-bold">
          {formatter.format(harga + biayaDurasi)}
        </Text>
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
        Harga di atas merupakan harga perkiraan berdasarkan rata-rata harga dari
        mitra, Harga akhir akan ditampilkan setelah dilakukan penimbangan oleh
        mitra Strika.in
      </Text>
    </View>
  );
};

const BtnKonfirmasi = ({berat, kusut, rapi, durasi}: confirParams) => {
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  return (
    <TouchableOpacity
      className="w-full mt-4"
      onPress={() => {
        navigationOrder.push('Mitra', {
          berat: berat,
          kusut: kusut,
          rapi: rapi,
          durasi: durasi,
        });
      }}>
      <View className="w-full rounded-3xl bg-primary flex justify-center items-center py-2">
        <Text className="text-white text-lg font-bold">Konfirmasi Order</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Detail;
