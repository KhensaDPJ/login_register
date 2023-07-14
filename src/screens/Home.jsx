import {View, Text, TouchableOpacity,ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {HTTP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Product from '../components/Product';
import {err} from 'react-native-svg/lib/typescript/xml';

const Home = () => {
  const Navigation = useNavigation();
  const [ProductData, setProductData] = useState();

  const LogOut = async () => {
    await AsyncStorage.removeItem('Token');
    Navigation.navigate('Login', {name: 'Login'});
  };


  const GetProductData = async () => {
    await axios
      .get(`${HTTP_API}products`)
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetProductData();
  }, [0]);

  return (
    <>
      <TouchableOpacity onPress={LogOut}>
        <Text>LogOut</Text>
      </TouchableOpacity>
      <ScrollView className='w-full h-screen'>
      <View className='flex-1 bg-red-500 '>
      {ProductData.map(data => (
        <Product
          key={data._id}
          title={data.title}
          detail={data.detail}
          image={data.image}
          price={data.price}
        />
      ))}
      </View>
      </ScrollView>
    </>
  );
};

export default Home;
