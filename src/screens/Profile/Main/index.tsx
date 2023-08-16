/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';
import OrderModal from '../../OrderModal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../Router';
import {useGlobalContext} from '../../../context/context';
import {routerProfParams} from '../ProfileRouter';

type modalParams = {
  visible: boolean;
  set: Function;
  navProf: NativeStackNavigationProp<routerProfParams>;
  navRoot: NativeStackNavigationProp<RootStackParams>;
  resetId: Function;
  id: number;
};

const Main = () => {
  const {userId, setUserId} = useGlobalContext();
  const [data, setData] = useState({nama: '', email: '', telp: '', alamat: ''});

  useFocusEffect(
    useCallback(() => {
      GetData(userId, setData);
    }, [userId]),
  );

  const [logoutVisible, setlogoutVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const profileNav =
    useNavigation<NativeStackNavigationProp<routerProfParams>>();
  return (
    <SafeAreaView className="w-full h-screen bg-gray-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-screen h-screen">
        <View className="flex flex-col space-y-4 max-w-full box-border">
          <View className="flex flex-col max-w-full items-center justify-center box-border p-1 bg-primary rounded-b-2xl py-2">
            <View className="w-full flex flex-row items-center justify-between px-2">
              <TouchableOpacity
                onPress={() => {
                  navigation.pop();
                }}>
                <Image
                  source={require('../../../icons/back.png')}
                  className="h-7 w-7"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setlogoutVisible(true);
                }}>
                <View className=" w-6 flex flex-col space-y-1 justify-center items-center">
                  <View className="bg-black h-1 w-1 rounded-full" />
                  <View className="bg-black h-1 w-1 rounded-full" />
                  <View className="bg-black h-1 w-1 rounded-full" />
                </View>
              </TouchableOpacity>
            </View>
            <Image
              className="h-24 w-24 rounded-full mr-2"
              source={{uri: `https://i.pravatar.cc/150?u=${data.email}`}}
            />
            <View className="flex justify-center w-2/3 py-1">
              <Text className="text-2xl text-black font-bold text-center">
                {data.nama}
              </Text>
            </View>
          </View>
          <View className="max-w-full box-border px-4 flex flex-row items-center space-x-4 ">
            <Image
              source={require('../../../icons/email.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">Email</Text>
              <Text className="text-base text-black ">{data.email}</Text>
            </View>
          </View>
          <View className="max-w-full box-borderl px-4 flex flex-row items-center space-x-4">
            <Image
              source={require('../../../icons/phone.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">
                Nomor Handphone
              </Text>
              <Text className="text-base text-black">{data.telp}</Text>
            </View>
          </View>
          <View className="max-w-full box-border px-4 flex flex-row items-center space-x-4">
            <Image
              source={require('../../../icons/lock.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">Password</Text>
              <TouchableOpacity
                onPress={() => {
                  profileNav.push('Password');
                }}>
                <Text className="text-base text-primary font-bold underline">
                  Ganti Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="max-w-full box-border px-4 flex flex-row items-center space-x-4 mb-12">
            <Image
              source={require('../../../icons/loc.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">Alamat</Text>
              <Text className="text-base text-black">{data.alamat}</Text>
            </View>
          </View>
          <TouchableOpacity
            className="w-11/12 bg-primary items-center py-2 mx-4 rounded-3xl"
            onPress={() => {
              profileNav.push('Edit', {
                email: data.email,
                telp: data.telp,
                nama: data.nama,
                alamat: data.alamat,
              });
            }}>
            <Text className="text-base font-bold text-white text-center">
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BotNavBar />
      <LogoutModal
        visible={logoutVisible}
        set={setlogoutVisible}
        navProf={profileNav}
        navRoot={navigation}
        resetId={setUserId}
        id={userId}
      />
      <Toast position="top" topOffset={20} />
    </SafeAreaView>
  );
};

const BotNavBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View className=" w-full h-16 flex flex-row p-2 px-8 items-center justify-between bg-white absolute bottom-0 rounded-t-2xl">
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pr-2">
        <TouchableOpacity
          onPress={() => {
            navigation.push('Home');
          }}>
          <Image source={require('../../../icons/home.png')} />
        </TouchableOpacity>

        <Image source={require('../../../icons/order.png')} />
      </View>
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pl-2">
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Image source={require('../../../icons/box.png')} />
        </TouchableOpacity>
        <Image source={require('../../../icons/user-on.png')} />
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
      />
    </View>
  );
};

const LogoutModal = ({
  visible,
  set,
  navProf,
  navRoot,
  resetId,
  id,
}: modalParams) => {
  return (
    <Modal
      animationType="none"
      visible={visible}
      onRequestClose={() => {
        set(false);
      }}>
      <View className="bg-white w-full h-screen p-4 flex-col justify-between">
        <View className="w-full">
          <View className="w-full flex flex-row items-center justify-between mb-8">
            <TouchableOpacity
              onPress={() => {
                set(false);
              }}>
              <Image source={require('../../../icons/back.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              try {
                fetch(`http://10.0.2.2:4000/pelanggan/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then(response => response.json())
                  .then(json => {
                    if (json.code === 200) {
                      navProf.reset({
                        index: 0,
                        routes: [{name: 'Main'}],
                      });
                      navRoot.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                      });
                      resetId(0);
                    } else if (json.code === 500) {
                      errorToast();
                    }
                  });
              } catch (err) {
                errorToast();
              }
            }}>
            <View className="w-full flex flex-row items-center space-x-2 border-b-[1px] py-2">
              <View className="w-1/12">
                <Image
                  source={require('../../../icons/remove.png')}
                  className="w-8 h-8"
                />
              </View>
              <View className="w-9/12">
                <Text className="text-lg text-black font-bold">Hapus Akun</Text>
                <Text className="text-xs text-black">
                  Yakin ingin menghapus akun? seluruh informasi akun anda akan
                  terhapus dan tidak bisa anda akses lagi
                </Text>
              </View>
              <View className="w-2/12 items-center justify-center">
                <Image
                  source={require('../../../icons/next.png')}
                  className="w-8 h-8"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              resetId(0);
              navProf.reset({
                index: 0,
                routes: [{name: 'Main'}],
              });
              navRoot.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            }}>
            <View className="w-full flex flex-row items-center space-x-2 border-b-[1px] py-2">
              <View className="w-1/12">
                <Image
                  source={require('../../../icons/sign-out.png')}
                  className="w-8 h-8"
                />
              </View>
              <View className="w-9/12">
                <Text className="text-lg text-black font-bold">Logout</Text>
                <Text className="text-xs text-black">
                  Ingin ganti akun atau keluar? jangan lupa login kembali
                </Text>
              </View>
              <View className="w-2/12 items-center justify-center">
                <Image
                  source={require('../../../icons/next.png')}
                  className="w-8 h-8"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const GetData = (id: number, set: Function) => {
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
      });
  } catch (err) {
    console.log(err);
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

const errorToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Delete Pelanggan Gagal',
    text2: 'Silahkan Coba Lagi Dalam Beberapa Saat',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default Main;
