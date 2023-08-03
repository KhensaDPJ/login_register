import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';

const Navbar = () => {
  return (
    <View className="w-full h-[8%] flex-row pt-1 pb-1 justify-center">
      <View className="w-[70%] rounded-full bg-white shadow-md">
        <TextInput
          placeholder="Search..."
          className="w-[100%] rounded-full pl-8"
        />
      </View>
      <TouchableOpacity className="justify-center items-center w-10 h-10 p-2 ml-2 rounded-full bg-[#128040] shadow-md">
        <MagnifyingGlassIcon size={25} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
