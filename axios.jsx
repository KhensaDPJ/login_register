import axios from 'axios';
import {HTTP_API2} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

let Token;
const getToken=async()=>{
Token=await AsyncStorage.getItem('Token')
}
getToken();
const api = axios.create({
  baseURL: `${HTTP_API2}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer'+Token
  },
});
export default api;
