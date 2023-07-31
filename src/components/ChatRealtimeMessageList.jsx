import React, {useState, useEffect} from 'react';
import {Image,TouchableOpacity,Text, View} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  Actions,
  InputToolbar,
} from 'react-native-gifted-chat';
import {CameraIcon, PaperAirplaneIcon} from 'react-native-heroicons/solid';
import ImagePicker from 'react-native-image-picker';
import api from '../../axios';

const ChatRealtimeMessageList = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);

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

// new handle image selection
handleSendPicture = () => {
  ImagePicker.showImagePicker({}, (response) => {
    if (response.didCancel) {
      console.log('ผู้ใช้ยกเลิกการเลือกรูป');
    } else if (response.error) {
      console.log('ข้อผิดพลาดในการเลือกรูป: ', response.error);
    } else {
      const source = { uri: response.uri };
      const message = {
        _id: Math.round(Math.random() * 1000000),
        image: source,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
      };
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [message]),
      }));
    }
  });
};


  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{_id: 1}}
      textInputStyle={{maxHeight: 100}}
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
            bottom: 5,
            zIndex: 999,
          }}
          onPressActionButton={handleSendPicture}
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
            marginBottom: 2,
            borderRadius: 20,
            padding: 5,
          }}
        />
      )}
    />
  );
};

export default ChatRealtimeMessageList;
