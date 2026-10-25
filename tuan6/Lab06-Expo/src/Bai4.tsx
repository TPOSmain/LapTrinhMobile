/**
 * Bai4.tsx – BÀI 4: Stack + Tab + Passing Params (+ Context yêu thích)
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  Phone,
  PHONES,
  PHONE_COLORS,
  Stars,
  colors,
  formatPrice,
  g,
} from "./shared";

/* ============================================================
 * BÀI 4: STACK + TAB + PASSING PARAMS (+ Context yêu thích)
 * ============================================================ */

type TabParamList4 = { Products: undefined; Favorites: undefined };
type RootStackParamList4 = {
  Home: NavigatorScreenParams<TabParamList4>;
  ProductDetails: { id: string };
};
type RootProps4<T extends keyof RootStackParamList4> = NativeStackScreenProps<RootStackParamList4, T>;
type TabProps4<T extends keyof TabParamList4> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList4, T>,
  NativeStackScreenProps<RootStackParamList4>
>;

interface FavCtx {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}
const FavoritesContext = createContext<FavCtx | null>(null);

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const toggle = useCallback(
    (id: string) =>
      setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    []
  );
  const value = useMemo(
    () => ({ ids, toggle, has: (x: string) => ids.includes(x) }),
    [ids, toggle]
  );
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites phải nằm trong <FavoritesProvider>");
  return ctx;
}

function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[g.card, s4.row]}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s4.rowImg} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", color: colors.text }}>{phone.name.split(" - ")[0]}</Text>
        <Text style={{ color: colors.red, fontWeight: "700", marginTop: 4 }}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={{ color: colors.muted, fontSize: 22 }}>›</Text>
    </Pressable>
  );
}

// TODO 3
function ProductsTab({ navigation }: TabProps4<"Products">) {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

// TODO 8
function FavoritesTab({ navigation }: TabProps4<"Favorites">) {
  const { ids } = useFavorites();
  const list = PHONES.filter((p) => ids.includes(p.id));
  if (list.length === 0) {
    return (
      <View style={g.center}>
        <Text style={g.muted}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={list}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

// TODO 4–7
function ProductDetailsScreen({ route }: RootProps4<"ProductDetails">) {
  const { id } = route.params;
  const { has, toggle } = useFavorites();
  const phone = PHONES.find((p) => p.id === id);

  if (!phone) {
    return (
      <View style={g.center}>
        <Text style={g.muted}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }
  const saved = has(phone.id);
  return (
    <View style={s4.detail}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s4.detailImg} resizeMode="contain" />
      <Text style={s4.detailName}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={s4.detailPrice}>{formatPrice(phone.price)}</Text>
      <Text style={g.muted}>Cung cấp bởi {phone.supplier}</Text>
      <Pressable
        onPress={() => toggle(phone.id)}
        style={[g.btn, { backgroundColor: saved ? colors.red : colors.blue, marginTop: 16 }]}
      >
        <Text style={g.btnText}>{saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </View>
  );
}

const Stack4 = createNativeStackNavigator<RootStackParamList4>();
const Tab4 = createBottomTabNavigator<TabParamList4>();

// TODO 1
function HomeTabs() {
  return (
    <Tab4.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.red }}
    >
      <Tab4.Screen
        name="Products"
        component={ProductsTab}
        options={{
          title: "Sản phẩm",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab4.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{
          title: "Yêu thích",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab4.Navigator>
  );
}

// TODO 2
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack4.Navigator>
          <Stack4.Screen name="Home" component={HomeTabs} options={{ title: "Cửa hàng" }} />
          <Stack4.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack4.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const s4 = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowImg: { width: 48, height: 60 },
  detail: { flex: 1, alignItems: "center", padding: 20, gap: 8, backgroundColor: "#fff" },
  detailImg: { width: 180, height: 220 },
  detailName: { fontSize: 16, fontWeight: "700", textAlign: "center", color: colors.text },
  detailPrice: { fontSize: 20, fontWeight: "800", color: colors.red },
});
