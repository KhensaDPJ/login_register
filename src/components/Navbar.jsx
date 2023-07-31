import {View, Text, Image} from 'react-native';
import React from 'react';
import {BellIcon} from 'react-native-heroicons/outline';

const Navbar = () => {
  return (
    <View className="w-full h-[8%] justify-center">
      <View className='w-full h-[100%] flex-row justify-end items-center gap-4'>
        <BellIcon size={30} color={'gray'}/>
        <Text className="bg-red-500 rounded-full text-white absolute text-[10px] top-0 right-12">
          99+
        </Text>
        <Image
          source={require('../img/chat.png')}
          className="w-[9%] h-[70%] rounded-full"
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

export default Navbar;
