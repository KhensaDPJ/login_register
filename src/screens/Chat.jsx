import {View, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

const Chat = () => {
  return (
    <SafeAreaView>
      <View className="w-full h-screen">
        <View className="h-[10%] bg-white justify-between items-center px-8 flex-row">
          <Image
            source={require('../img/logo.jpg')}
            className="w-[10%] h-[70%] rounded-full"
            resizeMode="stretch"
          />
          <View className='ml-4'>
            <Text className="text-lg font-bold text-black">
              Auto & Laos company
            </Text>
            <Text className="text-green-800">Online</Text>
          </View>
          <EllipsisVerticalIcon size={30} color={'gray'}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
