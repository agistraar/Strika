/* eslint-disable prettier/prettier */
import {View, SafeAreaView, Image, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, routeOrderParams} from '../OrderRouter';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

type ratingParams = {
  rating: number;
  setRating: Function;
};

const Ulasan = () => {
  const [rating, setRating] = useState(0);
  const navigationOrder =
    useNavigation<NativeStackNavigationProp<routeOrderParams>>();

  const route = useRoute<RootRouteProps<'Ulasan'>>();
  const foto = route.params.foto;
  const nama = route.params.nama;
  const berat = route.params.berat;
  const harga = route.params.harga;
  const durasi = route.params.durasi;
  const rapi = route.params.rapi;
  const kusut = route.params.kusut;

  const [value, onChangeValue] = useState('');
  return (
    <KeyboardAvoidingScrollView>
      <SafeAreaView className="w-full h-full flex items-center justify-center space-y-2 pt-6">
        <View className="absolute self-start top-4 left-4">
          <TouchableOpacity
            onPress={() => {
              navigationOrder.pop();
            }}>
            <Image source={require('../../../icons/back.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require('../../../icons/orderDone.png')} />
        </View>
        <View className="flex items-center">
          <Text className="text-2xl text-black font-bold">Order Selesai!</Text>
          <Text className="text-base text-black">
            Berikan penilaianmu untuk mitra ini
          </Text>
        </View>
        <StarRating rating={rating} setRating={setRating} />
        <View className="w-4/5">
          <View className="flex-row border-[1px] border-gray-300 px-3 py-2 rounded-2xl box-border flex-wrap ">
            <Image
              className="h-12 w-12 rounded-full mr-2"
              source={{uri: `https://i.pravatar.cc/150?u=${foto}`}}
            />
            <View className="flex flex-row justify-between items-center w-4/5">
              <View className="flex justify-center space-y-1">
                <Text className="text-lg text-black -mb-1">
                  {route.params.nama}
                </Text>
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
        </View>
        <View className="w-4/5 flex flex-col justify-start p-1 space-y-1">
          <Text className="text-base text-black">
            Berikan komentar untuk mitra ini:
          </Text>
          <TextInput
            className="w-full border-[1px] border-gray-300 rounded-2xl p-2 text-black"
            multiline
            textAlignVertical="top"
            numberOfLines={6}
            onChangeText={text => onChangeValue(text)}
            value={value}
          />
        </View>
        <View className="w-4/5">
          <TouchableOpacity
            className="w-full bg-primary py-2 rounded-3xl"
            onPress={() => {
              navigationOrder.push('Review', {
                foto: foto,
                nama: nama,
                berat: berat,
                harga: harga,
                durasi: durasi,
                rapi: rapi,
                kusut: kusut,
                rating: rating,
                komentar: value,
              });
            }}>
            <Text className="text-base font-bold text-white w-full text-center">
              Kirim Ulasan
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingScrollView>
  );
};

const StarRating = ({rating, setRating}: ratingParams) => {
  return (
    <View className="flex flex-row space-x-3 mt-2">
      <TouchableOpacity
        onPress={() => {
          if (rating > 1) {
            setRating(1);
          } else if (rating === 1) {
            setRating(0);
          } else {
            setRating(1);
          }
        }}>
        {rating < 1 ? <OffStar /> : <OnStar />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (rating > 2) {
            setRating(2);
          } else if (rating === 2) {
            setRating(1);
          } else {
            setRating(2);
          }
        }}>
        {rating < 2 ? <OffStar /> : <OnStar />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (rating > 3) {
            setRating(3);
          } else if (rating === 3) {
            setRating(2);
          } else {
            setRating(3);
          }
        }}>
        {rating < 3 ? <OffStar /> : <OnStar />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (rating > 4) {
            setRating(4);
          } else if (rating === 4) {
            setRating(3);
          } else {
            setRating(4);
          }
        }}>
        {rating < 4 ? <OffStar /> : <OnStar />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (rating > 5) {
            setRating(5);
          } else if (rating === 5) {
            setRating(4);
          } else {
            setRating(5);
          }
        }}>
        {rating < 5 ? <OffStar /> : <OnStar />}
      </TouchableOpacity>
    </View>
  );
};

const OnStar = () => {
  return <Image source={require('../../../icons/ratingon.png')} />;
};

const OffStar = () => {
  return <Image source={require('../../../icons/rating.png')} />;
};

export default Ulasan;
