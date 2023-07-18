import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalAlert = (props,{ checkStatus}) => {
  const {DataFuction} = props;

  const [visible, setVisible] = React.useState(false);
  const Navigation = useNavigation();

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false),
      Navigation.navigate('Login'),
      AsyncStorage.removeItem('Token')
       checkStatus=true;     
  };

  React.useEffect(() => {
    showDialog();
    DataFuction();
    // console.log(checkStatus)
  }, []);

  return (
    <PaperProvider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default ModalAlert;
