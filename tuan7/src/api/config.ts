import { Platform } from "react-native";
import Constants from "expo-constants";

// Web: localhost; Android emulator: 10.0.2.2; điện thoại: IP LAN của máy Expo.
// Dùng EXPO_PUBLIC_API_URL khi tự động nhận IP không phù hợp với mạng trường.
const API_PORT = 3000;
function resolveHost(): string {
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (Platform.OS === "android" && (!host || host === "localhost" || host === "127.0.0.1")) return "10.0.2.2";
  return host || "localhost";
}
export const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${resolveHost()}:${API_PORT}`;
