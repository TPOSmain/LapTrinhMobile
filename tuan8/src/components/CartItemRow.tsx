import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty]);
  useEffect(() => { setQty(item.quantity); }, [item.quantity]);
  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}><Text style={styles.emoji}>{item.emoji}</Text></View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.controls}>
          <Pressable disabled={!canDec} style={[styles.qtyButton, !canDec && styles.dim]} accessibilityLabel="Giảm" onPress={() => setQty((q) => Math.max(1, q - 1))}>
            <Text style={styles.buttonText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable disabled={!canInc} style={[styles.qtyButton, !canInc && styles.dim]} accessibilityLabel="Tăng" onPress={() => setQty((q) => Math.min(item.stock, q + 1))}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ"><Text style={styles.trash}>🗑️</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 4 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  controls: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  qtyButton: { width: 24, height: 26, borderRadius: 6, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: colors.line },
  dim: { opacity: 0.35 },
  buttonText: { fontWeight: "800", fontSize: 18, color: colors.navy },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 15, minWidth: 10, textAlign: "center" },
  stock: { color: colors.muted, fontSize: 11 },
  trash: { fontSize: 22 },
});
