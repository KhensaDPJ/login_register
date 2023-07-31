import {View, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatBotMessageList from '../components/ChatBotMessageList';
import ChatRealtimeMessageList from '../components/ChatRealtimeMessageList';

const Chat = ({route}) => {;
  const { name } = route.params;
  return (
    <View className="flex-1 bg-white">
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
      <ChatHeader />
      {name == 'ChatBot' ? <ChatBotMessageList /> : <ChatRealtimeMessageList />}
    </View>
  );
};

export default Chat;
