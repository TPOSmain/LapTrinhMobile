/**
 * Bai1.tsx – BÀI 1: Select Phone (Stack, truyền params và nhận kết quả quay lại)
 */
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  COLOR_ORDER,
  ColorKey,
  Phone,
  PHONE_COLORS,
  Stars,
  colors,
  formatPrice,
} from "./shared";

/* ============================================================
 * BÀI 1: SELECT PHONE (Stack, truyền params và nhận kết quả quay lại)
 * ============================================================ */

type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};
type P1<T extends keyof SelectPhoneParamList> = NativeStackScreenProps<
  SelectPhoneParamList,
  T
> & { phone: Phone };

const Stack1 = createNativeStackNavigator<SelectPhoneParamList>();

function ProductScreen({ navigation, route, phone }: P1<"Product">) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return (
    <SafeAreaView style={s1.root}>
      <View style={s1.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={s1.image} resizeMode="contain" />
      </View>

      <View style={s1.info}>
        <Text style={s1.name}>{phone.name}</Text>
        <View style={s1.row}>
          <Stars value={phone.rating} />
          <Text style={s1.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={s1.row}>
          <Text style={s1.price}>{formatPrice(phone.price)}</Text>
          <Text style={s1.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={s1.row}>
          <Text style={s1.badge}>{phone.badge}</Text>
          <View style={s1.help}>
            <Text style={s1.helpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: nút chọn màu */}
        <Pressable
          style={s1.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={s1.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={s1.chevron}>›</Text>
        </Pressable>
      </View>

      {/* TODO 2: nút CHỌN MUA sát đáy */}
      <Pressable style={s1.buyBtn}>
        <Text style={s1.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function ChooseColorScreen({ navigation, route, phone }: P1<"ChooseColor">) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={s1.ccRoot}>
      <View style={s1.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={s1.thumb}
          resizeMode="contain"
        />
        <View style={s1.headerText}>
          <Text style={s1.small}>{line1}</Text>
          <Text style={s1.small}>{line2}</Text>
          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked && (
            <>
              <Text style={s1.small}>
                Màu: <Text style={s1.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={s1.small}>
                Cung cấp bởi <Text style={s1.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={[s1.small, s1.bold]}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={s1.body}>
        <Text style={s1.hint}>Chọn một màu bên dưới:</Text>
        <View style={s1.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                s1.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && s1.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút XONG */}
        <Pressable
          style={s1.doneBtn}
          onPress={() =>
            // React Navigation 7: popTo quay lại màn Product kèm params mới.
            // (Nếu dùng bản 6: navigation.navigate("Product", { color: picked }, { merge: true }))
            navigation.popTo("Product", { color: picked })
          }
        >
          <Text style={s1.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <NavigationContainer>
      <Stack1.Navigator screenOptions={{ headerShown: false }}>
        <Stack1.Screen name="Product">
          {(props) => <ProductScreen {...props} phone={phone} />}
        </Stack1.Screen>
        <Stack1.Screen name="ChooseColor">
          {(props) => <ChooseColorScreen {...props} phone={phone} />}
        </Stack1.Screen>
      </Stack1.Navigator>
    </NavigationContainer>
  );
}

const s1 = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "80%", height: "100%" },
  info: { paddingVertical: 8, gap: 8 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  review: { color: colors.muted, fontSize: 13 },
  price: { fontSize: 18, fontWeight: "700", color: colors.text },
  oldPrice: { fontSize: 14, color: colors.muted, textDecorationLine: "line-through" },
  badge: { color: colors.red, fontWeight: "700", fontSize: 12 },
  help: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: colors.muted, alignItems: "center", justifyContent: "center" },
  helpText: { fontSize: 11, color: colors.muted },
  chooseBtn: { borderWidth: 1, borderColor: colors.grey, borderRadius: 6, paddingVertical: 12, alignItems: "center", justifyContent: "center", marginTop: 6 },
  chooseText: { fontWeight: "600", color: colors.text },
  chevron: { position: "absolute", right: 12, fontSize: 22, color: colors.muted },
  buyBtn: { backgroundColor: colors.red, borderRadius: 6, paddingVertical: 14, alignItems: "center", marginBottom: 8, marginTop: 8 },
  buyText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  ccRoot: { flex: 1, backgroundColor: colors.grey },
  header: { flexDirection: "row", backgroundColor: "#fff", padding: 16, gap: 14 },
  thumb: { width: 100, height: 120 },
  headerText: { flex: 1, justifyContent: "center", gap: 3 },
  small: { fontSize: 13, color: colors.text },
  bold: { fontWeight: "800" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, alignItems: "center" },
  hint: { alignSelf: "flex-start", marginBottom: 12, color: colors.text },
  swatches: { gap: 14, marginBottom: 20 },
  swatch: { width: 85, height: 80, borderWidth: 2, borderColor: "transparent" },
  swatchOn: { borderColor: colors.navy, borderWidth: 4 },
  doneBtn: { alignSelf: "stretch", backgroundColor: colors.blue, borderRadius: 4, paddingVertical: 14, alignItems: "center", marginTop: "auto" },
  doneText: { color: "#fff", fontWeight: "800" },
});
