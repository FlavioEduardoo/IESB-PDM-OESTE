import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const pos = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = pos.coords;

  let label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  try {
    const [addr] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (addr) {
      label = [addr.name || addr.street, addr.city].filter(Boolean).join(', ') || label;
    }
  } catch {}

  return { latitude, longitude, label };
}