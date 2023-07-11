import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';
const Login = () => {
  const [IconEyeClick, setIconEyeClick] = useState(true);
  const [ErrorEmailMessage, setEmailErrorMessage] = useState('Please enter a valid email');

  const [CheckEmail, setCheckEmail] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [CheckPassword,setCheckPassword]=useState(false)

  const validateEmail = text => {
    if (text === '') {
      setCheckEmail(false);
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmail({email: text});
        setCheckEmail(true);
        setEmailErrorMessage('Please enter a valid email');
        return false;
      } else {
        setCheckEmail(false);
        setEmail({email: text});
      }
    }
  };

  const validatePassword = text => {                          
    const strongPassword= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (strongPassword.test(text) === false) {
      console.log('bad password')
      return false;
    } else {
      console.log('good password')
    }
}

  return (
    <View className="w-full h-screen bg-white flex-1">
      <View className="h-[20%] justify-center items-center">
        <Image
          source={require('../img/logo.jpg')}
          resizeMode="stretch"
          className="w-[40%] h-[40%]"
        />
      </View>
      <View className="w-full h-[80%] bg-[#128040] rounded-t-[40px] justify-center items-center">
        <Text className="text-2xl text-white">Sign in</Text>
        <View className="w-[85%]">
          <View>
            <Text className="text-lg text-white">
              Email <EnvelopeIcon size={16} color={'white'} />
            </Text>
            <View className="bg-white/90 mt-2 border-b-2 border-black h-12 rounded-md flex-row items-center shadow-sm">
              <TextInput
                className="w-[90%] text-base pl-4"
                placeholder="Enter your email"
                inputMode="email"
                autoComplete="email"
                onChangeText={text => validateEmail(text)}
              />
              <EnvelopeIcon size={30} color={'gray'} />
            </View>
            <Text className="text-red-500">{ErrorEmailMessage}</Text>
          </View>
          <View className='mt-1'>
            <Text className="text-lg text-white">
              Password <LockClosedIcon size={16} color={'white'} />
            </Text>
            <View className="bg-white/90 mt-2 border-b-2 border-black h-12 rounded-md flex-row items-center shadow-sm">
              <TextInput
                className="w-[90%] pl-4"
                placeholder="Enter your password"
                inputMode='text'
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
            <Text className="text-red-500">Plese enter your password</Text>
          </View>
          <TouchableOpacity className="p-3 bg-[#069D45] shadow-sm mt-4 rounded-full">
            <Text className="text-lg text-white text-center">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
