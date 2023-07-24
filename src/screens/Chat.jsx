import {View,KeyboardAvoidingView} from 'react-native';
import React from 'react';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';

const Chat = () => {
  return (
    <View className="flex-1 bg-white">
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
      <ChatHeader />
      <MessageList />
    </View>
  );
};

export default Chat;
