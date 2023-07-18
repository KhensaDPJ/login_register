
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [initialRouteName, setInitialRouteName] = useState("");
  const [isLoadPage, setIsloadPage] = useState(false)

  const ChekcToken = async () => {
    const getToken = await AsyncStorage.getItem('Token');
    if (getToken === null) {
      setInitialRouteName('Login')
      setIsloadPage(true);
    } else {
      setInitialRouteName('Home')
      setIsloadPage(true)
    }
  }

  useEffect(() => {
    ChekcToken()
  }, [])
  return (
    <NavigationContainer>
      {!isLoadPage ? null : <Stack.Navigator initialRouteName={'Register'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>}
    </NavigationContainer>
  )
}

export default App