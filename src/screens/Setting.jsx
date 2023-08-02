import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  return (
    <View>
      <Text>Setting</Text>
            <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('Token'), Navigation.navigate('Login');
        }}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
}
 
export default Setting