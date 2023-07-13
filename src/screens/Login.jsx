import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';
import axios from 'axios';
import {HTTP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [IconEyeClick, setIconEyeClick] = useState(true);
  const [ErrorEmailMessage, setEmailErrorMessage] = useState('');
  const [ErrorPassWordMessage, setErrorPassWordMessage] = useState('');

  const [CheckEmail, setCheckEmail] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [CheckPassword, setCheckPassword] = useState(false);

  const Navigation =useNavigation();


  // Validate Email
  const validateEmail = text => {
    if (text === '') {
      setCheckEmail(true);
      setEmailErrorMessage('Please enter your email address');
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setCheckEmail(true);
        setEmailErrorMessage('Invalid email format. Please try again');
        return false;
      } else {
        setCheckEmail(false);
        setEmail(text);
        setEmailErrorMessage('');
      }
    }
  };

  // Validate Password
  const validatePassword = text => {
    if (text === '') {
      setErrorPassWordMessage('Please enter your password');
      setCheckPassword(true);
    } else if (text.length < 6) {
      setErrorPassWordMessage(
        'Please ensure your password is at least 6 characters long',
      );
      setCheckPassword(true);
    } else {
      const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (strongPassword.test(text) === false) {
        setErrorPassWordMessage(
          'Please choose a better password. Try using a mix of letters, numbers and symbols',
        );
        setCheckPassword(true);
        return false;
      } else {
        setErrorPassWordMessage('');
        setCheckPassword(false);
        setPassword(text);
      }
    }
  };

  // Check Show and Hide Keyboard
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Login Alert
  const createTwoButtonAlert = () =>
    Alert.alert('Message', 'Error', [{text: 'OK', onPress: () => {}}]);

  // AsyncStorage Fuction
  // Set AsyncStorage Fuction
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  // Get AsyncStorage Fuction
  const getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(value)
      return value;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Login Fuction
  const LoginHandle = () => {
    const data = {
      email: Email,
      password: Password,
    };

    axios
      .post(`${HTTP_API}auth/login`, data)
      .then(response => {
        // Handle successful login
        if(response.data!=null){
          storeData('Token', response.data.authentication.sessionToken);
          Navigation.navigate('Home',{name:'Home'})
        }else{
          console.log('Data is Null')
        }
      })
      .catch(error => {
        // Handle login failure
        console.log('And af afjafa f')
        console.error(error);
      });
  };

  return (
    <View className="w-full h-screen bg-white flex-1">
      <View
        className={
          keyboardStatus ? 'h-[5%]' : 'h-[25%] justify-center items-center'
        }>
        {keyboardStatus ? (
          ''
        ) : (
          <Image
            source={require('../img/logo.jpg')}
            resizeMode="stretch"
            className="w-[40%] h-[40%]"
          />
        )}
      </View>
      <View
        className={
          keyboardStatus
            ? 'w-full h-[95%] bg-[#128040] rounded-t-[40px] justify-center items-center'
            : 'w-full h-[75%] bg-[#128040] rounded-t-[40px] justify-center items-center'
        }>
        <Text className="text-2xl text-white">Sign in</Text>
        <View className="w-[85%]">
          <View>
            <Text className="text-lg text-white">
              Email <EnvelopeIcon size={16} color={'white'} />{' '}
              <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-white/90 mt-2 border-b-2 border-black h-12 rounded-md flex-row items-center shadow-sm">
              <TextInput
                className="w-[90%] text-base pl-4"
                placeholder="Enter your email"
                inputMode="email"
                autoComplete="email"
                onChangeText={text => validateEmail(text)}
                onSubmitEditing={Keyboard.dismiss}
              />
              <EnvelopeIcon size={30} color={'gray'} />
            </View>
            <Text className="text-red-500">{ErrorEmailMessage}</Text>
          </View>
          <View>
            <Text className="text-lg text-white">
              Password <LockClosedIcon size={16} color={'white'} />{' '}
              <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-white/90 mt-2 border-b-2 border-black h-12 rounded-md flex-row items-center shadow-sm">
              <TextInput
                className="w-[90%] pl-4"
                placeholder="Enter your password"
                inputMode="text"
                secureTextEntry={IconEyeClick ? true : false}
                onChangeText={text => validatePassword(text)}
              />
              <TouchableOpacity
                onPress={() => setIconEyeClick(showPass => !showPass)}>
                {IconEyeClick ? (
                  <EyeIcon size={30} color={'gray'} />
                ) : (
                  <EyeSlashIcon size={30} color={'gray'} />
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-red-500">{ErrorPassWordMessage}</Text>
          </View>
          <TouchableOpacity
            className="p-3 bg-[#069D45] shadow-sm mt-2 rounded-full"
            onPress={LoginHandle}>
            <Text className="text-lg text-white text-center">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className='w-full pt-2' onPress={()=>Navigation.navigate('Register',{name:'Register'})}>
            <Text className='text-white text-center'>Don't have an account ? Sing Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
