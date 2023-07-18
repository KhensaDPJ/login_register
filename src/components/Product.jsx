import { View, Text,Image } from 'react-native'
import React from 'react'

const Product = ({title,detail,image,price,status}) => {

  return (
    <View className='flex-row gap-2 p-2'>
      {/* <Image source={{uri:image}} className='w-[50%] h-[200px]' resizeMode='stretch'/> */}
      <View>
      <Text className='text-lg'>{status}</Text>
      <Text>{detail}</Text>
      </View>
    </View>
  )
}

export default Product