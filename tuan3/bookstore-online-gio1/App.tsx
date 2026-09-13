import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';

// Bắt buộc dùng ngoặc nhọn { } cho toàn bộ components vì tất cả đều là named exports
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';

// Import dữ liệu sách
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(4);

  return (
    <SafeAreaView style={styles.screen}>
      {/* TẦNG 1: Header */}
      <Header />

      {/* TẦNG 2: Khu vực cuộn */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CategoryChips />
        
        {/* Truyền thêm hàm onPressBook giả lập để không bị báo thiếu Props */}
        <BookGrid 
          books={BOOKS} 
          onPressBook={(id) => console.log('Đã chọn sách có ID:', id)} 
        />
      </ScrollView>

      {/* TẦNG 3: Nút giỏ hàng nổi */}
      <FloatingCartButton 
        count={cartCount} 
        onPress={() => console.log('Đã bấm giỏ hàng')} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative', 
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, 
  },
});