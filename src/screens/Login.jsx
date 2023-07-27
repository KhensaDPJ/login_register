import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';
import {
  HTTP_API,
  HTTP_API2,
  MESSAGE_400,
  MESSAGE_401,
  MESSAGE_403,
  MESSAGE_404,
  MESSAGE_405,
  MESSAGE_409,
  MESSAGE_410,
  MESSAGE_415,
  MESSAGE_500,
  MESSAGE_501,
  MESSAGE_502,
  MESSAGE_503,
  MESSAGE_504,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import api from '../../axios';

const Login = () => {
  const [IconEyeClick, setIconEyeClick] = useState(true);
  const [ErrorEmailMessage, setEmailErrorMessage] = useState('');
  const [ErrorPassWordMessage, setErrorPassWordMessage] = useState('');

  const [CheckEmail, setCheckEmail] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [CheckPassword, setCheckPassword] = useState(false);

  const Navigation = useNavigation();

  const [ModalMessage, setModalMessage] = useState('');

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
      setErrorPassWordMessage('');
      setCheckPassword(false);
      setPassword(text);
      // const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      // if (strongPassword.test(text) === false) {
      //   setErrorPassWordMessage(
      //     'Please choose a better password. Try using a mix of letters, numbers and symbols',
      //   );
      //   setCheckPassword(true);
      //   return false;
      // } else {
      //   setErrorPassWordMessage('');
      //   setCheckPassword(false);
      //   setPassword(text);
      // }
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

  // AsyncStorage Fuction
  // Set AsyncStorage Fuction
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  // Login Fuction
  const LoginHandle =async () => {
    if (CheckEmail == true) {
      setModalMessage('Please check your email.');
    } else if (CheckPassword == true) {
      setModalMessage('Please check your password.');
    } else {
      if (Email === '' && Password === '') {
        setCheckEmail(true);
        setEmailErrorMessage('Please enter your email address');
        setErrorPassWordMessage('Please enter your password');
        setCheckPassword(true);
      } else if (Email === '') {
        setCheckEmail(true);
        setEmailErrorMessage('Please enter your email address');
      } else if (Password === '') {
        setErrorPassWordMessage('Please enter your password');
        setCheckPassword(true);
      } else {
        const data = {
          email: Email,
          password: Password,
        };

        // axios
        //   .post(`${HTTP_API2}api/login`, data)
        await api.post('api/login',data)
          .then(response => {
            // Handle successful login
            if (response.data != null) {
              storeData('Token', response.data.authToken);
              Navigation.navigate('MainContainer', {name: 'MainContainer'});
            }
          })
          .catch(error => {
            console.log(error)
            // Handle login failur
            const status = error.response.status;
            if (status == '400') {
              setModalMessage(MESSAGE_400);
            } else if ((status = '401')) {
              setModalMessage(MESSAGE_401);
            } else if ((status = '404')) {
              setModalMessage(MESSAGE_404);
            } else if ((status = '405')) {
              setModalMessage(MESSAGE_405);
            } else if ((status = '409')) {
              setModalMessage(MESSAGE_409);
            } else if ((status = '410')) {
              setModalMessage(MESSAGE_410);
            } else if ((status = '415')) {
              setModalMessage(MESSAGE_415);
            } else if ((status = '500')) {
              setModalMessage(MESSAGE_500);
            } else if ((status = '501')) {
              setModalMessage(MESSAGE_501);
            } else if ((status = '502')) {
              setModalMessage(MESSAGE_502);
            } else if ((status = '503')) {
              setModalMessage(MESSAGE_503);
            } else if ((status = '504')) {
              setModalMessage(MESSAGE_504);
            }

            // console.log(ModalMessage, status);
          });
      }
    }
  };

  return (
    <ScrollView>
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
              ? 'w-full h-[95%] bg-[#128040] rounded-t-[40px] justify-start items-center pt-4'
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
            <TouchableOpacity
              className="w-full pt-2"
              onPress={() =>
                Navigation.navigate('Register', {name: 'Register'})
              }>
              <Text className="text-white text-center">
                Don't have an account ? Sing Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
