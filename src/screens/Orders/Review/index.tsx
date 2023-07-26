/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../Router';
import {RootRouteProps, routeOrderParams} from '../OrderRouter';

type metodeParams = {
  kusut: string;
  rapi: string;
};

type hargaParams = {
  biaya: number;
  durasi: string;
  berat: number;
};

type ratingParams = {
  ratingValue: number;
};

type komentarParams = {
  value: string;
};

const Review = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  const route = useRoute<RootRouteProps<'Review'>>();

  const nama = route.params.nama;
  const foto = route.params.foto;
  const berat = route.params.berat;
  const durasi = route.params.durasi;
  const harga = route.params.harga;
  const kusut = route.params.kusut;
  const rapi = route.params.rapi;
  const rating = route.params.rating;
  const komentar = route.params.komentar;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigationOrder.popToTop();
        navigation.popToTop();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, navigationOrder]),
  );

  return (
    <SafeAreaView className="w-full h-full flex items-center space-y-2 pt-4">
      <View className="w-full px-6 flex flex-row items-center space-x-3 mb-2">
        <TouchableOpacity
          onPress={() => {
            navigationOrder.popToTop();
            navigation.popToTop();
          }}>
          <Image source={require('../../../icons/back.png')} />
        </TouchableOpacity>
        <Text className="text-xl text-black font-bold">Review Order</Text>
      </View>
      <ScrollView className="w-5/6 h-full" showsVerticalScrollIndicator={false}>
        <View className="w-full space-y-3 mb-4">
          <View className="flex-row border-[1px] border-gray-300 px-3 py-2 rounded-2xl box-border flex-wrap ">
            <Image
              className="h-12 w-12 rounded-full mr-2"
              source={{
                uri: `https://i.pravatar.cc/150?u=${foto}`,
              }}
            />
            <View className="flex flex-row justify-between items-center w-4/5">
              <View className="flex justify-center space-y-1">
                <Text className="text-lg text-black -mb-1">{nama}</Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-base text-black">4.3</Text>
                <Image
                  source={require('../../../icons/star.png')}
                  className="w-6 h-6"
                />
              </View>
            </View>
          </View>
          <View>
            <Metode kusut={kusut} rapi={rapi} />
          </View>
          <View>
            <Alamat />
          </View>
          <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-3xl">
            <Text className="text-black text-base">Berat Pakaian</Text>
            <Text className="text-black text-base font-bold">
              {berat.toString().replace('.', ',')}Kg
            </Text>
          </View>
          <View>
            <Harga berat={berat} durasi={durasi} biaya={parseInt(harga, 10)} />
          </View>
          <View>
            <Rating ratingValue={rating} />
          </View>
          <View>
            <Komentar value={komentar} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Metode = ({kusut, rapi}: metodeParams) => {
  return (
    <View className="w-full flex">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Metode</Text>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0">
        <Text className="text-black text-base">Transportasi Pakaian Kusut</Text>
        <Text className="text-black text-base font-bold">{kusut}</Text>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base">Transportasi Pakaian Rapi</Text>
        <Text className="text-black text-base font-bold">{rapi}</Text>
      </View>
    </View>
  );
};

const Alamat = () => {
  return (
    <View className="w-full flex">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Pakaian diambil dari</Text>
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-1">
            <View className="w-1 h-1 border-[1px] rounded-full bg-black" />
            <View className="w-1 h-1 border-[1px] rounded-full bg-black" />
            <View className="w-1 h-1 border-[1px] rounded-full bg-black" />
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

const Harga = ({biaya, durasi, berat}: hargaParams) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
  const harga = biaya * berat;
  const kelipatanDurasi =
    durasi === 'Kilat' ? '2x lipat' : 'Tidak ada kelipatan';
  const totalHarga = durasi === 'Kilat' ? harga * 2 : harga;
  return (
    <View className="w-full flex">
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
          <Text className="text-black text-base">{kelipatanDurasi}</Text>
        </View>
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-base text-black">Biaya Aplikasi</Text>
          <Text className="text-base text-black">
            {formatter.format(1300 * berat)}
          </Text>
        </View>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base font-bold">Total</Text>
        <Text className="text-black text-base font-bold">
          {formatter.format(totalHarga + 1300 * berat)}
        </Text>
      </View>
    </View>
  );
};

const Komentar = ({value}: komentarParams) => {
  return (
    <View className="w-full flex">
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
        <Text className="text-black text-base">Komentar</Text>
      </View>
      <View className="flex border-[1px] border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-sm">{value}</Text>
      </View>
    </View>
  );
};

const OnStar = () => {
  return (
    <Image
      className="w-7 h-7"
      source={require('../../../icons/ratingon.png')}
    />
  );
};

const OffStar = () => {
  return (
    <Image className="w-7 h-7" source={require('../../../icons/rating.png')} />
  );
};

const Rating = ({ratingValue}: ratingParams) => {
  var ratingData = [];
  for (var i = 1; i < 6; i++) {
    i <= ratingValue ? ratingData.push(true) : ratingData.push(false);
  }
  return (
    <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-3xl">
      <Text className="text-black text-base">Rating</Text>
      <View className="flex flex-row space-x-2 items-center justify-center">
        {ratingData.map((isOn, index) => {
          if (isOn) {
            return <OnStar key={index} />;
          } else {
            return <OffStar key={index} />;
          }
        })}
      </View>
    </View>
  );
};

export default Review;
