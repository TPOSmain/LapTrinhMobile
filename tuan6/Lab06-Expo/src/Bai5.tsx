/**
 * Bai5.tsx – BÀI 5: Drawer (Home / Profile / Settings + Context chế độ tối)
 * Lưu ý: Drawer cần react-native-gesture-handler + react-native-reanimated.
 * Nên test bằng Expo Go trên điện thoại.
 */
import React, { createContext, useContext, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { IonName, colors, g } from "./shared";

/* ============================================================
 * BÀI 5: DRAWER (Home / Profile / Settings + Context chế độ tối)
 * ============================================================ */

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (nâng cao): đưa notify/dark lên Context
interface SettingsCtx {
  notify: boolean;
  dark: boolean;
  setNotify: (v: boolean) => void;
  setDark: (v: boolean) => void;
}
const SettingsContext = createContext<SettingsCtx>({
  notify: true,
  dark: false,
  setNotify: () => {},
  setDark: () => {},
});

function useThemeColors() {
  const { dark } = useContext(SettingsContext);
  return {
    bg: dark ? "#14171F" : "#fff",
    text: dark ? "#F4F5F7" : colors.text,
    muted: dark ? "#9AA1AF" : colors.muted,
  };
}

function DrawerHome() {
  const t = useThemeColors();
  return (
    <View style={[g.center, { backgroundColor: t.bg }]}>
      <Text style={[g.big, { color: t.text }]}>Xin chào 👋</Text>
    </View>
  );
}

function DrawerProfile() {
  const t = useThemeColors();
  return (
    <View style={[g.center, { backgroundColor: t.bg }]}>
      <View style={s5.avatar}>
        <Text style={s5.avatarText}>NA</Text>
      </View>
      <Text style={[g.big, { color: t.text }]}>Nguyễn Văn An</Text>
      <Text style={[g.muted, { color: t.muted }]}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1
function SettingsScreen() {
  const { notify, dark, setNotify, setDark } = useContext(SettingsContext);
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, padding: 20, gap: 16, backgroundColor: t.bg }}>
      <View style={s5.row}>
        <Text style={{ color: t.text, fontSize: 16 }}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s5.row}>
        <Text style={{ color: t.text, fontSize: 16 }}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={{ color: t.muted, marginTop: 12 }}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

const DRAWER_ICONS: Record<keyof DrawerParamList, IonName> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};
const DRAWER_TITLES: Record<keyof DrawerParamList, string> = {
  Home: "Trang chủ",
  Profile: "Hồ sơ",
  Settings: "Cài đặt",
};

// TODO 2
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(
    () => ({ notify, dark, setNotify, setDark }),
    [notify, dark]
  );
  return (
    <SettingsContext.Provider value={value}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            title: DRAWER_TITLES[route.name],
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={DRAWER_ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen name="Home" component={DrawerHome} />
          <Drawer.Screen name="Profile" component={DrawerProfile} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s5 = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "700" },
});
