import React from 'react';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Setting from '../screens/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeIcon,ChatBubbleLeftRightIcon,AdjustmentsHorizontalIcon } from 'react-native-heroicons/solid';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon:({color,size})=>( <HomeIcon size={size} color={color}/>)
        }}
      />
            <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon:({color,size})=>( <ChatBubbleLeftRightIcon  size={size} color={color}/>)
        }}
      />
            <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon:({color,size})=>( <AdjustmentsHorizontalIcon size={size} color={color}/>)
        }}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
