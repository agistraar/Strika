/* eslint-disable prettier/prettier */
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Router';
import Toast from 'react-native-toast-message';
import OrderModal from '../OrderModal';
import {useGlobalContext} from '../../context/context';

type cardParams = {
  jenis: string;
};

type profilParams = {
  email: string;
  nama: string;
};

type navbarParams = {
  alamat: string;
};

type infoParams = {
  id: number;
  nama: string;
  email: string;
};

const Home = () => {
  const {userId} = useGlobalContext();
  const [data, setData] = useState({nama: '', email: '', telp: '', alamat: ''});
  const [goingOrder, setGoingOrder] = useState({id: 0, nama: '', email: ''});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useFocusEffect(
    useCallback(() => {
      if (userId !== 0) {
        GetData(userId, setData, navigation);
        GetGoingOrders(userId, setGoingOrder);
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }, [navigation, userId]),
  );

  return (
    <SafeAreaView className=" flex flex-col w-full h-screen justify-start items-center box-border bg-white">
      <ScrollView className=" h-full w-full box-border">
        <View className="flex p-4 pt-8 pb-6 items-center w-full border-b-[1px] border-gray-300 rounded-b-3xl">
          <Profile email={data.email} nama={data.nama} />
          <View className="px-2 pt-6 pb-0 flex flex-row items-center justify-center w-full">
            <CardMember />
          </View>
        </View>

        {goingOrder.id === 0 ? null : (
          <InfoSetrika
            id={goingOrder.id}
            nama={goingOrder.nama}
            email={goingOrder.email}
          />
        )}
        <Paket />
        <Berita />
      </ScrollView>
      <BotNavBar alamat={data.alamat} />
      <Toast position="top" topOffset={20} />
    </SafeAreaView>
  );
};

const Profile = ({email, nama}: profilParams) => {
  return (
    <View className="flex flex-row max-w-full box-border p-1">
      <Image
        className="h-12 w-12 rounded-full mr-2"
        source={{uri: `https://i.pravatar.cc/150?u=${email}`}}
      />
      <View className="flex flex-row justify-between items-center w-72">
        <View className="flex justify-center">
          <Text className="text-base text-black -mb-1">
            Selamat datang kembali,
          </Text>
          <Text className="text-xl text-black font-bold">{nama}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Image
            className="h-6 w-6"
            source={require('../../icons/notif.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CardMember = () => {
  return (
    <View className="bg-primary flex p-3 space-y-2 rounded-3xl w-11/12">
      <View className="flex flex-row justify-between space-x-8 h-fit w-fit">
        <Text className="text-base text-white">Sisa Kuota</Text>
        <Image className="w-6 h-6" source={require('../../icons/member.png')} />
      </View>
      <View className="w-full h-1 bg-white rounded-2xl">
        <View className="w-[8%] h-full bg-yellow-400 rounded-2xl" />
      </View>
      <Text className="text-sm text-slate-50">Tersisa 7Kg</Text>
    </View>
  );
};

const InfoSetrika = ({id, nama, email}: infoParams) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View className=" flex w-full items-center justify-center mt-4">
      <TouchableOpacity
        className="flex w-full items-center justify-center"
        onPress={() => {
          navigation.push('OrderRouter', {
            screen: 'OrderInfo',
            params: {
              id: id,
            },
          });
        }}>
        <View className=" flex flex-col p-3 w-11/12 h-fit border-[1px] border-gray-300 rounded-t-3xl">
          <View className="flex flex-row items-center w-full h-fit space-x-2 ">
            <Image
              className="w-8 h-8"
              source={require('../../icons/clock.png')}
            />
            <Text className="text-lg text-black">Pakaian Sedang Disetrika</Text>
          </View>
        </View>
        <View className=" flex flex-col p-2 w-11/12  h-fit border-[1px] border-t-0 border-gray-300 rounded-b-3xl">
          <View className="flex flex-row max-w-full box-border p-1">
            <Image
              className="h-12 w-12 rounded-full mr-2"
              source={{uri: `https://i.pravatar.cc/150?u=${email}`}}
            />
            <View className="flex flex-row justify-between items-center w-4/5">
              <View className="flex justify-center space-y-1">
                <Text className="text-base text-black -mb-1">{nama}</Text>
                <View className="flex flex-row items-center">
                  <Text className="text-sm text-black">4.3</Text>
                  <Image
                    source={require('../../icons/star.png')}
                    className="w-5 h-5"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  fiturToast();
                }}>
                <Image
                  className="w-8 h-8"
                  source={require('../../icons/chat.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Paket = () => {
  return (
    <View className="mx-4 mt-4 h-fit flex flex-col flex-wrap space-y-2 justify-center items-center pt-2 box-border">
      <View className="w-full h-fit flex flex-row justify-between items-center">
        <Text className="text-base text-black">Paket Rekomendasi</Text>
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Text className="text-base text-primary">Selengkapnya</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <CardPaket jenis="Gold" />
        <CardPaket jenis="Silver" />
        <CardPaket jenis="Bronze" />
      </ScrollView>
    </View>
  );
};

const CardPaket = ({jenis}: cardParams) => {
  let jumlah;
  let warna;
  let harga = 0;
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  });
  if (jenis === 'Gold') {
    jumlah = '60';
    warna = 'bg-gold';
    harga = 80000;
  } else if (jenis === 'Silver') {
    jumlah = '30';
    warna = 'bg-silver';
    harga = 55000;
  } else if (jenis === 'Bronze') {
    jumlah = '10';
    warna = 'bg-bronze';
    harga = 35000;
  }
  return (
    <View className="w-fit h-fit flex flex-row p-2 space-x-6 border-[1px] border-gray-300 rounded-2xl mr-3">
      <View className="flex h-fit flex-col space-y-3">
        <Text className="text-base text-black">
          Paket {jenis} {jumlah}kg
        </Text>
        <Text className="text-base text-black font-bold">
          {formatter.format(harga)}
        </Text>
      </View>
      <View className={`w-14 h-14 ${warna} rounded-xl`} />
    </View>
  );
};

const Berita = () => {
  return (
    <View className="mx-4 mt-4 h-fit flex flex-col flex-wrap justify-center items-center pt-2 box-border pb-28">
      <View className="w-full h-fit flex flex-row justify-between items-center mb-2">
        <Text className="text-base text-black">Berita Pilihan</Text>
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Text className="text-base text-primary">Selengkapnya</Text>
        </TouchableOpacity>
      </View>
      <CardBerita />
      <CardBerita />
      <CardBerita />
    </View>
  );
};

const CardBerita = () => {
  return (
    <View className="w-full relative rounded-2xl overflow-hidden border-gray-300 border-[1px] mb-3">
      <ImageBackground
        className="px-3 py-4"
        source={require('../../image/strika.jpg')}
        resizeMode="cover">
        <View>
          <Text className="w-2/3 text-base text-black">
            Ikuti keseruan grand opening Strika.in dan menangkan berbagai hadiah
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const BotNavBar = ({alamat}: navbarParams) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className=" w-full h-16 flex flex-row p-2 px-8 items-center justify-between bg-white absolute bottom-0 rounded-t-2xl">
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pr-2">
        <Image source={require('../../icons/home-on.png')} />
        <TouchableOpacity
          onPress={() => {
            navigation.push('History');
          }}>
          <Image source={require('../../icons/order.png')} />
        </TouchableOpacity>
      </View>
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pl-2">
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Image source={require('../../icons/box.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileRouter');
          }}>
          <Image source={require('../../icons/user.png')} />
        </TouchableOpacity>
      </View>
      <View className="w-20 h-20 z-10 bg-white absolute -top-7 left-40 rounded-full box-border p-4  items-center justify-center">
        <TouchableOpacity
          className="h-full w-full"
          onPress={() => {
            setModalVisible(true);
          }}>
          <View className="w-full h-full rounded-full border-[1px] flex items-center justify-center">
            <Text className="text-3xl text-black">+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <OrderModal
        visible={modalVisible}
        set={setModalVisible}
        setParent={setModalVisible}
        alamat={alamat}
      />
    </View>
  );
};

