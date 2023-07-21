import { View, Text,Image } from 'react-native'
import React from 'react'

const Product = ({Cat_name}) => {

  return (
    <View className='flex-row gap-2 p-2'>
      <View>
      <Text>{Cat_name}</Text>
      </View>
    </View>
  )
}

export default Product