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
import Data from '../../../data/data.json';
import Toast from 'react-native-toast-message';

type menuParams = {
  judul: string;
};

type cardParams = {
  id: number;
  nama: string;
  foto: string;
  alamat: string;
  harga: number;
  reguler: number;
  kilat: number;
  jumBerat: number;
};

type modalParams = {
  visible: boolean;
  set: Function;
  setParent: Function;
  reset: Function;
  biaya: number;
  foto: string;
  nama: string;
};

type paymentModalParams = {
  visible: boolean;
  set: Function;
  setData: Function;
};

type paymentListParams = {
  label: string;
  setData: Function;
  set: Function;
};

type conPemBeforeParams = {
  set: Function;
};

type conPemAfterParams = {
  set: Function;
  label: string;
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
        <View className="flex flex-row items-center space-x-4 mb-2">
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
            id={item.id}
            nama={item.nama}
            foto={item.foto}
            alamat={item.alamat}
            harga={item.harga}
            reguler={item.reguler}
            kilat={item.kilat}
            jumBerat={item.berat}
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

const CardMitra = ({
  id,
  nama,
  foto,
  alamat,
  harga,
  reguler,
  kilat,
  jumBerat,
}: cardParams) => {
  const route = useRoute<RootRouteProps<'Mitra'>>();
  const berat = route.params.berat;
  const durasi = route.params.durasi;
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  });
  const sisaEstimasi = id % 2 === 0 ? kilat * jumBerat : reguler + jumBerat;
  const estimasi =
    durasi === 'Kilat'
      ? berat * kilat + sisaEstimasi
      : berat * reguler + sisaEstimasi;
  const waktuEstimasi = {jam: 0, menit: 0};
  if (estimasi < 60) {
    waktuEstimasi.menit = estimasi;
  } else {
    waktuEstimasi.jam = parseInt((estimasi / 60).toString(), 10);
    waktuEstimasi.menit = parseInt((estimasi % 60).toString(), 10);
  }
  let teksEstimasi = '';
  if (waktuEstimasi.jam !== 0 && waktuEstimasi.menit !== 0) {
    teksEstimasi = `${waktuEstimasi.jam} Jam ${waktuEstimasi.menit} Menit`;
  } else if (waktuEstimasi.jam !== 0 && waktuEstimasi.menit === 0) {
    teksEstimasi = `${waktuEstimasi.jam} Jam`;
  } else {
    teksEstimasi = `${waktuEstimasi.menit} Menit`;
  }
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
          } p-2 px-4 `}>
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
        <View className="w-full flex flex-row justify-between items-center p-2 px-4">
          <Text className="text-lg text-black font-bold">
            {formatter.format(harga + 1300)}/Kg
          </Text>
          <View className="flex items-end">
            <Text className="text-sm text-black">Estimasi Pengerjaan</Text>
            <Text className="text-base text-black font-bold">
              {teksEstimasi}
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
        foto={foto}
        nama={nama}
      />
    </TouchableOpacity>
  );
};

const BgModal = ({
  visible,
  set,
  setParent,
  reset,
  biaya,
  foto,
  nama,
}: modalParams) => {
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
        foto={foto}
        nama={nama}
      />
      <View className="h-screen w-full bg-black/25 items-center justify-center -z-10" />
    </Modal>
  );
};

const BottomModal = ({
  visible,
  set,
  setParent,
  reset,
  biaya,
  foto,
  nama,
}: modalParams) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  });
  const route = useRoute<RootRouteProps<'Mitra'>>();
  const berat = route.params.berat;
  const harga = (biaya + 1300) * berat;
  const durasi = route.params.durasi;
  const kusut = route.params.kusut;
  const rapi = route.params.rapi;
  let ongkir = 0;
  if (kusut === 'Diambil') {
    ongkir += 5000;
  }
  if (rapi === 'Diantar') {
    ongkir += 5000;
  }

  const kelipatanDurasi =
    durasi === 'Kilat' ? '2x lipat harga awal' : 'Tidak ada kelipatan';
  const totalHarga = durasi === 'Kilat' ? harga * 2 + ongkir : harga + ongkir;
  const [pembayaranVisible, setPembayaranVisible] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState('');

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
      <View className="flex justify-center items-center absolute bottom-0 bg-white w-full h-fit py-8 px-8 space-y-3 rounded-t-3xl">
        <View className="w-full">
          <View className="w-full flex border-[1px] border-gray-300 rounded-t-2xl px-4 py-2">
            <Text className="text-base text-black">Harga</Text>
          </View>
          <View className="w-full flex border-x-[1px] border-gray-300 px-4 py-2 space-y-2">
            <View className="w-full flex flex-row justify-between items-center">
              <View>
                <Text className="text-black text-base">Harga Awal</Text>
                <Text className="text-black text-xs">
                  {'(Rata-rata Harga x berat)'}
                </Text>
              </View>
              <Text className="text-base text-black">
                {formatter.format(harga)}
              </Text>
            </View>
            <View className="w-full flex flex-row items-center justify-between">
              <View>
                <Text className="text-black text-base">Ongkos Kirim</Text>
                <Text className="text-black text-xs">
                  {'(5.000 setiap pengantaran/penjemputan mitra)'}
                </Text>
              </View>

              <Text className="text-black text-base">{ongkir}</Text>
            </View>
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="text-base text-black">Durasi {durasi}</Text>
              <Text className="text-base text-black">{kelipatanDurasi}</Text>
            </View>
          </View>
          <View className="w-full flex border-[1px] border-gray-300 rounded-b-2xl px-4 py-2">
            <View className="w-full flex flex-row items-center justify-between">
              <Text className="text-base text-black font-bold">Total</Text>
              <Text className="text-base text-black font-bold">
                {formatter.format(totalHarga)}
              </Text>
            </View>
          </View>
          {selectedPayment === '' ? (
            <ContainerPembayaranBefore set={setPembayaranVisible} />
          ) : (
            <ContainerPembayaranAfter
              label={selectedPayment}
              set={setPembayaranVisible}
            />
          )}
        </View>
        <TouchableOpacity
          className="w-full bg-primary py-2 rounded-3xl"
          onPress={() => {
            if (selectedPayment === '') {
              paymentToast();
            } else {
              set(false);
              setParent(false);
              reset(false);
              navigationOrder.push('OrderInfo', {
                berat: berat,
                harga: String(biaya + 1300),
                foto: foto,
                nama: nama,
                durasi: durasi,
                rapi: route.params.rapi,
                kusut: route.params.kusut,
                payment: selectedPayment,
              });
            }
          }}>
          <Text className="text-base font-bold text-white w-full text-center">
            Konfirmasi Mitra
          </Text>
        </TouchableOpacity>
      </View>
      <PaymentModal
        visible={pembayaranVisible}
        set={setPembayaranVisible}
        setData={setSelectedPayment}
      />
      <Toast position="top" topOffset={20} />
    </Modal>
  );
};

const ContainerPembayaranBefore = ({set}: conPemBeforeParams) => {
  return (
    <View className="w-full border-[1px] border-gray-300 rounded-2xl px-4 py-2 mt-2">
      <TouchableOpacity
        onPress={() => {
          set(true);
        }}>
        <View className="w-full flex flex-row items-center justify-between ">
          <Text className="text-base text-black">Pilih Metode Pembayaran</Text>
          <Image source={require('../../../icons/next.png')} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ContainerPembayaranAfter = ({set, label}: conPemAfterParams) => {
  return (
    <View className="w-full mt-2">
      <View className="w-full flex border-[1px] border-gray-300 rounded-t-2xl px-4 py-2">
        <Text className="text-base text-black">Pilih Metode Pembayaran</Text>
      </View>
      <View className="w-full border-[1px] border-t-0 border-gray-300 rounded-b-2xl px-4 py-2">
        <TouchableOpacity
          onPress={() => {
            set(true);
          }}>
          <View className="w-full flex flex-row items-center justify-start">
            {iconPembayaran(label)}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PaymentModal = ({visible, set, setData}: paymentModalParams) => {
  const paymentData = [
    {label: 'Cash', source: '../../../icons/money.png'},
    {label: 'Dana', source: '../../../icons/dana.png'},
    {label: 'Gopay', source: '../../../icons/gopay.png'},
    {label: 'ShopeePay', source: '../../../icons/sppay.png'},
    {label: 'Ovo', source: '../../../icons/ovo.png'},
  ];
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        set(false);
      }}>
      <View className="h-screen w-full bg-white items-center justify-center">
        <View className="w-full flex flex-row items-center space-x-4 bg-white p-4">
          <TouchableOpacity
            onPress={() => {
              set(false);
            }}>
            <Image source={require('../../../icons/back.png')} />
          </TouchableOpacity>
          <Text className="text-lg text-black font-bold">
            Metode Pembayaran
          </Text>
        </View>
        <FlatList
          className="w-full px-5 py-2"
          data={paymentData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <PaymentList label={item.label} setData={setData} set={set} />
          )}
        />
      </View>
    </Modal>
  );
};

const PaymentList = ({label, setData, set}: paymentListParams) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setData(label);
        set(false);
      }}>
      <View className="flex flex-row items-center justify-start px-3 py-2 border-b-[1px] border-slate-400 mb-2">
        {iconPembayaran(label)}
      </View>
    </TouchableOpacity>
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

const paymentToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Silahkan Pilih Metode Pembayaran',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default Mitra;
