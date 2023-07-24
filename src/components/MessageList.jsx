import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble, Send, QuickReplies} from 'react-native-gifted-chat';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';

const MessageList = () => {

  const [messages, setMessages] = useState([]);
  const [quickReplyOptions, setQuickReplyOptions] = useState([]);

  const handleSend = (newMessages = []) => {
    const newQuickReplyOptions = [
      {title: 'Option 1', value: 'option_1'},
      {title: 'Option 2', value: 'option_2'},
      {title: 'Option 3', value: 'option_3'},
    ];

    setMessages(GiftedChat.append(messages, newMessages));
    setQuickReplyOptions(newQuickReplyOptions);
  };

  const onQuickReply = quickReply => {
    if (quickReply.title === 'Option 1') {
      // Perform action for Option 1
      console.log('Performing action for Option 1');
    } else if (quickReply.title === 'Option 2') {
      // Perform action for Option 2
      console.log('Performing action for Option 2');
    } else if (quickReply.title === 'Option 3') {
      // Perform action for Option 3
      console.log('Performing action for Option 3');
    }
  };

  const renderQuickReplies = props => {
    console.log('This is QuickReplies fuction')
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}>
        {quickReplyOptions.map((quickReply, index) => (
          <TouchableOpacity
            key={index}
            style={{marginRight: 10}}
            onPress={() => onQuickReply(quickReply)}>
            <Text style={{color: '#ffc107'}}>{quickReply.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
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

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{_id: 1}}
      renderBubble={renderBubble}
      renderSend={renderSend}
      quickReplyStyle={{marginLeft: 10, marginRight: 10}}
      onQuickReply={renderQuickReplies}
      isLoadingEarlier ={true}
      scrollToBottom ={true}
      alignTop={true}
      infiniteScroll ={true}
    />
  );
};

export default MessageList;
