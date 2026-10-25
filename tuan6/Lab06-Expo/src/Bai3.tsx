/**
 * Bai3.tsx – BÀI 3: Bottom Tab (Home / Search / Profile)
 */
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { IonName, PHONES, colors, g } from "./shared";

/* ============================================================
 * BÀI 3: BOTTOM TAB (Home / Search / Profile)
 * ============================================================ */

type TabParamList3 = { Home: undefined; Search: undefined; Profile: undefined };
const Tab3 = createBottomTabNavigator<TabParamList3>();

// [khi chọn, khi không chọn]
const ICONS3: Record<keyof TabParamList3, [IonName, IonName]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};
const TITLES3: Record<keyof TabParamList3, string> = {
  Home: "Trang chủ",
  Search: "Tìm kiếm",
  Profile: "Cá nhân",
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={g.card}>
          <Text>{item.name.split(" - ")[0]}</Text>
        </View>
      )}
    />
  );
}

// TODO 1
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const q = keyword.trim().toLowerCase();
  const results = useMemo(
    () => PHONES.filter((p) => p.name.toLowerCase().includes(q)),
    [q]
  );
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s3.input}
      />
      {results.length === 0 ? (
        <Text style={g.muted}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={g.card}>
              <Text>{item.name.split(" - ")[0]}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// TODO 2
function ProfileTab() {
  return (
    <View style={g.center}>
      <View style={s3.avatar}>
        <Text style={s3.avatarText}>N</Text>
      </View>
      <Text style={g.big}>Nguyễn Văn An</Text>
      <Text style={g.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 3
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab3.Navigator
        screenOptions={({ route }) => ({
          title: TITLES3[route.name],
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS3[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab3.Screen name="Home" component={HomeTab} />
        <Tab3.Screen name="Search" component={SearchTab} />
        <Tab3.Screen name="Profile" component={ProfileTab} />
      </Tab3.Navigator>
    </NavigationContainer>
  );
}

const s3 = StyleSheet.create({
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#fff" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "700" },
});
