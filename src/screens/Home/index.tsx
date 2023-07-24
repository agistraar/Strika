/* eslint-disable prettier/prettier */
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Router';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';

type modalParams = {
  visible: boolean;
  set: Function;
  setParent: Function;
};

type cardParams = {
  jenis: string;
};

const Home = () => {
  return (
    <SafeAreaView className=" flex flex-col w-full h-screen justify-start items-center box-border bg-white">
      <ScrollView className=" h-full w-full box-border">
        <View className="flex p-4 pt-8 pb-6 items-center w-full border-b-[1px] border-gray-300 rounded-b-3xl">
          <Profile />
          <View className="px-2 pt-6 pb-0 flex flex-row items-center justify-center w-full">
            <CardMember />
          </View>
        </View>
        <InfoSetrika />
        <Paket />
        <Berita />
      </ScrollView>
      <BotNavBar />
      <Toast position="top" topOffset={20} />
    </SafeAreaView>
  );
};

const Profile = () => {
  return (
    <View className="flex flex-row max-w-full box-border p-1">
      <Image
        className="h-12 w-12 rounded-full mr-2"
        source={{uri: 'https://i.pravatar.cc/150?u=user1@gmail.com'}}
      />
      <View className="flex flex-row justify-between items-center w-72">
        <View className="flex justify-center">
          <Text className="text-base text-black -mb-1">
            Selamat datang kembali,
          </Text>
          <Text className="text-xl text-black font-bold">Tsaritsa</Text>
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
        <View className="w-10 h-full bg-yellow-400 rounded-2xl" />
      </View>
      <Text className="text-sm text-slate-50">Tersisa 7Kg</Text>
    </View>
  );
};

const InfoSetrika = () => {
  return (
    <View className=" flex w-full items-center justify-center mt-4">
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
            source={{uri: 'https://i.pravatar.cc/150?u=yoimiya@gmail.com'}}
          />
          <View className="flex flex-row justify-between items-center w-4/5">
            <View className="flex justify-center space-y-1">
              <Text className="text-base text-black -mb-1">Ibu Yoimiya</Text>
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
    style: 'currency',
    currency: 'IDR',
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

const BotNavBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className=" w-full h-16 flex flex-row p-2 px-8 items-center justify-between bg-white absolute bottom-0 rounded-t-2xl">
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pr-2">
        <Image source={require('../../icons/home.png')} />
        <TouchableOpacity
          onPress={() => {
            fiturToast();
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
            fiturToast();
          }}>
          <Image source={require('../../icons/user.png')} />
        </TouchableOpacity>
      </View>
      <View className="w-20 h-20 z-10 bg-white absolute -top-7 right-1/2 left-1/2 rounded-full box-border p-4 flex items-center justify-center">
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
      <BgModal
        visible={modalVisible}
        set={setModalVisible}
        setParent={setModalVisible}
      />
    </View>
  );
};

const BgModal = ({visible, set, setParent}: modalParams) => {
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
      }}>
      <BottomModal
        visible={menuVisible}
        set={setMenuVisible}
        setParent={setParent}
      />
      <View className="h-screen w-full bg-black/25 items-center justify-center -z-10" />
    </Modal>
  );
};

