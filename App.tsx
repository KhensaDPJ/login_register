import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App