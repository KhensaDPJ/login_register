import React, {useState} from 'react';
import {View} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  Actions,
  InputToolbar,
} from 'react-native-gifted-chat';
import {CameraIcon, PaperAirplaneIcon} from 'react-native-heroicons/solid';
import api from '../../axios';

const ChatRealtimeMessageList = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onSend = (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
          right: {
            backgroundColor: '#128040',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View className="justify-center w-full h-full">
          <PaperAirplaneIcon size={28} color={'#128040'} />
        </View>
      </Send>
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{_id: 1}}
      textInputStyle={{maxHeight: 100,marginRight:10}}
      renderBubble={renderBubble}
      renderSend={renderSend}
      quickReplyStyle={{marginLeft: 10, marginRight: 10}}
      isLoadingEarlier={true}
      scrollToBottom={true}
      alignTop={true}
      infiniteScroll={true}
      alwaysShowSend={true}
      //isTyping={isTyping}
      renderActions={
        props => (
        <Actions 
          {...props}
          containerStyle={{
            position: 'absolute',
            right: 50,
            bottom: 3,
            zIndex: 999,
          }}
          // onPressActionButton={handleSendPicture}
          icon={() => <CameraIcon size={30} color={'gray'} />}
        />
      )
    }
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 30,
            padding: 5,
          }}
        />
      )}
    />
  );
};

export default ChatRealtimeMessageList;
