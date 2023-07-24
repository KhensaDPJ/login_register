import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

const ChatHeader = () => {
  return (
        <View className="h-[60px] bg-white justify-between items-center px-8 flex-row shadow-sm">
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
          <TouchableOpacity>
          <EllipsisVerticalIcon size={30} color={'gray'}/>
          </TouchableOpacity>
        </View>
  )
}

export default ChatHeader