import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import {Rating, AirbnbRating} from 'react-native-ratings';

const Nearby = () => {
  const img = [
    {
      id: 1,
      image:
        'https://i.etsystatic.com/34302944/r/il/dd5281/3983722959/il_fullxfull.3983722959_n57o.jpg',
      title: 'Nike Air 1',
      address: '1901 Thanridge Cir. Shiloh, Hawaii',
    },
    {
      id: 2,
      image:
        'https://artbasket.store/wordpress/wp-content/uploads/2021/06/Nike-X-Off-White-The-10-Air-Jordan-1-600x800.jpg',
      title: 'Nike Air 2',
      address: '9250 The company CR. Speso, Hawhy not me',
    },
    {
      id: 3,
      image:
        'https://media.gq.com/photos/5e4c2c5440e46c00081a1de5/16:9/w_1280,c_limit/3x2.jpg',
      title: 'Nike Air 3',
      address: '4578 The Pizzar Pz. Pizzar Huk, The Pizzar company',
    },
    {
      id: 4,
      image:
        'https://cdn.shopify.com/s/files/1/2358/2817/products/Nike-Air-Max-Plus-Triple-Black-604133-050-1.png?v=1638973345',
      title: 'Nike Air 4',
      address: '5001 The Pizzar Pz. Pizzar Huk, The Pizzar company',
    },
    {
      id: 5,
      image:
        'https://becauze.net/cdn/shop/products/07cf98b2b96a6c1457b1d167b47fffa4.jpg?v=1566928269&width=1445',
      title: 'Nike Air 5',
      address: '5001 The Pizzar Pz. Pizzar Huk, The Pizzar company',
    },
    {
      id: 6,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTts4NvjwKrE5mCU-lMIb-8WUrHAmURAL0fDuwxmtbW3ht2bwJwYmKSSH3aIn0AmkAXIM&usqp=CAU',
      title: 'Nike Air 6',
      address: '5001 The Pizzar Pz. Pizzar Huk, The Pizzar company',
    },
  ];
  return (
    <>
      <View className="pl-4 pr-4 flex-row justify-between pt-2 pb-2">
        <Text className="text-xl text-black font-bold">Nearby tailors</Text>
        <TouchableOpacity className="flex-row items-center justify-center">
          <Text className="text-sm text-gray-400">See more</Text>
          <ChevronRightIcon color={'gray'} size={20} />
        </TouchableOpacity>
      </View>
      <View className="pl-2 pr-2">
        <ScrollView showsVerticalScrollIndicator={false} className="h-[260px]">
          {img.map(item => (
            <View
              key={item.id}
              className="h-[120px] w-full bg-white rounded-md shadow-sm m-1 items-center pl-2 flex-row pr-14">
              <Image
                source={{uri: item.image}}
                className="w-[60px] h-[60px] bg-black rounded-full"
              />
              <View className="pl-2">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text numberOfLines={2} className="text-sm text-gray-400">
                  {item.address}
                </Text>
                <View className="w-full items-start pt-2">
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={15}
                    onFinishRating={() => {}}
                    reviewColor={null}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Nearby;
