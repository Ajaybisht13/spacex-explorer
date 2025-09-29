import { Linking, Platform } from "react-native";

export const openMaps = (lat: number, lon: number) => {
  const url = Platform.select({
    ios: `maps://app?daddr=${lat},${lon}`,
    android: `geo:${lat},${lon}?q=${lat},${lon}`,
  });
  if (url) Linking.openURL(url);
};