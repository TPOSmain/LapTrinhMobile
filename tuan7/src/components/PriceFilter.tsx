import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { PriceRange, PRICE_RANGES } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props { value: PriceRange; onChange: (v: PriceRange) => void; }

export function PriceFilter({ value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {PRICE_RANGES.map((range) => {
        const active = value === range.key;
        return (
          <Pressable key={range.key} style={[styles.button, active && styles.active]}
            onPress={() => onChange(active ? null : range.key)}>
            <Text style={[styles.label, active && styles.activeLabel]}>{range.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingBottom: 10, gap: 8 },
  button: { borderWidth: 1, borderColor: colors.line, backgroundColor: "#fff", borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8 },
  active: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  label: { color: colors.text, fontSize: 12, fontWeight: "700" },
  activeLabel: { color: "#fff" },
});
