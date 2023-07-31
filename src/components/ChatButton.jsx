import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useState} from 'react';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PlusIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const ChatButton = () => {
  const [icon_1] = useState(new Animated.Value(0));
  const [icon_2] = useState(new Animated.Value(0));
  const [text_1] = useState(new Animated.Value(0));
  const [text_2] = useState(new Animated.Value(0));
  const Navigation = useNavigation();

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);

    Animated.timing(icon_1, {
      toValue: 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 150,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(text_1, {
      toValue: 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(text_2, {
      toValue: 150,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(text_1, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(text_2, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      {pop === false ? (
        <TouchableOpacity
          className="items-end mr-4"
          onPress={() => {
            pop === false ? popIn() : popOut();
          }}>
          {pop === false ? (
            <View className="z-50 h-12 w-12  absolute bottom-32 items-center rounded-3xl border-solid border-2 border-[#128040] shadow-[#128040] shadow-lg flex-1 justify-center bg-white">
              <PlusIcon size={25} color={'#128040'} />
            </View>
          ) : (
            <View className="z-50 h-12 w-12  absolute bottom-32 items-center rounded-3xl border-solid border-2 border-[#128040] shadow-[#128040] shadow-lg flex-1 justify-center bg-white">
              <XMarkIcon size={25} color={'#128040'} />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setPop(false)}
            className="w-full h-screen  absolute bottom-0"></TouchableOpacity>

          <Animated.View
            className="items-end"
            style={{bottom: text_1, right: text_1}}>
            <Text className="text-[#128040] z-50 absolute text-base bottom-24 pb-3.5">
              Chatbot
            </Text>
          </Animated.View>
          <Animated.View
            className="items-end"
            style={{bottom: text_2, right: text_1}}>
            <Text className="text-[#128040] z-50 absolute text-base bottom-24 pb-3.5">
              Chat 1 : 1
            </Text>
          </Animated.View>

          <Animated.View className="items-end mr-4" style={{bottom: icon_1}}>
            <TouchableOpacity onPress={()=>{
                setPop(false),Navigation.navigate('Chat',{name:'ChatBot'})
            }} className="z-50 h-12 w-12  absolute bottom-24 items-center rounded-3xl shadow-[#128040] shadow-lg flex-1 justify-center bg-white">
              <ChatBubbleOvalLeftEllipsisIcon size={25} color={'#128040'} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View className="items-end mr-4" style={{bottom: icon_2}}>
            <TouchableOpacity onPress={()=>{
                setPop(false),Navigation.navigate('Chat',{name:'ChatRealtimeMessageList'})
            }} className="z-50 h-12 w-12  absolute bottom-24 items-center rounded-3xl border-solid shadow-lg flex-1 justify-center bg-white">
              <ChatBubbleLeftRightIcon size={25} color={'#128040'} />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            className="items-end mr-4"
            onPress={() => {
              pop === false ? popIn() : popOut();
            }}>
            {pop === false ? (
              <View className="z-50 h-12 w-12  absolute bottom-32 items-center rounded-3xl border-solid border-2 border-[#128040] shadow-[#128040] shadow-lg flex-1 justify-center bg-white">
                <PlusIcon size={25} color={'#128040'} />
              </View>
            ) : (
              <View className="z-50 h-12 w-12  absolute bottom-32 items-center rounded-3xl border-solid border-2 border-[#128040] shadow-[#128040] shadow-lg flex-1 justify-center bg-white">
                <XMarkIcon size={25} color={'#128040'} />
              </View>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ChatButton;
