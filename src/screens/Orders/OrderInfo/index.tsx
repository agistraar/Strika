/* eslint-disable prettier/prettier */
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, routeOrderParams} from '../OrderRouter';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import {RootStackParams} from '../../../Router';

type progressParams = {
  status: string;
  isDone: boolean;
};

type hargaParams = {
  biaya: number;
  durasi: string;
  kusut: string;
  rapi: string;
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

type sheetParams = {
  data: orderData;
};

type mainParams = {
  set: Function;
};

const OrderInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return isLoading ? <SplashScreen /> : <MainScreen set={setIsLoading} />;
};

const SplashScreen = () => {
  return (
    <View className="w-full h-full flex justify-center items-center bg-white">
      <View className="w-full h-48 flex items-center justify-center bg-white space-y-2">
        <Image
          className="w-40 h-40"
          source={require('../../../image/icon3.png')}
        />
        <Text className="text-xl text-black font-bold">
          Sedang Mengatur Order Anda
        </Text>
      </View>
      <View className="w-3/4 h-16 absolute top-2/3">
        <Lottie
          source={require('../../../data/loading.json')}
          autoPlay
          loop={true}
        />
      </View>
    </View>
  );
};

const MainScreen = ({set}: mainParams) => {
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RootRouteProps<'OrderInfo'>>();
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
    useCallback(() => {
      getOrderData(setOrder, idOrder);
      set(false);
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
    }, [idOrder, navigation, navigationOrder, set]),
  );

  console.log('mainScreen: ' + order);

  const lat = -0.053210907997147096;
  const long = 109.347239297138674;
  const latdel = 0.01;
  const window = Dimensions.get('window');
  const {width, height} = window;
  const longdel = latdel * (width / height);

  return (
    <View
      style={{...StyleSheet.absoluteFillObject}}
      className="h-full w-full justify-end items-center">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{...StyleSheet.absoluteFillObject}}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: latdel,
          longitudeDelta: longdel,
        }}
      />
      <View className="absolute top-4 left-4 self-start">
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
          <View className="bg-transparent items-center justify-center rounded-full border-[1px] p-1">
            <Image source={require('../../../icons/back.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <BotSheet data={order} />
    </View>
  );
};

const BotSheet = ({data}: sheetParams) => {
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['20%', '50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  console.log('dataSheet ni2: ' + data.alamat);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enableContentPanningGesture={false}
      onChange={handleSheetChanges}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-col p-6 pt-2 space-y-2">
          <View className="flex-row border-[1px] border-gray-300 px-3 py-2 rounded-2xl box-border flex-wrap ">
            <Image
              className="h-12 w-12 rounded-full mr-2"
              source={{uri: `https://i.pravatar.cc/150?u=${data.email}`}}
            />
            <View className="flex flex-row justify-between items-center w-4/5">
              <View className="flex justify-center space-y-1">
                <Text className="text-base text-black -mb-1">{data.nama}</Text>
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
              <Text className="text-black text-base">Pakaian diambil dari</Text>
            </View>
            <View className="flex border-[1px] border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
              <Text className="text-black text-base font-bold">Rumah</Text>
              <Text className="text-black text-base">{data.alamat}</Text>
            </View>
          </View>
          <View>
            <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
              <Text className="text-black text-base">Status Pengerjaan</Text>
            </View>
            <View className="flex-col border-[1px] border-t-0 items-start border-gray-300 rounded-b-3xl px-3 py-2">
              <Progress status="Mengambil Pakaian" isDone={true} />
              <Progress status="Menimbang Pakaian" isDone={true} />
              <Progress status="Menyetrika Pakaian" isDone={false} />
              <Progress status="Mengantar Pakaian" isDone={false} />
            </View>
          </View>
          <View>
            <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-t-3xl">
              <Text className="text-black text-base">Metode Pembayaran</Text>
            </View>
            <View className="flex flex-row items-center justify-start border-[1px] border-gray-300 px-3 py-2 border-t-0 rounded-b-3xl">
              {iconPembayaran(data.metode)}
            </View>
          </View>
          <View>
            <View className="flex flex-row border-[1px] items-center justify-between border-gray-300 px-3 py-2 rounded-3xl">
              <Text className="text-black text-base">Berat Pakaian</Text>
              <Text className="text-black text-base font-bold">
                {data.berat?.toString().replace('.', ',')}Kg
              </Text>
            </View>
          </View>
          <View>
            <Harga
              biaya={data.biaya}
              durasi={data.durasi}
              kusut={data.kusut}
              rapi={data.rapi}
            />
          </View>
          <View className="flex space-y-3 pt-10">
            <TouchableOpacity
              className="w-full bg-primary py-2 rounded-3xl"
              onPress={() => {
                navigationOrder.push('Ulasan', {
                  id: data.id,
                });
              }}>
              <Text className="text-base font-bold text-white w-full text-center">
                Pakaian Rapi Telah Diterima
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full bg-white border-primary border-[1px] py-2 rounded-3xl"
              onPress={() => {
                navigationOrder.pop();
              }}>
              <Text className="text-base font-bold text-primary w-full text-center">
                Batalkan Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const Progress = ({status, isDone}: progressParams) => {
  return (
    <View className="flex-row space-x-3 items-center mb-3">
      {isDone ? (
        <Image
          className="h-8 w-8"
          source={require('../../../icons/done.png')}
        />
      ) : (
        <Image
          className="h-8 w-8"
          source={require('../../../icons/undone.png')}
        />
      )}
      <Text className="text-black text-base">{status}</Text>
    </View>
  );
};

const Harga = ({biaya, durasi, kusut, rapi}: hargaParams) => {
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
    <View className="w-full">
      <View className="w-full flex border-[1px] border-gray-300 rounded-t-3xl px-4 py-2">
        <Text className="text-base text-black">Harga</Text>
      </View>
      <View className="w-full flex border-x-[1px] border-gray-300 px-4 py-2 space-y-2">
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-base text-black">Harga Awal</Text>
          <Text className="text-base text-black">
            {formatter.format(harga)}
          </Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-black text-base">Ongkos Kirim</Text>
          <Text className="text-black text-base">
            {formatter.format(ongkir)}
          </Text>
        </View>
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-base text-black">Durasi {durasi}</Text>
          <Text className="text-base text-black">{kelipatanDurasi}</Text>
        </View>
      </View>
      <View className="w-full flex border-[1px] border-gray-300 rounded-b-3xl px-4 py-2">
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-base text-black font-bold">Total</Text>
          <Text className="text-base text-black font-bold">
            {formatter.format(totalHarga)}
          </Text>
        </View>
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

export default OrderInfo;
