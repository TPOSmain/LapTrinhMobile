# Trả lời câu hỏi bổ sung — Buổi 7

**Họ tên:** Phan Trung Hữu  
**MSSV:** 23677881

## 1. Cấu trúc điều hướng
`BookDetail` được đặt trong `RootStack` để mở phủ lên toàn bộ phần Tab và dùng nút quay lại của Stack. Nếu đưa vào Bottom Tab như một tab độc lập, thanh tab vẫn nằm phía dưới và luồng mở chi tiết từ Home không còn giống cách điều hướng yêu cầu.

## 2. Redux và useMemo
Redux Toolkit tích hợp Immer: các lệnh như `state.items.push(...)` sửa một *draft* và Immer tạo state mới theo cơ chế bất biến. Khi bỏ `useMemo`, tổng số lượng và tổng tiền vẫn tính đúng, nhưng phép `reduce` phải chạy lại mỗi lần component render, có thể làm tăng chi phí xử lý nếu giỏ lớn.

## 3. Promise.all và Promise.allSettled
Nếu `getCategories()` bị lỗi, `Promise.all([getBooks(), getCategories()])` sẽ reject nên Home hiện `ErrorView`, dù request sách có thể đã thành công. Có thể dùng `Promise.allSettled` rồi hiển thị sách khi request sách thành công, còn danh mục lỗi thì dùng mảng rỗng hoặc thông báo riêng. Đổi lại, code phải kiểm tra và xử lý riêng từng kết quả để tránh che mất lỗi cần biết.

Ví dụ cách xử lý thay thế **để tham khảo**, không thay luồng `Promise.all` trong yêu cầu BT7.5:

```ts
const [booksResult, categoriesResult] = await Promise.allSettled([getBooks(), getCategories()]);
if (booksResult.status === "rejected") throw booksResult.reason;
setBooks(booksResult.value);
setCategories(categoriesResult.status === "fulfilled" ? categoriesResult.value : []);
```

## 4. Debounce
Nếu đặt `setTimeout` thẳng trong `onChangeText` mà không quản lý timer, mỗi lần gõ sẽ tạo một lịch lọc riêng, gây nhiều lần cập nhật và có thể cho kết quả thoáng qua không đúng từ khóa mới nhất. `useDebounce` dùng `useEffect` để hủy timer trước khi đặt timer mới; hàm cleanup cũng hủy timer khi component bị gỡ.

## 5. Bổ sung sắp xếp giá tăng dần / giảm dần
Home có state `sort` nhận `"asc"`, `"desc"` hoặc `null`; người dùng chọn bằng ba nút ngay phía trên danh sách. Sau khi lọc, code sắp xếp một *bản sao* của mảng nên không thay đổi dữ liệu gốc từ API. Kết quả hiển thị phụ thuộc lựa chọn và có thể kết hợp với từ khóa, danh mục, khoảng giá.

```ts
const [sort, setSort] = useState<"asc" | "desc" | null>(null);
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  return sort === null ? filtered : [...filtered].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price);
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
```

**Ảnh chụp cần bổ sung trong báo cáo:** Home khi chọn `Giá ↑` và/hoặc `Giá ↓` (ảnh chụp khi chạy ứng dụng thực tế).
