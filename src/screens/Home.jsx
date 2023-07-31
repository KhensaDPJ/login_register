import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {HTTP_API, HTTP_API2, MESSAGE_403} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Product from '../components/Product';
import ChatButton from '../components/ChatButton';
import { BellIcon } from 'react-native-heroicons/outline';
import Navbar from '../components/Navbar';
import { TextInput } from 'react-native-paper';

const Home = () => {
  const Navigation = useNavigation();
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ModalMessage, setModalMessage] = useState('');
  const [TokenCheck, setTokenCheck] = useState(true);

  // const [checkStatus, setCheckStatus] = useState(false);
  // const [check, setCheck] = useState(true);

  const GetProductData = async () => {
    try {
      const response = await axios.get(
        `${HTTP_API2}api/product/get/all?page=1`,
      );
      if (response.data != null) {
        const data = response.data.data;
        setProductData(data);
        setIsLoading(false);
        setTokenCheck(false);
      }
    } catch (err) {
      console.log(err);
      const status = err.response.status;
      if (status == '403') {
        setTokenCheck(true);
        setModalMessage(MESSAGE_403);
        await AsyncStorage.removeItem('Token'),
          NativeModules.DevSettings.reload();
      }
    }
  };

  // useEffect(() => {
  //   GetProductData();
  // }, []);

  return (
    <View>
      {/* <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('Token'), Navigation.navigate('Login');
        }}>
        <Text>LogOut</Text>
      </TouchableOpacity> */}
      {
        <ScrollView className="w-full h-screen">
          <View className="flex-1 w-full h-screen">
            {isLoading ? (
              <>
                <View className="w-full h-screen justify-center bg-white">
                  <ActivityIndicator size="large" color={'gray'} />
                </View>
              </>
            ) : (
              <>
              <Navbar/>
              <View className='w-[80%] rounded-full pl-6 bg-[#F1F4FA]'>
              <TextInput className='w-[75%] bg-[#F1F4FA]'   style={{
    borderWidth: 0,
    borderColor: 'transparent',
  }}/>
              </View>
              </>
              // ProductData.map(data => (
              //   <Product
              //     key={data._id}
              //     name={data.product_name}
              //     quantity={data.quantity}
              //     description={data.description}
              //     image_path={data.image_path}
              //   />
              // ))
            )}
          </View>
        </ScrollView>
      }
      <ChatButton />
    </View>
  );
};

export default Home;
