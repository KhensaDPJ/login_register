import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';

const ModalAlert = ({message}) => {

  const [visible, setVisible] = React.useState(false);
  const Navigation = useNavigation();

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false),
      Navigation.navigate('Login')    
  };

  React.useEffect(() => {
    showDialog();
  }, []);

  return (
    <PaperProvider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{message}</Text>
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