const showAlert = (nav: NativeStackNavigationProp<RootStackParams>) => {
  Alert.alert(
    'Informasi Pengguna Belum Lengkap',
    'Mohon Lengkapi Informasi Pengguna',
    [
      {
        text: 'Lengkapi',
        onPress: () => nav.navigate('ProfileRouter', {screen: 'Main'}),
        style: 'default',
      },
    ],
  );
};

const GetData = (
  id: number,
  set: Function,
  nav: NativeStackNavigationProp<RootStackParams>,
) => {
  try {
    fetch(`http://10.0.2.2:4000/pelanggan/getInfoPelanggan?id=${id}`)
      .then(response => response.json())
      .then(json => {
        set({
          nama: json.data[0].nama,
          email: json.data[0].email,
          telp: json.data[0].telp,
          alamat: json.data[0].alamat,
        });
        if (json.data[0].alamat === '') {
          showAlert(nav);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

const GetGoingOrders = (id: number, set: Function) => {
  try {
    fetch(`http://10.0.2.2:4000/order/going/${id}`)
      .then(response => response.json())
      .then(json => {
        if (json.code === 200) {
          set({
            id: json.data[0].id,
            nama: json.data[0].nama,
            email: json.data[0].email,
          });
        } else {
          set({id: 0, nama: '', email: ''});
        }
      });
  } catch (err) {
    console.log(err);
    set({id: 0, nama: '', email: ''});
  }
};

const fiturToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Fitur Belum Tersedia',
    text2: 'Mohon maaf, fitur dalam tahap pengembangan',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default Home;
