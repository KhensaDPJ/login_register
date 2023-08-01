import React from 'react';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  ShoppingCartIcon,
  AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/solid';
import ShoppingCart from './ShoppingCart';

const MainContainer = () => {
  const Tab = createBottomTabNavigator();


  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 30,
        },
        tabBarActiveTintColor: '#128040',
        tabBarHideOnKeyboard: true,
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          tabBarIcon: ({color, size}) => (
            <ShoppingCartIcon size={size} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({color, size}) => (
            <AdjustmentsHorizontalIcon size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
