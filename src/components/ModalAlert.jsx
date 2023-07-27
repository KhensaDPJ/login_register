import { View, Text,  Modal,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const ModalAlert = ({title,detail,navigate,image}) => {
  const Navigation = useNavigation();
  const [showAlert,setShowAlert]=useState(true);
  return (
    <Modal animationType="fade" transparent={true} visible={showAlert}>
    <View className="w-full h-screen bg-gray-500/50 justify-center items-center p-4 shadow-lg">
      <View className="h-[45%] w-[80%] bg-white rounded-[20px] items-center">
        <Image
          source={{uri:image}}
          className="w-[60px] h-[60px] mt-8 mb-8"
        />
        <Text className="text-xl text-[#069D45] mb-4">
          {title}
        </Text>
        <Text className="text-base">
          {detail}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowAlert(false), Navigation.navigate(navigate);
          }}
          className="bg-[#069D45] w-20 h-10 justify-center items-center rounded-full mt-4">
          <Text className="text-white text-lg font-extrabold">ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  )
}

export default ModalAlert