import {View, KeyboardAvoidingView, Keyboard} from 'react-native';
import React,{useEffect,useState} from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatBotMessageList from '../components/ChatBotMessageList';
import ChatRealtimeMessageList from '../components/ChatRealtimeMessageList';

const Chat = ({route}) => {;
  const { name } = route.params;
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

  return (
    <View className={keyboardStatus ? 'h-[98%]' : name == 'ChatBot' ? 'h-[100%]' :'h-[92%]'}>
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
      <ChatHeader />
      {name == 'ChatBot' ? <ChatBotMessageList /> : <ChatRealtimeMessageList />}
    </View>
  );
};

export default Chat;
