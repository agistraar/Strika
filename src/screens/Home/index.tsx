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
import {SelectList} from 'react-native-dropdown-select-list';

type modalParams = {
  visible: boolean;
  set: Function;
};

const Home = () => {
  return (
    <SafeAreaView className=" flex flex-col w-full h-screen justify-start items-center box-border bg-white">
      <ScrollView className=" h-full w-full box-border">
        <View className="flex p-4 pt-8 pb-6 items-center w-full border-b-[1px] border-gray-300 rounded-b-3xl">
          <Profile />
          <View className="p-2 flex flex-row space-x-4 items-center w-fit">
            <CardMember />
            <CardMember />
          </View>
        </View>
        <InfoSetrika />
        <Paket />
        <Berita />
      </ScrollView>
      <BotNavBar />
    </SafeAreaView>
  );
};

const Profile = () => {
  return (
    <View className="flex flex-row max-w-full box-border p-1">
      <Image
        className="h-12 w-12 rounded-full mr-2"
        source={require('../../image/agis.png')}
      />
      <View className="flex flex-row justify-between items-center w-72">
        <View className="flex justify-center">
          <Text className="text-base text-black -mb-1">
            Selamat datang kembali,
          </Text>
          <Text className="text-xl text-black font-bold">Tsaritsa</Text>
        </View>
        <Image className="h-6 w-6" source={require('../../icons/notif.png')} />
      </View>
    </View>
  );
};

const CardMember = () => {
  return (
    <View className="p-2 flex flex-row space-x-4 items-center w-fit">
      <View className="bg-primary flex p-3 space-y-2 rounded-3xl">
        <View className="flex flex-row justify-between space-x-8 h-fit w-fit">
          <Text className="text-base text-white">Paket Gold</Text>
          <Image
            className="w-6 h-6"
            source={require('../../icons/member.png')}
          />
        </View>
        <View className="w-full h-1 bg-white">
          <View className="w-10 h-full bg-yellow-400"></View>
        </View>
        <Text className="text-sm text-slate-50">Tersisa 7Kg</Text>
      </View>
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
            source={require('../../image/agis.png')}
          />
          <View className="flex flex-row justify-between items-center w-4/5">
            <View className="flex justify-center">
              <Text className="text-base text-black -mb-1">Ibu Yoimiya</Text>
              <Text className="text-xl text-black font-bold">Tsaritsa</Text>
            </View>
            <Image
              className="w-8 h-8"
              source={require('../../icons/chat.png')}
            />
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
        <Text className="text-base text-primary">Selengkapnya</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <CardPaket />
        <CardPaket />
        <CardPaket />
      </ScrollView>
    </View>
  );
};

const CardPaket = () => {
  return (
    <View className="w-fit h-fit flex flex-row p-2 space-x-6 border-[1px] border-gray-300 rounded-2xl mr-3">
      <View className="flex h-fit flex-col space-y-3">
        <Text className="text-base text-black">Paket Gold 15kg</Text>
        <Text className="text-base text-black font-bold">45.000</Text>
      </View>
      <View className="w-14 h-14 bg-yellow-400 rounded-xl"></View>
    </View>
  );
};

const Berita = () => {
  return (
    <View className="mx-4 mt-4 h-fit flex flex-col flex-wrap justify-center items-center pt-2 box-border pb-28">
      <View className="w-full h-fit flex flex-row justify-between items-center mb-2">
        <Text className="text-base text-black">Berita Pilihan</Text>
        <Text className="text-base text-primary">Selengkapnya</Text>
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
    <View className="w-full h-28 absolute bottom-0 flex items-center justify-center">
      <View className=" w-full h-3/5 flex flex-row p-2 px-8 items-center justify-between bg-white absolute bottom-0 rounded-t-2xl">
        <View className=" h-fit w-1/3 flex flex-row items-center justify-between pr-2">
          <Image source={require('../../icons/home.png')} />
          <Image source={require('../../icons/order.png')} />
        </View>
        <View className=" h-fit w-1/3 flex flex-row items-center justify-between pl-2">
          <Image source={require('../../icons/box.png')} />
          <Image source={require('../../icons/user.png')} />
        </View>
      </View>
      <View className="w-20 h-20 z-10 bg-white absolute top-4 rounded-full box-border p-4 flex items-center justify-center">
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
      <BottomModal visible={modalVisible} set={setModalVisible} />
    </View>
  );
};

