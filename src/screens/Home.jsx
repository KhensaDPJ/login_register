import { View, Text,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {HTTP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

const [Product,setProduct]=useState([])

const Navigation =useNavigation();


  const ProductData = () => {
    
    axios
      .get(`${HTTP_API}product`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  };

const LogOut=()=>{
  Navigation.navigate('Login',{name:'Login'})
  AsyncStorage.removeItem('Token')
}

  return (
    <TouchableOpacity onPress={LogOut}>
      <Text>Home</Text>
    </TouchableOpacity>
  )
}

export default Home