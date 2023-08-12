/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import OrderModal from '../OrderModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Router';

type modalParams = {
  visible: boolean;
  set: Function;
};

const Profile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [logoutVisible, setlogoutVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
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
                  source={require('../../icons/back.png')}
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
              source={{uri: 'https://i.pravatar.cc/150?u=user1@gmail.com'}}
            />
            <View className="flex justify-center w-1/3 py-1">
              <Text className="text-2xl text-black font-bold text-center">
                Tsaritsa
              </Text>
            </View>
          </View>
          <View className="max-w-full box-border px-4 flex flex-row items-center space-x-4 ">
            <Image
              source={require('../../icons/email.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">Email</Text>
              <Text className="text-base text-black ">tsaritsa@gmail.com</Text>
            </View>
          </View>
          <View className="max-w-full box-borderl px-4 flex flex-row items-center space-x-4">
            <Image
              source={require('../../icons/phone.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">
                Nomor Handphone
              </Text>
              <Text className="text-base text-black">081257270074</Text>
            </View>
          </View>
          <View className="max-w-full box-border px-4 flex flex-row items-center space-x-4">
            <Image
              source={require('../../icons/lock.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">Password</Text>
              <TouchableOpacity
                onPress={() => {
                  setPasswordVisible(true);
                }}>
                <Text className="text-base text-primary font-bold underline">
                  Ganti Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="max-w-full box-border px-4 flex flex-row items-center space-x-4 mb-12">
            <Image
              source={require('../../icons/loc.png')}
              className="h-8 w-8"
            />
            <View className="w-10/12">
              <Text className="text-lg text-black font-bold ">Alamat</Text>
              <Text className="text-base text-black">
                Jalan Adi Sucipto Gang Fitrah No. 356 Bangka Belitung Laut,
                Pontianak Tenggara, Pontianak, Kalimantan Barat
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="w-11/12 bg-primary items-center py-2 mx-4 rounded-3xl"
            onPress={() => {}}>
            <Text className="text-base font-bold text-white text-center">
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BotNavBar />
      <PasswordModal visible={passwordVisible} set={setPasswordVisible} />
      <LogoutModal visible={logoutVisible} set={setlogoutVisible} />
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
          <Image source={require('../../icons/home.png')} />
        </TouchableOpacity>

        <Image source={require('../../icons/order.png')} />
      </View>
      <View className=" h-fit w-1/3 flex flex-row items-center justify-between pl-2">
        <TouchableOpacity
          onPress={() => {
            fiturToast();
          }}>
          <Image source={require('../../icons/box.png')} />
        </TouchableOpacity>
        <Image source={require('../../icons/user-on.png')} />
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

const PasswordModal = ({visible, set}: modalParams) => {
  const [pass, setPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [passNew, setPassNew] = useState('');
  const [hidePassNew, setHidePassNew] = useState(true);
  const [passConf, setPassConf] = useState('');
  const [hidePassConf, setHidePassConf] = useState(true);

  const [warning, setWarning] = useState(false);
  const [warningNew, setWarningNew] = useState(false);
  const [warningConf, setWarningConf] = useState(false);

  const setDefault = () => {
    setPass('');
    setHidePass(true);
    setPassNew('');
    setHidePassNew(true);
    setPassConf('');
    setHidePassConf(true);
    setWarning(false);
    setWarningNew(false);
    setWarningConf(false);
  };

  return (
    <Modal
      animationType="none"
      visible={visible}
      onRequestClose={() => {
        set(false);
        setDefault();
      }}>
      <View className="bg-white w-full h-screen p-4 flex-col justify-between">
        <View className="w-full">
          <View className="w-full flex flex-row items-center justify-between mb-8">
            <TouchableOpacity
              onPress={() => {
                set(false);
                setDefault();
              }}>
              <Image source={require('../../icons/back.png')} />
            </TouchableOpacity>
          </View>
          <View className="w-full">
            <Text className="text-xl text-black font-bold mb-2">
              Password Lama
            </Text>
            <View className="flex flex-row items-center w-full mb-1">
              <View className="w-full flex flex-row items-center">
                <TextInput
                  className={`w-full h-10 border-[1px] ${
                    warning ? 'border-red-300' : 'border-gray-300'
                  }  rounded-full p-2 px-5 text-black`}
                  secureTextEntry={hidePass}
                  onChangeText={text => setPass(text)}
                  value={pass}
                  onEndEditing={() => {
                    if (
                      !String(pass).match(
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      )
                    ) {
                      setWarning(true);
                    } else {
                      setWarning(false);
                    }
                  }}
                />
                <TouchableOpacity
                  className="absolute right-4"
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}>
                  {!hidePass ? (
                    <Image
                      source={require('../../icons/eye-close-up.png')}
                      className="h-6 w-6"
                    />
                  ) : (
                    <Image
                      source={require('../../icons/closed-eyes.png')}
                      className="h-6 w-6"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {warning ? (
              <Text className="text-small text-red-600 pl-4">
                Password harus terdiri dari minimal 6 karakter, sebuah simbol,
                huruf kecil, dan huruf besar!
              </Text>
            ) : null}
          </View>
          <View className="w-full mt-4">
            <Text className="text-xl text-black font-bold mb-2">
              Password Baru
            </Text>
            <View className="flex flex-row items-center w-full mb-1">
              <View className="w-full flex flex-row items-center">
                <TextInput
                  className={`w-full h-10 border-[1px] ${
                    warningNew ? 'border-red-300' : 'border-gray-300'
                  }  rounded-full p-2 px-5 text-black`}
                  secureTextEntry={hidePassNew}
                  onChangeText={text => setPassNew(text)}
                  value={passNew}
                  onEndEditing={() => {
                    if (
                      !String(passNew).match(
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      )
                    ) {
                      setWarningNew(true);
                    } else {
                      setWarningNew(false);
                    }
                  }}
                />
                <TouchableOpacity
                  className="absolute right-4"
                  onPress={() => {
                    setHidePassNew(!hidePassNew);
                  }}>
                  {!hidePassNew ? (
                    <Image
                      source={require('../../icons/eye-close-up.png')}
                      className="h-6 w-6"
                    />
                  ) : (
                    <Image
                      source={require('../../icons/closed-eyes.png')}
                      className="h-6 w-6"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {warningNew ? (
              <Text className="text-small text-red-600 pl-4">
                Password harus terdiri dari minimal 6 karakter, sebuah simbol,
                huruf kecil, dan huruf besar!
              </Text>
            ) : null}
          </View>
          <View className="w-full mt-4">
            <Text className="text-xl text-black font-bold mb-2">
              Konfirmasi Password Baru
            </Text>
            <View className="flex flex-row items-center w-full mb-1">
              <View className="w-full flex flex-row items-center">
                <TextInput
                  className={`w-full h-10 border-[1px] ${
                    warning ? 'border-red-300' : 'border-gray-300'
                  }  rounded-full p-2 px-5 text-black`}
                  secureTextEntry={hidePassConf}
                  onChangeText={text => setPassConf(text)}
                  value={passConf}
                  onEndEditing={() => {
                    if (passConf !== pass) {
                      setWarningConf(true);
                    } else {
                      setWarningConf(false);
                    }
                  }}
                />
                <TouchableOpacity
                  className="absolute right-4"
                  onPress={() => {
                    setHidePassConf(!hidePassConf);
                  }}>
                  {!hidePassConf ? (
                    <Image
                      source={require('../../icons/eye-close-up.png')}
                      className="h-6 w-6"
                    />
                  ) : (
                    <Image
                      source={require('../../icons/closed-eyes.png')}
                      className="h-6 w-6"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {warningConf ? (
              <Text className="text-small text-red-600 pl-4">
                Password tidak sesuai!
              </Text>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          className="w-full bg-primary py-2 rounded-3xl"
          onPress={() => {
            if (pass.length >= 6 && passConf === pass) {
              setTimeout(() => {
                set(false);
                setDefault();
              }, 5000);
            }
          }}>
          <Text className="text-base font-bold text-white w-full text-center">
            Ganti Password
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const LogoutModal = ({visible, set}: modalParams) => {
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
              <Image source={require('../../icons/back.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View className="w-full flex flex-row items-center space-x-2 border-b-[1px] py-2">
              <View className="w-1/12">
                <Image
                  source={require('../../icons/remove.png')}
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
                  source={require('../../icons/next.png')}
                  className="w-8 h-8"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="w-full flex flex-row items-center space-x-2 border-b-[1px] py-2">
              <View className="w-1/12">
                <Image
                  source={require('../../icons/sign-out.png')}
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
                  source={require('../../icons/next.png')}
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

const fiturToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Fitur Belum Tersedia',
    text2: 'Mohon maaf, fitur dalam tahap pengembangan',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default Profile;