const BottomModal = ({visible, set}: modalParams) => {
  const [berat, onChangeBerat] = useState('0');
  const [selectedPaket, setSelectedPaket] = useState('');
  const [selectedDurasi, setSelectedDurasi] = useState('');

  const dataPaket = [
    {key: '1', value: 'Paket Bronze'},
    {key: '2', value: 'Paket Silver'},
    {key: '3', value: 'Paket Gold'},
  ];

  const dataDurasi = [
    {key: '1', value: 'Reguler'},
    {key: '2', value: 'Kilat'},
  ];

  console.log(selectedPaket);
  console.log(selectedDurasi);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        set(false);
      }}>
      <View className="h-screen w-full bg-gray-100/50">
        <TouchableWithoutFeedback
          onPress={() => {
            set(false);
          }}>
          <View className="h-full w-full"></View>
        </TouchableWithoutFeedback>
        <View className="flex justify-center items-center absolute bottom-0 bg-white w-full h-fit py-4 px-8 space-y-3 rounded-t-3xl">
          <View className="w-full flex justify-start">
            <Text className="text-lg text-black">Berat Pakaian</Text>
          </View>
          <View className="flex flex-row w-full h-12">
            <TouchableOpacity
              className="w-1/4"
              onPress={() => {
                let val = Number(berat) - 1;
                onChangeBerat(val.toString());
              }}>
              <View className="w-full h-full bg-primary rounded-l-3xl flex justify-center items-center">
                <Image source={require('../../icons/min.png')} />
              </View>
            </TouchableOpacity>
            <View className="w-2/4 flex flex-row items-center">
              <TextInput
                className="w-3/4 text-right text-lg font-bold"
                onChangeText={onChangeBerat}
                value={berat}
                keyboardType="numeric"
              />
              <Text className="w-1/4 text-lg text-black font-bold">Kg</Text>
            </View>
            <TouchableOpacity
              className="w-1/4"
              onPress={() => {
                let val = Number(berat) + 1;
                onChangeBerat(val.toString());
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
              Berat pakaian akan ditimbang ulang oleh penyetrika untuk
              memastikan berat asli pakaian
            </Text>
          </View>
          <View className="w-full flex justify-start">
            <Text className="text-lg text-black">Gunakan Paket</Text>
          </View>
          <SelectList
            search={false}
            dropdownTextStyles={{color: '#000000'}}
            placeholder="Pilih Paket"
            boxStyles={{borderRadius: 30, width: 320}}
            dropdownStyles={{width: 320}}
            setSelected={(val: React.SetStateAction<string>) =>
              setSelectedPaket(val)
            }
            data={dataPaket}
            save="value"
          />
          <View className="w-full flex justify-start">
            <Text className="text-lg text-black">Durasi Pengerjaan</Text>
          </View>
          <SelectList
            search={false}
            dropdownTextStyles={{color: '#000000'}}
            defaultOption={{key: '1', value: 'Reguler'}}
            boxStyles={{borderRadius: 30, width: 320}}
            dropdownStyles={{width: 320}}
            setSelected={(val: React.SetStateAction<string>) =>
              setSelectedDurasi(val)
            }
            data={dataDurasi}
            save="value"
          />
          <TouchableOpacity
            className="w-full bg-primary py-2 rounded-3xl"
            onPress={() => {
              navigation.replace('Detail');
            }}>
            <Text className="text-base font-bold text-white w-full text-center">
              Tambah Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Home;