const BottomModal = ({visible, set, setParent}: modalParams) => {
  const [berat, onChangeBerat] = useState('0');
  const [openKusut, setOpenKusut] = useState(false);
  const [openRapi, setOpenRapi] = useState(false);
  const [openDurasi, setOpenDurasi] = useState(false);
  const [selectedKusut, setSelectedKusut] = useState('');
  const [selectedRapi, setSelectedRapi] = useState('');
  const [selectedDurasi, setSelectedDurasi] = useState('');

  const [dataKotor, setDataKotor] = useState([
    {label: 'Diantar Pelanggan', value: 'Diantar'},
    {label: 'Diambil Mitra', value: 'Diambil'},
  ]);

  const [dataBersih, setDataBersih] = useState([
    {label: 'Diantar Mitra', value: 'Diantar'},
    {label: 'Diambil Pelanggan', value: 'Diambil'},
  ]);

  const [dataDurasi, setDataDurasi] = useState([
    {label: 'Reguler', value: 'Reguler'},
    {label: 'Kilat', value: 'Kilat'},
  ]);

  const isValid = () => {
    if (
      berat === '0' ||
      selectedKusut === '' ||
      selectedRapi === '' ||
      selectedDurasi === '' ||
      berat === ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        set(false);
        setParent(false);
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          set(false);
          setParent(false);
        }}>
        <View className="h-screen w-full -z-10" />
      </TouchableWithoutFeedback>
      <View className="flex justify-center items-center absolute bottom-0 bg-white w-full h-fit py-6 px-6 space-y-3 rounded-t-3xl">
        <View className="w-full flex justify-start">
          <Text className="text-lg text-black">Berat Pakaian</Text>
        </View>
        <View className="flex flex-row w-full h-10">
          <TouchableOpacity
            className="w-1/5"
            onPress={() => {
              if (Number(berat.replace(',', '.')) > 0) {
                let val = Number(berat.replace(',', '.')) - 1;
                onChangeBerat(val.toString().replace('.', ','));
              }
            }}>
            <View className="w-full h-full bg-primary rounded-l-3xl flex justify-center items-center">
              <Image source={require('../../icons/min.png')} />
            </View>
          </TouchableOpacity>
          <View className="w-3/5 flex flex-row items-center h-full">
            <TextInput
              className="w-3/4 text-right text-black text-lg font-bold p-0"
              onChangeText={onChangeBerat}
              value={berat}
              keyboardType="numeric"
            />
            <Text className="w-1/4 text-lg text-black font-bold">Kg</Text>
          </View>
          <TouchableOpacity
            className="w-1/5"
            onPress={() => {
              let val = Number(berat.replace(',', '.')) + 1;
              onChangeBerat(val.toString().replace('.', ','));
            }}>
            <View className="w-full h-full bg-primary rounded-r-3xl flex justify-center items-center">
              <Image source={require('../../icons/addpng.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-full flex flex-row mt-4 box-border items-start space-x-2">
          <View className="w-6 h-fit bg-black rounded-full flex items-center justify-center">
            <Text className="text-white text-base font-bold">i</Text>
          </View>
          <Text className="text-black text-sm -mt-1">
            Berat pakaian akan ditimbang ulang oleh penyetrika untuk memastikan
            berat asli pakaian
          </Text>
        </View>
        <View className="w-full flex justify-start">
          <Text className="text-lg text-black">
            Metode Transportasi Pakaian Kusut
          </Text>
        </View>
        <DropDownPicker
          open={openKusut}
          value={selectedKusut}
          items={dataKotor}
          setOpen={setOpenKusut}
          setValue={setSelectedKusut}
          setItems={setDataKotor}
          placeholder="Pilih Metode"
          dropDownDirection="BOTTOM"
          style={{
            borderRadius: 30,
            paddingHorizontal: 20,
          }}
          dropDownContainerStyle={{
            position: 'relative',
            height: 90,
            top: -2,
            borderRadius: 30,
          }}
        />
        <View className="w-full flex justify-start">
          <Text className="text-lg text-black">
            Metode Transportasi Pakaian Rapi
          </Text>
        </View>
        <DropDownPicker
          open={openRapi}
          value={selectedRapi}
          items={dataBersih}
          setOpen={setOpenRapi}
          setValue={setSelectedRapi}
          setItems={setDataBersih}
          placeholder="Pilih Metode"
          dropDownDirection="BOTTOM"
          style={{
            borderRadius: 30,
            paddingHorizontal: 20,
          }}
          dropDownContainerStyle={{
            position: 'relative',
            height: 90,
            top: -2,
            borderRadius: 30,
          }}
        />
        <View className="w-full flex justify-start">
          <Text className="text-lg text-black">Durasi Pengerjaan</Text>
        </View>
        <DropDownPicker
          open={openDurasi}
          value={selectedDurasi}
          items={dataDurasi}
          setOpen={setOpenDurasi}
          setValue={setSelectedDurasi}
          setItems={setDataDurasi}
          placeholder="Pilih Durasi"
          dropDownDirection="BOTTOM"
          style={{borderRadius: 30, paddingHorizontal: 20}}
          dropDownContainerStyle={{
            position: 'relative',
            height: 90,
            top: -2,
            borderRadius: 30,
          }}
        />
        <TouchableOpacity
          className="w-full bg-primary py-2 rounded-3xl"
          onPress={() => {
            if (isValid()) {
              navigation.navigate('OrderRouter', {
                screen: 'Detail',
                params: {
                  berat: parseFloat(berat.replace(',', '.')),
                  kusut: selectedKusut,
                  rapi: selectedRapi,
                  durasi: selectedDurasi,
                },
              });
              set(false);
              setParent(false);
            } else {
              orderToast();
            }
          }}>
          <Text className="text-base font-bold text-white w-full text-center">
            Tambah Order
          </Text>
        </TouchableOpacity>
      </View>
      <Toast position="top" topOffset={20} />
    </Modal>
  );
};

const orderToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Data Order Belum Lengkap',
    text2: 'Mohon Lengkapi Data Order',
    autoHide: true,
    visibilityTime: 3000,
  });
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
