/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, routeOrderParams} from '../OrderRouter';
import {useNavigation, useRoute} from '@react-navigation/native';
import Data from './data.json';

type menuParams = {
  judul: String;
};

type cardParams = {
  nama: String;
  foto: String;
  alamat: String;
  harga: number;
  reguler: Number;
  kilat: Number;
};

type modalParams = {
  visible: boolean;
  set: Function;
  setParent: Function;
  reset: Function;
  biaya: number;
};

const Mitra = () => {
  const user = Data.mitra;
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <SafeAreaView className="w-full h-full flex bg-white">
      <View className="w-full px-4 pt-6 pb-3 flex border-b-[1px] border-gray-300 space-y-2">
        <View className="flex flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={() => {
              navigationOrder.pop();
            }}>
            <Image source={require('../../../icons/back.png')} />
          </TouchableOpacity>
          <Text className="text-xl text-black font-bold">Pilih Mitra</Text>
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <SortMenu judul={'Terdekat'} />
            <SortMenu judul={'Termurah'} />
            <SortMenu judul={'Terlaris'} />
            <SortMenu judul={'Tercepat'} />
          </ScrollView>
        </View>
      </View>
      <FlatList
        className="w-full px-5 py-2"
        data={user}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <CardMitra
            nama={item.nama}
            foto={item.foto}
            alamat={item.alamat}
            harga={item.harga}
            reguler={item.reguler}
            kilat={item.kilat}
          />
        )}
      />
    </SafeAreaView>
  );
};

const SortMenu = ({judul}: menuParams) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="mr-3">
      <TouchableOpacity
        className={`w-full ${
          isFocused ? 'bg-primary' : 'bg-white border-[1px] border-primary'
        } px-4 py-0.5 rounded-2xl`}
        onPress={() => {
          setIsFocused(!isFocused);
        }}>
        <Text
          className={`text-base ${isFocused ? 'text-white' : 'text-primary'} `}>
          {judul}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CardMitra = ({nama, foto, alamat, harga, reguler, kilat}: cardParams) => {
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return (
    <TouchableOpacity
      onPress={() => {
        setIsFocused(!isFocused);
        setModalVisible(true);
      }}>
      <View
        className={`w-full mb-4 border-[1px] rounded-2xl ${
          isFocused ? 'bg-primary border-white' : 'bg-white border-gray-300'
        }`}>
        <View
          className={`w-full flex items-start border-b-[1px] ${
            isFocused ? 'border-white' : 'border-gray-300'
          } p-2 `}>
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
                source={require('../../../icons/star.png')}
                className="w-5 h-5"
              />
            </View>
          </View>
          <Text className="text-base text-black mt-2">{alamat}</Text>
        </View>
        <View className="w-full flex flex-row justify-between items-center p-2">
          <Text className="text-lg text-black font-bold">
            {formatter.format(harga)}/Kg
          </Text>
          <View>
            <Text className="text-sm text-black">
              Reguler: {String(reguler)} Hari
            </Text>
            <Text className="text-sm text-black">
              Kilat: {String(kilat)} Jam
            </Text>
          </View>
        </View>
      </View>
      <BgModal
        visible={modalVisible}
        set={setModalVisible}
        setParent={setModalVisible}
        reset={setIsFocused}
        biaya={harga}
      />
    </TouchableOpacity>
  );
};

const BgModal = ({visible, set, setParent, reset, biaya}: modalParams) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onShow={() => {
        setMenuVisible(true);
      }}
      onRequestClose={() => {
        set(false);
        setParent(false);
        reset(false);
      }}>
      <BottomModal
        visible={menuVisible}
        set={setMenuVisible}
        setParent={setParent}
        reset={reset}
        biaya={biaya}
      />
      <View className="h-screen w-full bg-black/25 items-center justify-center -z-10" />
    </Modal>
  );
};

const BottomModal = ({visible, set, setParent, reset, biaya}: modalParams) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const route = useRoute<RootRouteProps<'Mitra'>>();
  const hargaTotal = biaya * parseInt(route.params.berat, 10);
  // const kusut = route.params.kusut;
  // const rapi = route.params.rapi;
  const durasi = route.params.durasi;
  const biayaDurasi = durasi === 'Kilat' ? 30000 : 0;

  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        set(false);
        setParent(false);
        reset(false);
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          set(false);
          setParent(false);
          reset(false);
        }}>
        <View className="h-screen w-full -z-10" />
      </TouchableWithoutFeedback>
      <View className="flex justify-center items-center absolute bottom-0 bg-white w-full h-fit py-4 px-8 space-y-3 rounded-t-3xl">
        <View className="w-full">
          <View className="w-full flex border-[1px] border-gray-300 rounded-t-2xl px-4 py-2">
            <Text className="text-base text-black">Harga</Text>
          </View>
          <View className="w-full flex border-x-[1px] border-gray-300 px-4 py-2 space-y-2">
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="text-base text-black">Harga</Text>
              <Text className="text-base text-black">
                {formatter.format(hargaTotal)}
              </Text>
            </View>
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="text-base text-black">Durasi Kilat</Text>
              <Text className="text-base text-black">
                {formatter.format(biayaDurasi)}
              </Text>
            </View>
          </View>
          <View className="w-full flex border-[1px] border-gray-300 rounded-b-2xl px-4 py-2">
            <View className="w-full flex flex-row items-center justify-between">
              <Text className="text-base text-black font-bold">Total</Text>
              <Text className="text-base text-black font-bold">
                {formatter.format(hargaTotal + biayaDurasi)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="w-full bg-primary py-2 rounded-3xl"
          onPress={() => {
            reset(false);
            navigationOrder.push('OrderInfo');
          }}>
          <Text className="text-base font-bold text-white w-full text-center">
            Konfirmasi Mitra
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Mitra;
