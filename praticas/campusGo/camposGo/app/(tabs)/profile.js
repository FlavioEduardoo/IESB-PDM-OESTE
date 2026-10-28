import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const KEY = '@profile-photo';

export default function Profile() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((uri) => uri && setPhoto(uri))
      .catch(() => {});
  }, []);

  async function save(uri) {
    if (!uri) return;
    setPhoto(uri);
    try {
      await AsyncStorage.setItem(KEY, uri);
    } catch {}
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={async () => save(await pickImage())}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text>Toque para escolher</Text>
          </View>
        )}
      </Pressable>
      <Button title="Tirar foto" onPress={async () => save(await takePhoto())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  placeholder: { backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
});