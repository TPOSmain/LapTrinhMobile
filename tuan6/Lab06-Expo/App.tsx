/**
 * App.tsx – Menu chọn bài (Lab 06 – Navigation)
 *
 *   index.ts          entry (import gesture-handler ở dòng đầu cho Drawer)
 *   src/shared.tsx    dữ liệu + component dùng chung
 *   src/Bai1.tsx      Select Phone (Stack)
 *   src/Bai2.tsx      Gắn API (đọc EXPO_PUBLIC_API_URL từ file .env)
 *   src/Bai3.tsx      Bottom Tab
 *   src/Bai4.tsx      Stack + Tab + Params
 *   src/Bai5.tsx      Drawer
 *   assets/           4 ảnh điện thoại
 */
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PHONES, colors, g } from "./src/shared";
import { SelectPhoneApp } from "./src/Bai1";
import { SelectPhoneApi } from "./src/Bai2";
import { BottomTabApp } from "./src/Bai3";
import { StackTabApp } from "./src/Bai4";
import { DrawerApp } from "./src/Bai5";

const SCREENS: Record<string, () => React.ReactElement> = {
  "Bài 1 – Select Phone": () => <SelectPhoneApp phone={PHONES[0]} />,
  "Bài 2 – Gắn API": () => <SelectPhoneApi />,
  "Bài 3 – Bottom Tab": () => <BottomTabApp />,
  "Bài 4 – Stack + Tab + Params": () => <StackTabApp />,
  "Bài 5 – Drawer": () => <DrawerApp />,
};

export default function App() {
  const [current, setCurrent] = useState<string | null>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {current ? (
          <View style={{ flex: 1 }}>
            <SafeAreaView edges={["top"]} style={sm.backBar}>
              <Pressable onPress={() => setCurrent(null)} style={{ padding: 10 }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>← Menu</Text>
              </Pressable>
            </SafeAreaView>
            <View style={{ flex: 1 }}>{SCREENS[current]()}</View>
          </View>
        ) : (
          <SafeAreaView style={sm.menu}>
            <Text style={[g.big, { marginBottom: 8 }]}>Lab 06 – Navigation</Text>
            {Object.keys(SCREENS).map((k) => (
              <Pressable key={k} style={sm.btn} onPress={() => setCurrent(k)}>
                <Text style={sm.btnText}>{k}</Text>
              </Pressable>
            ))}
          </SafeAreaView>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const sm = StyleSheet.create({
  menu: { flex: 1, justifyContent: "center", padding: 24, gap: 12, backgroundColor: colors.bg },
  btn: { backgroundColor: colors.blue, padding: 16, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  backBar: { backgroundColor: colors.navy },
});
