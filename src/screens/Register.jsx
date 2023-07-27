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
  UserCircleIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import api from '../../axios';
import ModalAlert from '../components/ModalAlert';

const Register = () => {
  const [IconEyeClick, setIconEyeClick] = useState(true);
  const [IconEyeShowConfirmPasswordClick, setIconEyeShowConfirmPasswordClick] =
    useState(true);
  const [ErrorEmailMessage, setEmailErrorMessage] = useState('');
  const [ErrorPassWordMessage, setErrorPassWordMessage] = useState('');
  const [ErrorUserNameMessage, setErrorUserNameMessage] = useState('');
  const [ErrorConfirmPassWordMessage, setErrorConfirmPassWordMessage] =
    useState('');

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [UserName, setUserName] = useState('');
  const [ShowAlert, setShowAlert] = useState(false);

  const Navigation = useNavigation();

  // Validate Username
  const validateUsername = text => {
    if (text === '') {
      setErrorUserNameMessage('Please enter your username');
    } else {
      setUserName(text);
      setErrorUserNameMessage('');
    }
  };

  // Validate Email
  const validateEmail = text => {
    if (text === '') {
      setEmailErrorMessage('Please enter your email address');
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmailErrorMessage('Invalid email format. Please try again');
        return false;
      } else {
        setEmail(text);
        setEmailErrorMessage('');
      }
    }
  };

  // Validate Password
  const validatePassword = text => {
    if (text === '') {
      setErrorPassWordMessage('Please enter your password');
    } else if (text.length < 6) {
      setErrorPassWordMessage(
        'Please ensure your password is at least 6 characters long',
      );
    } else {
      const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (strongPassword.test(text) === false) {
        setErrorPassWordMessage(
          'Please choose a better password. Try using a mix of letters, numbers and symbols',
        );
        return false;
      } else {
        setErrorPassWordMessage('');
        setPassword(text);
      }
    }
  };

  // Validate Confirm Password
  const validateConfirmPassword = text => {
    if (text === '') {
      setErrorConfirmPassWordMessage('Please enter confirm password');
    } else if (text.length < 6) {
      setErrorConfirmPassWordMessage(
        'Please ensure your password is at least 6 characters long',
      );
    } else {
      const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (strongPassword.test(text) === false) {
        setErrorConfirmPassWordMessage(
          'Please choose a better password. Try using a mix of letters, numbers and symbols',
        );
        return false;
      } else if (Password != text) {
        setErrorConfirmPassWordMessage(
          'Please enter new confirm password. Password not match',
        );
      } else {
        setErrorConfirmPassWordMessage('');
        setConfirmPassword(text);
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

  // Register Fuction
  const RegisterHandle = () => {
    if (
      UserName === '' &&
      Email === '' &&
      Password === '' &&
      ConfirmPassword == ''
    ) {
      setErrorUserNameMessage('Please enter your username');
      setEmailErrorMessage('Please enter your email address');
      setErrorPassWordMessage('Please enter your password');
      setErrorConfirmPassWordMessage('Please enter confirm password');
    } else if (UserName === '') {
      setErrorUserNameMessage('Please enter your username');
    } else if (Email === '') {
      setEmailErrorMessage('Please enter your email address');
    } else if (Password === '') {
      setErrorPassWordMessage('Please enter your password');
    } else if (ConfirmPassword == '') {
      setErrorConfirmPassWordMessage('Please enter confirm password');
    } else {
      const data = {
        email: Email,
        password: Password,
        username: UserName,
      };

      api
        .post(`api/register`, data)
        .then(response => {
          // Handle successful register
          if (response.data != null) {
            setShowAlert(true);
          }
        })
        .catch(error => {
          // Handle register failur
          console.error(error);
        });
    }
  };

  return (
    <ScrollView>
      <View className="w-full h-screen bg-white flex-1">
        <View
          className={
            keyboardStatus ? 'h-[5%]' : 'h-[15%] justify-center items-center'
          }>
          {keyboardStatus ? (
            ''
          ) : (
            <Image
              source={require('../img/logo.jpg')}
              resizeMode="stretch"
              className="w-[30%] h-[30%]"
            />
          )}
        </View>
        <View
          className={
            keyboardStatus
              ? 'w-full h-[95%] bg-[#128040] rounded-t-[40px] justify-start pt-4 items-center'
              : 'w-full h-[85%] bg-[#128040] rounded-t-[40px] justify-center items-center'
          }>
          <Text className="text-2xl text-white">Sign up</Text>
          <View className="w-[85%]">
            <View>
              <Text className="text-lg text-white">
                Username <UserCircleIcon size={16} color={'white'} />{' '}
                <Text className="text-red-500">*</Text>
              </Text>
              <View className="bg-white/90 mt-2 border-b-2 border-black h-12 rounded-md flex-row items-center shadow-sm">
                <TextInput
                  className="w-[90%] text-base pl-4"
                  placeholder="Enter your username"
                  onChangeText={text => validateUsername(text)}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <UserCircleIcon size={30} color={'gray'} />
              </View>
              <Text className="text-red-500">{ErrorUserNameMessage}</Text>
            </View>
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
            <View>
              <Text className="text-lg text-white">
                Confirm password <LockClosedIcon size={16} color={'white'} />{' '}
                <Text className="text-red-500">*</Text>
              </Text>
              <View className="bg-white/90 mt-2 border-b-2 border-black h-12 rounded-md flex-row items-center shadow-sm">
                <TextInput
                  className="w-[90%] pl-4"
                  placeholder="Confirm password"
                  inputMode="text"
                  secureTextEntry={
                    IconEyeShowConfirmPasswordClick ? true : false
                  }
                  onChangeText={text => validateConfirmPassword(text)}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIconEyeShowConfirmPasswordClick(showPass => !showPass)
                  }>
                  {IconEyeShowConfirmPasswordClick ? (
                    <EyeIcon size={30} color={'gray'} />
                  ) : (
                    <EyeSlashIcon size={30} color={'gray'} />
                  )}
                </TouchableOpacity>
              </View>
              <Text className="text-red-500">
                {ErrorConfirmPassWordMessage}
              </Text>
            </View>
            <TouchableOpacity
              className="p-3 bg-[#069D45] shadow-sm mt-2 rounded-full"
              onPress={RegisterHandle}>
              <Text className="text-lg text-white text-center">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full pt-2"
              onPress={() => Navigation.navigate('Login', {name: 'Login'})}>
              <Text className="text-white text-center">
                Do have an account ? Sing Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {ShowAlert ? (
        <ModalAlert
          title={'Register Successful!'}
          detail={'You can close this dialog and continue login'}
          navigate={'Login'}
          image={'https://cdn-icons-png.flaticon.com/512/7518/7518748.png'}
        />
      ) : null}
    </ScrollView>
  );
};

export default Register;
