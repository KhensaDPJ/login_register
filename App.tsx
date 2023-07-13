import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [Token, setToken] = useState('');

  const ChekcToken = async () => {
    const getToken = await AsyncStorage.getItem('Token');
    if (getToken != null) {
      setToken(getToken)
    } else {
      setToken('')
    }
  }

  useEffect(() => {
    ChekcToken()
  }, [0])


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {Token === '' ? (<>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>) : (<>
          <Stack.Screen name="Home" component={Home} /></>)}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App