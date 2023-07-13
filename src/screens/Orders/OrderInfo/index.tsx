/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const OrderInfo = () => {
  return (
    <View
      style={{...StyleSheet.absoluteFillObject}}
      className="h-full w-full justify-end items-center">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{...StyleSheet.absoluteFillObject}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <BotSheet />
    </View>
  );
};

const BotSheet = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <BottomSheetView className="flex-1 items-center">
        <View className="flex-col p-6 pt-2 space-y-2">
          <View>
            <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
              <Text className="text-black text-base">Pakaian diambil dari</Text>
            </View>
            <View className="flex border-[1px] border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
              <Text className="text-black text-base font-bold">Rumah</Text>
              <Text className="text-black text-base">
                Jl. Adi Sucipto, Gg. Fitrah, No. 356
              </Text>
            </View>
          </View>
          <View className="flex-row border-[1px] border-gray-300 px-3 py-2 rounded-2xl box-border flex-wrap ">
            <Image
              className="h-12 w-12 rounded-full mr-2"
              source={{uri: 'https://i.pravatar.cc/150?u=yoimiya@gmail.com'}}
            />
            <View className="flex flex-row justify-between items-center w-4/5">
              <View className="flex justify-center space-y-1">
                <Text className="text-base text-black -mb-1">Ibu Yoimiya</Text>
                <View className="flex flex-row items-center">
                  <Text className="text-sm text-black">4.3</Text>
                  <Image
                    source={require('../../../icons/star.png')}
                    className="w-5 h-5"
                  />
                </View>
              </View>
              <Image
                className="w-8 h-8"
                source={require('../../../icons/chat.png')}
              />
            </View>
          </View>
          <View>
            <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
              <Text className="text-black text-base">Progres</Text>
            </View>
            <View className="flex flex-row border-x-[1px] items-center justify-between border-gray-300 px-3 py-2">
              <Text>Mengambil Pakaian</Text>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default OrderInfo;
