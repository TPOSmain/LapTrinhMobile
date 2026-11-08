# Trả lời câu hỏi bổ sung — Buổi 8 BookStore

**Sinh viên:** Phan Trung Hữu — **MSSV:** 23677881

## 1. Vai trò của cờ `ready`

Ở lần render đầu, Redux có giỏ rỗng vì ứng dụng chưa đọc dữ liệu lưu trong AsyncStorage. Nếu `useAutoPersist` ghi ngay lúc này, mảng rỗng có thể ghi đè giỏ hàng cũ trước khi thao tác khôi phục hoàn thành. Cờ `ready` chỉ chuyển thành `true` sau khi đọc và nạp dữ liệu, nhờ đó tránh mất giỏ hàng.

## 2. Hai điểm không an toàn của token giả

Ứng dụng mẫu tải mật khẩu từ `db.json` và đối chiếu ở phía client nên người dùng có thể xem mật khẩu; token được tự tạo ở client nên có thể bị làm giả. Trong hệ thống thật, server phải kiểm tra mật khẩu đã băm và phát hành token có thời hạn, được xác minh ở server. Trên thiết bị, nên lưu token trong nơi lưu trữ bảo mật như `expo-secure-store` (Keychain/Keystore), thay vì lưu dạng thô trong AsyncStorage.

## 3. Vì sao CartItemRow cần hai effect?

Effect thứ nhất đợi 300 ms sau khi người dùng ngừng bấm rồi mới cập nhật số lượng vào Redux. Effect thứ hai đồng bộ lại state `qty` cục bộ khi `item.quantity` được thay đổi từ nơi khác, ví dụ nạp giỏ từ AsyncStorage hoặc cập nhật sản phẩm từ một màn hình khác. Nếu bỏ effect đồng bộ, số lượng hiển thị có thể giữ giá trị cũ trong khi store đã đổi.

## 4. Vì sao Wishlist cần một nguồn state?

Nếu mỗi nút tim quản lý bằng `useState` riêng, bấm yêu thích ở Home sẽ không tự cập nhật nút tim trên màn Chi tiết và trang Yêu thích. Khi dùng một Redux store và hook `useWishlist()`, các nơi đọc chung danh sách ID nên cùng cập nhật theo thay đổi. Giao diện chỉ sử dụng hook, tránh phụ thuộc trực tiếp vào cách cài đặt store.

## 5. Code hiện / ẩn mật khẩu

Màn `src/screens/LoginScreen.tsx` đã thêm state `showPassword` và nút **Hiện mật khẩu / Ẩn mật khẩu**. Khi bấm, `secureTextEntry` đảo trạng thái mà không làm thay đổi giá trị người dùng đã nhập.

```tsx
const [showPassword, setShowPassword] = useState(false);
<FormField label="Mật khẩu" value={password}
  onChangeText={setPassword} secureTextEntry={!showPassword} />
<Pressable onPress={() => setShowPassword((v) => !v)}>
  <Text>{showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}</Text>
</Pressable>
```

**Minh chứng:** Chèn ảnh thực tế từ máy chạy ứng dụng vào báo cáo Word (không dùng ảnh mẫu của đề thay ảnh chạy thật).
