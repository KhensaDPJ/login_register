import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const ChatHeader = () => {
  const Navigation = useNavigation();
  return (
    <View className=" bg-white  items-center flex-row shadow-sm border-b border-gray-100 gap-4">
      <TouchableOpacity onPress={()=>{
        Navigation.navigate('Home')
      }}>
      <ChevronLeftIcon size={25} color={'gray'} />
      </TouchableOpacity>
      <View className="flex-row w-full h-[60px] items-center">
        <Image
          source={require('../img/logo.jpg')}
          className="w-[10%] h-[70%] rounded-full items-start"
          resizeMode="stretch"
        />
        <View className='w-2 h-2 rounded-full bg-green-600 bottom-3  absolute left-9'></View>
        <View className="ml-4">
          <Text className="text-lg font-bold text-black">
            Auto & Laos company
          </Text>
          <Text className="text-xs text-gray-400">
            Auto & Laos company
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
