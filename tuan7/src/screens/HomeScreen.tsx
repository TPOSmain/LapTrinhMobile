import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors, radius } from "../theme";

type SortOrder = "asc" | "desc" | null;
const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: null, label: "Mặc định" },
  { value: "asc", label: "Giá ↑" },
  { value: "desc", label: "Giá ↓" },
];

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<SortOrder>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [bookData, categoryData] = await Promise.all([getBooks(), getCategories()]);
      setBooks(bookData); setCategories(categoryData);
    } catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  const debouncedKeyword = useDebounce(keyword, 400);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    return sort === null ? filtered : [...filtered].sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);
  }, [books, debouncedKeyword, categoryId, priceRange, sort]);

  const clearFilters = () => {
    setKeyword(""); setCategoryId(null); setPriceRange(null); setSort(null);
  };
  const hasFilter = keyword.trim() !== "" || categoryId !== null || priceRange !== null || sort !== null;

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((value) => !value)} />
      {searchOpen && (
        <SearchBar value={keyword} onChangeText={setKeyword} onClose={() => {
          setSearchOpen(false); setKeyword("");
        }} />
      )}
      {loading ? <LoadingView label="Đang tải sách…" /> : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid data={visibleBooks}
          onPressBook={(book) => navigation.navigate("BookDetail", { bookId: book.id })}
          ListHeaderComponent={
            <View>
              <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              <View style={styles.sortRow}>
                <Text style={styles.sortTitle}>Sắp xếp:</Text>
                {SORT_OPTIONS.map((option) => (
                  <Pressable key={option.label} style={[styles.sortButton, sort === option.value && styles.sortSelected]}
                    onPress={() => setSort(option.value)}>
                    <Text style={[styles.sortLabel, sort === option.value && styles.sortSelectedLabel]}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
              {hasFilter && (
                <Pressable style={styles.clearButton} onPress={clearFilters}>
                  <Text style={styles.clearLabel}>✕ Xóa bộ lọc</Text>
                </Pressable>
              )}
            </View>
          }
          ListEmptyComponent={<EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
            actionLabel="Xóa bộ lọc" onAction={clearFilters} />}
        />
      )}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  sortRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingBottom: 8, gap: 6 },
  sortTitle: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  sortButton: { backgroundColor: "#fff", borderColor: colors.line, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 7 },
  sortSelected: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  sortLabel: { color: colors.text, fontWeight: "700", fontSize: 11 },
  sortSelectedLabel: { color: "#fff" },
  clearButton: { alignSelf: "flex-start", paddingHorizontal: 14, paddingVertical: 4 },
  clearLabel: { color: colors.danger, fontWeight: "700", fontSize: 12 },
});
