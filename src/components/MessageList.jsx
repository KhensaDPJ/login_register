import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {GiftedChat, Bubble, Send, QuickReplies} from 'react-native-gifted-chat';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';

const quickReplies = [
  {
    title: '😋 Yes',
    value: 'yes',
  },
  {
    title: '📷 Yes, let me show you with a picture!',
    value: 'yes_picture',
  },
  {
    title: '😞 Nope. What?',
    value: 'no',
  }
];

const initialMessages = [
  {
    _id: 1,
    text: 'Do you like React Native?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native Developer',
      avatar:
        'https://cdn.pixabay.com/photo/2016/04/26/07/57/woman-1353825_1280.png',
    },
    quickReplies: {type: 'radio', values: quickReplies}, // quickReplies prop
  },
  // ...
];

const MessageList = () => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    setMessages(message =>
      GiftedChat.append(message, [
        {
          _id: Math.round(Math.random() * 1000000),
          user: {
            _id: 2,
          },
          quickReplies: {type: 'radio', values: quickReplies}, // quickReplies prop
        },
        // ...
      ]),
    );
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
            backgroundColor: '#0C82FF',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View className="justify-center w-full h-full p-4">
          <PaperAirplaneIcon size={28} color={'#0C82FF'} />
        </View>
      </Send>
    );
  };

  const handleQuickReply = message => {
    for (let value of message) {
      const replyMessage = {
        _id: Math.round(Math.random() * 10000000),
        text: `You selected: this ${value.title}`,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
      };

      // Append the reply message to the messages array
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [replyMessage]),
      );
      setMessages(message =>
        GiftedChat.append(message, [
          {
            text: 'Do you like React Native?',
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native Developer',
              avatar:
                'https://cdn.pixabay.com/photo/2016/04/26/07/57/woman-1353825_1280.png',
            },
            quickReplies: {type: 'radio', values: quickReplies}, // quickReplies prop
          },
          // ...
        ]),
      );
      break;
    }
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
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
      onQuickReply={handleQuickReply}
    />
  );
};

export default MessageList;
