/**
 * shared.tsx – Dữ liệu và component dùng chung cho Bài 1 → Bài 5
 */
import React from "react";
import {
  ActivityIndicator,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type IonName = keyof typeof Ionicons.glyphMap;

/* ============================================================
 * 0. DỮ LIỆU VÀ CODE DÙNG CHUNG
 * ============================================================ */

export type ColorKey = "silver" | "red" | "black" | "blue";

export interface Phone {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  supplier: string;
  badge: string;
  colors: ColorKey[];
  defaultColor: ColorKey;
}

export const colors = {
  red: "#E53A2F",
  blue: "#4F63C8",
  navy: "#0B1F5C",
  text: "#1F2430",
  muted: "#6B7280",
  line: "#D8DCE3",
  bg: "#F4F5F7",
  grey: "#C4C4C4",
  star: "#F5C518",
};

// 1790000 -> "1.790.000 đ"
export const formatPrice = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";

// Ảnh điện thoại: nằm trong thư mục assets/ (upload vào Snack, xem hướng dẫn).
// Nếu ảnh trong panel Files của Snack có đường dẫn khác thì sửa lại require cho khớp.
export const PHONE_COLORS: Record<
  ColorKey,
  { label: string; hex: string; image: ImageSourcePropType }
> = {
  silver: { label: "bạc", hex: "#C9EEFA", image: require("../assets/silver.png") },
  red: { label: "đỏ", hex: "#E53A2F", image: require("../assets/red.png") },
  black: { label: "đen", hex: "#000000", image: require("../assets/black.png") },
  blue: { label: "xanh", hex: "#2A4494", image: require("../assets/blue.png") },
};
export const COLOR_ORDER: ColorKey[] = ["silver", "red", "black", "blue"];

const mk = (
  id: string,
  name: string,
  price: number,
  reviewCount: number,
  defaultColor: ColorKey = "blue"
): Phone => ({
  id,
  name: `Điện Thoại ${name} - Hàng chính hãng`,
  price,
  oldPrice: price,
  rating: 5,
  reviewCount,
  supplier: "Tiki Tradding",
  badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
  colors: COLOR_ORDER,
  defaultColor,
});

export const PHONES: Phone[] = [
  mk("1", "Vsmart Joy 3", 1790000, 828),
  mk("2", "Vsmart Live 4", 3990000, 512),
  mk("3", "Vsmart Star 5", 2490000, 301),
  mk("4", "Vsmart Active 3", 4790000, 256),
  mk("5", "Vsmart Aris Pro", 8490000, 97),
  mk("6", "Vsmart Bee 3", 1190000, 640),
];

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <Text style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {"★".repeat(value)}
      <Text style={{ color: colors.line }}>{"★".repeat(5 - value)}</Text>
    </Text>
  );
}

export function Loading() {
  return (
    <View style={g.center}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={{ marginTop: 12, color: colors.muted }}>Đang tải...</Text>
    </View>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={g.center}>
      <Text style={{ color: colors.red, fontWeight: "700", marginBottom: 12, textAlign: "center" }}>
        {message}
      </Text>
      <Pressable onPress={onRetry} style={[g.btn, { backgroundColor: colors.blue }]}>
        <Text style={g.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

export const g = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  btn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 6, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  card: { backgroundColor: "#fff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: colors.line },
  big: { fontSize: 22, fontWeight: "700", color: colors.text },
  muted: { color: colors.muted, marginTop: 4 },
});
