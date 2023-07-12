import { View, Text,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {HTTP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

const [Product,setProduct]=useState([])

// const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     return value;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

  const ProductData = () => {
    
    axios
      .get(`${HTTP_API}product`)
      .then(response => {
        // Handle successful login
        console.log(response)
        console.log('tfreter')
      })
      .catch(error => {
        // Handle login failure
        console.log('tfreter')
        console.error(error);
      });
  };

  return (
    <TouchableOpacity onPress={ProductData}>
      <Text>Home</Text>
    </TouchableOpacity>
  )
}

export default Home