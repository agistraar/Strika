/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, {useState} from 'react';
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
  rapi: string;
  kusut: string;
};

type ratingParams = {
  ratingValue: number;
};

type komentarParams = {
  value: string;
};

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

const Review = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  const route = useRoute<RootRouteProps<'Review'>>();
  const idOrder = route.params.id;

  const defData = {
    id: -1,
    nama: '',
    email: '',
    alamat: '',
    berat: -1,
    kusut: '',
    rapi: '',
    durasi: '',
    biaya: -1,
    metode: '',
    komentar: '',
    tanggal: '',
    is_done: -1,
    rating: -1,
  };

  const [order, setOrder] = useState<orderData>(defData);
  useFocusEffect(
    React.useCallback(() => {
      getOrderData(setOrder, idOrder);
      const onBackPress = () => {
        navigationOrder.reset({
          index: 0,
          routes: [{name: 'Detail'}],
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [idOrder, navigation, navigationOrder]),
  );

  return (
    <SafeAreaView className="w-full h-full bg-white flex items-center space-y-2 pt-4">
      <View className="w-full px-6 flex flex-row items-center space-x-3 mb-2">
        <TouchableOpacity
          onPress={() => {
            navigationOrder.reset({
              index: 0,
              routes: [{name: 'Detail'}],
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
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
                uri: `https://i.pravatar.cc/150?u=${order.email}`,
              }}
            />
            <View className="flex flex-row justify-between items-center w-4/5">
              <View className="flex justify-center space-y-1">
                <Text className="text-lg text-black -mb-1">{order.nama}</Text>
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
            <Metode kusut={order.kusut} rapi={order.rapi} />
          </View>
          <View>
            <Alamat />
          </View>
          <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-3xl">
            <Text className="text-black text-base">Berat Pakaian</Text>
            <Text className="text-black text-base font-bold">
              {order.berat?.toString().replace('.', ',')}Kg
            </Text>
          </View>
          <View>
            <Harga
              durasi={order.durasi}
              biaya={order.biaya}
              rapi={order.rapi}
              kusut={order.kusut}
            />
          </View>
          <View>
            <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
              <Text className="text-black text-base">Metode Pembayaran</Text>
            </View>
            <View className="flex flex-row items-center justify-start border-[1px] border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
              {iconPembayaran(order.metode)}
            </View>
          </View>
          <View>
            <Rating ratingValue={order.rating} />
          </View>
          <View>
            <Komentar value={order.komentar} />
          </View>
          <TouchableOpacity
            className="w-full bg-white border-rose-600 border-[1px] py-2 rounded-3xl"
            onPress={() => {}}>
            <Text className="text-base font-bold text-rose-600 w-full text-center">
              Laporkan Mitra
            </Text>
          </TouchableOpacity>
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

const Harga = ({biaya, durasi, rapi, kusut}: hargaParams) => {
  const totalHarga = biaya;
  let ongkir = 0;
  if (kusut === 'Diambil') {
    ongkir += 5000;
  }
  if (rapi === 'Diantar') {
    ongkir += 5000;
  }
  const harga =
    durasi === 'Kilat' ? (totalHarga - ongkir) / 2 : totalHarga - ongkir;
  const kelipatanDurasi =
    durasi === 'Kilat' ? '2x lipat Harga Awal' : 'Tidak ada kelipatan';
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  });
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
          <Text className="text-black text-base">Ongkos Kirim</Text>
          <Text className="text-black text-base">
            {formatter.format(ongkir)}
          </Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Durasi {durasi}</Text>
          <Text className="text-black text-base">{kelipatanDurasi}</Text>
        </View>
      </View>
      <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
        <Text className="text-black text-base font-bold">Total</Text>
        <Text className="text-black text-base font-bold">
          {formatter.format(totalHarga)}
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

const iconPembayaran = (metode: string) => {
  if (metode === 'Cash') {
    return (
      <Image
        source={require('../../../icons/money.png')}
        className="h-8 w-20"
      />
    );
  } else if (metode === 'Dana') {
    return (
      <Image source={require('../../../icons/dana.png')} className="h-8 w-20" />
    );
  } else if (metode === 'Gopay') {
    return (
      <Image
        source={require('../../../icons/gopay.png')}
        className="h-8 w-20"
      />
    );
  } else if (metode === 'ShopeePay') {
    return (
      <Image
        source={require('../../../icons/sppay.png')}
        className="h-8 w-20"
      />
    );
  } else if (metode === 'Ovo') {
    return (
      <Image source={require('../../../icons/ovo.png')} className="h-8 w-20" />
    );
  }
};

const getOrderData = (set: Function, id: number) => {
  try {
    fetch(`http://10.0.2.2:4000/order/${id}`)
      .then(response => response.json())
      .then(json => {
        set(json.data[0]);
      });
  } catch (err) {
    console.log(err);
  }
};

export default Review;
