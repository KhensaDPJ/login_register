import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,NativeModules
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {HTTP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Product from '../components/Product';

const Home = () => {
  const Navigation = useNavigation();
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [checkStatus, setCheckStatus] = useState(false);
  // const [check, setCheck] = useState(true);

  const GetProductData = async () => {
    try {
      const response = await axios.get(`${HTTP_API}product`);
      if (response.data != null) {
        const data = response.data;
        setProductData(data);
        setIsLoading(false);
      }
    } catch (err) {
      const status = err.response.status;
      if (status == '403') {
        setIsLoading(true);
        await AsyncStorage.removeItem('Token'),
        NativeModules.DevSettings.reload();
      }
    }
  };
  // const getData = async () => {
  //   const token = await AsyncStorage.getItem('Token');
  //   if (!checkStatus && !token) {
  //     GetProductData();
  //     setCheckStatus(true);
  //   }
  //   if (checkStatus && token) {
  //     GetProductData();
  //     setCheckStatus(false);
  //   }
  //   if (!checkStatus && token) {
  //     GetProductData();
  //     setCheckStatus(false);
  //   }
  // };

  // setTimeout(async () => {
  //   if ((await AsyncStorage.getItem('Token')) && !checkStatus && check) {
  //     setCheckStatus(true);
  //     setCheck(false);
  //   }
  // }, 1000);

  // useEffect(() => {
  //   getData();
  // }, [checkStatus]);

  useEffect(()=>{
    GetProductData()
  },[])

  return (
    <>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('Token'), Navigation.navigate('Login');
        }}>
        <Text>LogOut</Text>
      </TouchableOpacity>
      {
        <ScrollView className="w-full h-screen">
          <View className="flex-1">
            {isLoading ? (
              <>
                <View className="w-full h-screen justify-center bg-white">
                  <ActivityIndicator size="large" color={'gray'} />
                </View>
              </>
            ) : (
              ProductData.map(data => (
                <Product
                  key={data._id}
                  title={data.title}
                  detail={data.detail}
                  image={data.image}
                  price={data.price}
                  status={data.status}
                />
              ))
            )}
          </View>
        </ScrollView>
      }
    </>
  );
};

export default Home;
