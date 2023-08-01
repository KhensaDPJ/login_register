import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const Outfit = () => {
  const img = [
    {
      id: 1,
      image:
        'https://i.etsystatic.com/34302944/r/il/dd5281/3983722959/il_fullxfull.3983722959_n57o.jpg',
      title: 'Nike Air 1',
    },
    {
      id: 2,
      image:
        'https://artbasket.store/wordpress/wp-content/uploads/2021/06/Nike-X-Off-White-The-10-Air-Jordan-1-600x800.jpg',
      title: 'Nike Air 2',
    },
    {
      id: 3,
      image:
        'https://media.gq.com/photos/5e4c2c5440e46c00081a1de5/16:9/w_1280,c_limit/3x2.jpg',
      title: 'Nike Air 3',
    },
    {
      id: 4,
      image:
        'https://cdn.shopify.com/s/files/1/2358/2817/products/Nike-Air-Max-Plus-Triple-Black-604133-050-1.png?v=1638973345',
      title: 'Nike Air 4',
    },
    {
      id: 5,
      image:
        'https://becauze.net/cdn/shop/products/07cf98b2b96a6c1457b1d167b47fffa4.jpg?v=1566928269&width=1445',
      title: 'Nike Air 5',
    },
    {
      id: 6,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTts4NvjwKrE5mCU-lMIb-8WUrHAmURAL0fDuwxmtbW3ht2bwJwYmKSSH3aIn0AmkAXIM&usqp=CAU',
      title: 'Nike Air 6',
    },
  ];
  return (
    <View className="pl-2 pr-2">
      <View className="pl-4 pr-4 pb-2 flex-row justify-between">
        <Text className="text-xl text-black font-bold">Outfit</Text>
        <TouchableOpacity className="flex-row items-center justify-center">
          <Text className="text-sm text-gray-400">See more</Text>
          <ChevronRightIcon color={'gray'} size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={img}
        renderItem={({item}) => (
          <View className="h-[190px] w-[125px] bg-white rounded-md shadow-sm m-1">
            <View className="flex-row h-[150px]">
              <Image
                source={{uri: item.image}}
                className="h-[140px] w-[110px] m-2"
                resizeMode="contain"
              />
            </View>
            <View className="flex-row pl-1 items-center gap-2 w-[125px] pr-1">
              <Image
                source={{uri: item.image}}
                className="h-[30px] w-[30px] rounded-full bg-gray-500"
                resizeMode="contain"
              />
              <Text numberOfLines={1} className='text-black font-bold'>{item.title}</Text>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Outfit;
