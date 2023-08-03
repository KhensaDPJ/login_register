import React, {useState, useEffect} from 'react';
import {Image, View, Text} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import api from '../../axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [defaultMessage, setDefaultMessage] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  var defaultMessageId = '';
  var parentId = '';
  var initialMessages = [];
  const timestamp = Date.now();

  const DefaultMessageServerError = () => {
    setIsTyping(false);
    setMessages(message =>
      GiftedChat.append(message, [
        {
          text: 'ຂໍອະໄພເກີດຂໍ້ຜິດພາດ',
          _id: parentId + timestamp.toString(),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'bot',
            avatar:
              'https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg',
          },
          quickReplies: {
            type: 'radio',
            values: initialMessages,
          },
        },
      ]),
    );
  };

  const getDefaultQustion = async () => {
    await api
      .get('api/get/question_main')
      .then(response => {
        if (response.data != null) {
          setDefaultMessage(response.data.data);
          initialMessages = [
            {
              _id: 1,
              text: 'Welcome to auto & laos company',
              createdAt: new Date(),
              user: {
                _id: 2,
                avatar:
                  'https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg',
              },
              quickReplies: {type: 'radio', values: response.data.data},
            },
          ];
          setMessages(initialMessages);
          setIsTyping(false);
        }
      })
      .catch(err => {
        console.log(err);
        DefaultMessageServerError();
      });
  };

  useEffect(() => {
    getDefaultQustion();
  }, []);

  const CustomInputToolbar = () => {
    return <></>;
  };

  const handleSend = (newMessages = []) => {
    //sent message for text input
    setMessages(GiftedChat.append(messages, newMessages));
    setMessages(message =>
      GiftedChat.append(message, [
        {
          _id: Math.round(Math.random() * 1000000),
          user: {
            _id: 2,
          },
          quickReplies: {type: 'radio', values: defaultMessage},
        },
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
            backgroundColor: '#128040',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View className="justify-center w-full h-full p-4">
          <PaperAirplaneIcon size={28} color={'#128040'} />
        </View>
      </Send>
    );
  };

  const handleQuickReply = message => {
    //Auto message for user chat
    if (defaultMessageId == '') {
      for (let data of message) {
        defaultMessageId = data.value;
        setIsTyping(true);
        const replyMessage = {
          _id: defaultMessageId + timestamp.toString(),
          text: `${data.title}`,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'You',
          },
        };
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [replyMessage]),
        );
        break;
      }
    }
    //Auto message for bot chat
    setTimeout(() => {
      if (defaultMessageId != '') {
        const getDefaultQustion = async () => {
          await api
            .get(`api/get/question/${defaultMessageId}`)
            .then(response => {
              if (response.data != null) {
                parentId = response.data.data.Question_button.map(
                  value => value.value,
                );
                setMessages(message =>
                  GiftedChat.append(message, [
                    {
                      text: response.data.data.answer_text.answer,
                      _id: parentId + timestamp.toString(),
                      createdAt: new Date(),
                      user: {
                        _id: 2,
                        name: 'bot',
                        avatar:
                          'https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg',
                      },
                      quickReplies: {
                        type: 'radio',
                        values: response.data.data.Question_button,
                      },
                    },
                  ]),
                );
                setIsTyping(false);
              }
            })
            .catch(err => {
              console.log(err);
              DefaultMessageServerError();
            });
        };
        getDefaultQustion();
      }
    }, 1000);
  };
  return (
    <>
      <GiftedChat
        messages={messages}
        // onSend={handleSend}
        user={{_id: 1}}
        textInputStyle={{maxHeight: 100}}
        renderBubble={renderBubble}
        // renderSend={renderSend}
        quickReplyStyle={{marginLeft: 10, marginRight: 10}}
        isLoadingEarlier={true}
        scrollToBottom={true}
        alignTop={true}
        infiniteScroll={true}
        alwaysShowSend={true}
        isTyping={isTyping}
        onQuickReply={handleQuickReply}
        renderInputToolbar={CustomInputToolbar}
        renderMessageImage={props => {
          return (
            <View className="rounded-[15px] p-2">
              <TouchableOpcity>
                <Image
                  source={{uri: props.currentMessage.image}}
                  resizeMode="contain"
                  className="w-[200px] h-[200px] p-6 rounded-[15px] object-cover"
                />
              </TouchableOpcity>
            </View>
          );
        }}
      />
    </>
  );
};

export default MessageList;
