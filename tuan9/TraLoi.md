# Trả lời câu hỏi bổ sung — Buổi 9 (BookStore)

## 1. Giá trị dẫn xuất
`errors` và `valid` hoàn toàn suy ra được từ `name`, `phone`, `address` và giỏ hàng, nên tính lại mỗi lần render thì lúc nào cũng khớp với dữ liệu hiện tại. Nếu lưu bằng `useState` riêng, ta phải nhớ cập nhật chúng ở mọi nơi gọi `setName`, `setPhone`, `setAddress` (và khi giỏ thay đổi); quên một chỗ là lỗi hiện sai hoặc nút "Xác nhận đặt hàng" mở/khoá sai. Ngoài ra `setState` là bất đồng bộ, nên dễ đọc phải giá trị cũ của một lần render trước.

## 2. Thứ tự gọi
Nếu `clear()` chạy trước `await createOrder(...)` mà lúc đó mất mạng, giỏ đã bị xoá (cả trong store lẫn AsyncStorage) trong khi đơn chưa hề được tạo trên server: người dùng mất toàn bộ hàng đã chọn và phải chọn lại từ đầu. Đặt `clear()` ngay sau `createOrder` là đúng vì khi `await` chạy xong tức là server đã nhận đơn; còn nếu lỗi thì code nhảy thẳng vào `catch`, `clear()` không được chạy và giỏ còn nguyên để bấm thử lại.

## 3. PUT hay PATCH
`PUT /users/1` với `{ name, phone }` thay thế cả object, nên user trong `db.json` chỉ còn `id`, `name`, `phone`; mất `email` và `password` (không đăng nhập được nữa). Bài này chọn `PATCH` vì chỉ ghi đè đúng các trường được gửi (`name`, `phone`), các trường còn lại giữ nguyên, phù hợp với form sửa một phần.

## 4. Cập nhật lạc quan
Nếu bỏ đoạn hoàn lại `read: false` trong `catch` thì khi mất mạng, giao diện vẫn báo "đã đọc" trong khi server vẫn là chưa đọc; người dùng tưởng đã lưu, đến lần mở lại màn thì thông báo bỗng quay về chưa đọc, rất khó hiểu. Nên dùng cách này cho thao tác nhẹ, ít sai và dễ hoàn lại, ví dụ thả tim / thêm vào yêu thích, đánh dấu đã đọc. Không nên dùng cho thanh toán / đặt hàng, vì phải chắc chắn server đã nhận đơn mới được báo thành công (và mới xoá giỏ), không thể "báo trước rồi hoàn lại" được.

## 5. Code bổ sung: bộ lọc trạng thái ở màn Đơn hàng
Đã làm trong `src/screens/OrdersScreen.tsx`:

```tsx
type StatusFilter = "all" | OrderStatus;
const [status, setStatus] = useState<StatusFilter>("all");

// một chỗ sửa trong dữ liệu truyền cho FlatList:
const visibleOrders = useMemo(
  () => orders.filter((o) => status === "all" || o.status === status),
  [orders, status]
);

<FlatList data={visibleOrders} ... />
```

Hàng nút lọc (Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã huỷ) nằm ở `ListHeaderComponent`; khi lọc ra rỗng sẽ hiện thông báo "Không có đơn nào ở trạng thái này" kèm nút "Xem tất cả".

**Ảnh chụp màn hình:** _(chèn ảnh màn Đơn hàng có bộ lọc vào đây sau khi chạy app)_

---

## Ghi chú nộp bài
- Đã làm đủ BT9.1 → BT9.7 và **thử thách BT9.C1 (Mua lại)**.
- Không còn `TODO BT9` trong code; đã xoá component `TodoBox` vì không còn dùng.
- Còn lại cần tự làm trên máy: chạy `npm install`, `npm run typecheck`, chạy demo luồng BT9.8 và chụp ảnh Checkout / Đơn hàng / Hồ sơ / Thông báo.
