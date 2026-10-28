import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const options = { allowsEditing: true, aspect: [1, 1], quality: 0.7 };

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    ...options,
  });
  if (result.canceled) return null;
  return result.assets[0].uri;
}

export async function takePhoto() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permissão da câmera',
      'Sem acesso à câmera não é possível tirar a foto.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }
  const result = await ImagePicker.launchCameraAsync(options);
  if (result.canceled) return null;
  return result.assets[0].uri;
}