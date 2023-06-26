/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routeOrderParams} from '../OrderRouter';
import {useNavigation} from '@react-navigation/native';

type menuParams = {
  judul: String;
};

type cardParams = {
  pick: Function;
  status: boolean;
};

type modalParams = {
  visible: boolean;
  set: Function;
  reset: Function;
};

const Mitra = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardStatus, setCardStatus] = useState(false);
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full px-5 py-2">
        <CardMitra pick={setModalVisible} status={cardStatus} />
        <CardMitra pick={setModalVisible} status={cardStatus} />
        <CardMitra pick={setModalVisible} status={cardStatus} />
        <CardMitra pick={setModalVisible} status={cardStatus} />
      </ScrollView>
      <BottomModal
        visible={modalVisible}
        set={setModalVisible}
        reset={setCardStatus}
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
          if (isFocused) {
            setIsFocused(false);
          } else {
            setIsFocused(true);
          }
        }}>
        <Text
          className={`text-base ${isFocused ? 'text-white' : 'text-primary'} `}>
          {judul}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CardMitra = ({pick, status}: cardParams) => {
  const [isFocused, setIsFocused] = useState(status);
  const setFocus = () => {
    if (isFocused) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setFocus();
        pick(true);
      }}>
      <View
        className={`w-full mb-4 border-[1px] border-gray-300 rounded-2xl ${
          isFocused ? 'bg-primary' : 'bg-white'
        }`}>
        <View
          className={`w-full flex items-start border-b-[1px] ${
            isFocused ? 'border-white' : 'border-gray-300'
          } p-2 `}>
          <View className=" w-full flex flex-row justify-between ">
            <View className="flex flex-row items-center space-x-2 w-fit">
              <Image
                source={require('../../../image/agis.png')}
                className="h-10 w-10 rounded-full"
              />
              <Text className="text-base text-black font-bold">
                Ibu Yoimiya
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <Text className="text-sm text-black">4.3</Text>
              <Image
                source={require('../../../icons/star.png')}
                className="w-5 h-5"
              />
            </View>
          </View>
          <Text className="text-base text-black mt-2">
            Jl. Adi Sucipto, Gg. Fitrah, No. 356
          </Text>
        </View>
        <View className="w-full flex flex-row justify-between items-center p-2">
          <Text className="text-lg text-black font-bold">1.300/Kg</Text>
          <View>
            <Text className="text-sm text-black">Reguler: 2 Hari</Text>
            <Text className="text-sm text-black">Kilat: 4 Jam</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BottomModal = ({visible, set, reset}: modalParams) => {
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        set(false);
        reset(false);
      }}>
      <View className="h-screen w-full bg-black/25">
        <TouchableWithoutFeedback
          onPress={() => {
            set(false);
            reset(false);
          }}>
          <View className="h-full w-full"></View>
        </TouchableWithoutFeedback>
        <View className="flex justify-center items-center absolute bottom-0 bg-white w-full h-fit py-4 px-8 space-y-3 rounded-t-3xl">
          <View className="w-full">
            <View className="w-full flex border-[1px] border-gray-300 rounded-t-2xl px-4 py-2">
              <Text className="text-base text-black">Harga</Text>
            </View>
            <View className="w-full flex border-x-[1px] border-gray-300 px-4 py-2 space-y-2">
              <View className="w-full flex flex-row justify-between items-center">
                <Text className="text-base text-black">Harga Awal</Text>
                <Text className="text-base text-black">40.000</Text>
              </View>
              <View className="w-full flex flex-row justify-between items-center">
                <Text className="text-base text-black">Paket Gold</Text>
                <Text className="text-base text-black">-10.000</Text>
              </View>
              <View className="w-full flex flex-row justify-between items-center">
                <Text className="text-base text-black">Durasi Kilat</Text>
                <Text className="text-base text-black">30.000</Text>
              </View>
            </View>
            <View className="w-full flex border-[1px] border-gray-300 rounded-b-2xl px-4 py-2">
              <View className="w-full flex flex-row items-center justify-between">
                <Text className="text-base text-black font-bold">Total</Text>
                <Text className="text-base text-black font-bold">60.000</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="w-full bg-primary py-2 rounded-3xl"
            onPress={() => {
              navigationOrder.push('OrderInfo');
            }}>
            <Text className="text-base font-bold text-white w-full text-center">
              Konfirmasi Mitra
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Mitra;
