import {View, Dimensions, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const Banner = () => {
  const img = [
    {
      id: 1,
      image:
        'https://media.wired.com/photos/63728604691ed08cc4b98976/master/w_2560%2Cc_limit/Nike-Swoosh-News-Gear.jpg',
    },
    {
      id: 2,
      image:
        'https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/5a7942db-f487-4aa9-92f2-4ca8cbb96b3a/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%9C%E0%B9%89%E0%B8%B2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AD%E0%B8%B8%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%A1-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B8%E0%B8%A9.png',
    },
    {
      id: 3,
      image:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-shoe-QgD9Gv.png',
    },
    {
      id: 4,
      image:
        'https://cdn.shopify.com/s/files/1/2358/2817/products/Nike-Air-Max-Plus-Triple-Black-604133-050-1.png?v=1638973345',
    },
  ];
  const [currentIndex, setCurrenIndex] = useState(0);
  const {width} = Dimensions.get('window');
  return (
    <>
      <View className="p-1">
        <FlatList
          data={img}
          renderItem={({item}) => (
            <View className="rounded-xl ml-2 mr-2">
              <Image
                source={{uri: item.image}}
                className="h-[120px] w-96 rounded-xl"
                resizeMode="contain"
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrenIndex((x / width).toFixed(0));
          }}
        />
      </View>
      <View className="flex-row w-full justify-center items-center space-x-2 pb-4">
        {img.map((data, index) => (
          <View
            key={data.id}
            className={`${
              currentIndex == index
                ? 'h-2 w-8 rounded-full bg-[#128040]'
                : 'h-2 w-2 rounded-full bg-[#E1E8ED]'
            }`}></View>
        ))}
      </View>
    </>
  );
};

export default Banner;
