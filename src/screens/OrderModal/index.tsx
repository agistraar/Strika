/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
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
  alamat: string;
};

const OrderModal = ({visible, set, setParent, alamat}: modalParams) => {
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
        alamat={alamat}
      />
      <View className="h-screen w-full bg-black/25 items-center justify-center -z-10" />
    </Modal>
  );
};

const BottomModal = ({visible, set, setParent, alamat}: modalParams) => {
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
                  alamat: alamat,
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

export default OrderModal;
