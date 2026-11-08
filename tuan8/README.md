# BookStore — Week8 | Phan Trung Hữu — 23677881

Bài thực hành Buổi 8 React Native theo `BookStore_Buoi8_Starter.zip`, giữ Expo SDK 57, React Navigation 7, Redux Toolkit, Axios và `json-server`.

## Đã triển khai

- **BT8.1:** Đăng nhập, kiểm tra Email / Mật khẩu và lỗi dưới ô nhập, lỗi API, trạng thái loading.
- **BT8.2:** Đăng ký 4 ô, kiểm tra nhập lại mật khẩu, tự đăng nhập.
- **BT8.3:** Khôi phục và lưu / xóa phiên đăng nhập bằng AsyncStorage.
- **BT8.4:** Chặn Checkout nếu chưa đăng nhập; chuyển Login và quay lại Checkout đúng tổng tiền.
- **BT8.5:** RatingStars dùng lại được, điểm trung bình, POST đánh giá và cập nhật ngay.
- **BT8.6:** Nút tăng giảm số lượng trong giỏ với debounce 300 ms và giới hạn tồn kho.
- **BT8.7:** Xác nhận khi xóa, lưu / khôi phục giỏ và yêu thích bằng hook chung.
- **BT8.8:** Nút tim đồng bộ Redux, màn Yêu thích có loading/error/empty.
- **BT8.C1:** Sách cùng danh mục, điều hướng `push` từ chi tiết sang chi tiết.
- **BT8.C2:** Mã `SALE10` (10%) và `GIAM50K` (giảm 50.000đ), tổng mới truyền Checkout.
- **Câu 5 bổ sung:** Hiện/ẩn mật khẩu ở màn Đăng nhập; 5 câu trả lời trong `TraLoi.md`.

## Chạy ở máy trường Windows PowerShell

Thư mục ví dụ: `T:\week8`. Node portable đã khảo sát ở `T:\node-v24.22.1-win-x64`; đổi đường dẫn nếu giải nén ở nơi khác.

**Terminal 1 — chạy API** (không đóng trong lúc thử):

```powershell
cd T:\week8
$env:Path = 'T:\node-v24.22.1-win-x64;' + $env:Path
node -v
npm.cmd -v
npm.cmd install
npm.cmd run typecheck
npm.cmd run api
```

Kỳ vọng `http://localhost:3000/books` trả JSON 12 sách, `http://localhost:3000/categories` trả 5 danh mục và `/reviews` trả đánh giá. Chỉ chạy lệnh tiếp khi lệnh trước thành công. `npm install` có thể tạo `package-lock.json` (Starter gốc không cung cấp).

**Terminal 2 — chạy Expo Web:**

```powershell
cd T:\week8
$env:Path = 'T:\node-v24.22.1-win-x64;' + $env:Path
node -v
npm.cmd run web
```

Mở URL được Expo in ra, thông thường `http://localhost:8081`. Nếu đang chạy Week7, dừng server Week7 trước để tránh xung đột cổng 3000. Không cần reset / đổi firewall khi chưa có lỗi được xác minh.

**Expo Go trên điện thoại:** điện thoại và máy tính cần cùng mạng; kiểm tra bản Expo Go hỗ trợ SDK 57. Nếu API không truy cập được, xác minh `http://<IP-máy>:3000/books` từ thiết bị rồi mới cấu hình `EXPO_PUBLIC_API_URL` và kiểm tra firewall khi cần.

## Kịch bản test để chụp báo cáo

1. Đăng nhập bỏ trống hoặc sai định dạng: lỗi ngay dưới mỗi ô.
2. Đăng nhập tài khoản demo `demo@bookstore.vn` / `123456`; tải lại (F5): vẫn giữ phiên.
3. Đăng xuất và tải lại: không còn phiên. Đăng ký email mới: tự đăng nhập.
4. Khi chưa đăng nhập, giỏ có hàng → Thanh toán → Login → đăng nhập → Checkout giữ nguyên tiền.
5. Chi tiết sách: sao / điểm trung bình; đăng nhập để gửi đánh giá, API `/reviews` có bản ghi mới.
6. Giỏ hàng: tăng / giảm, không vượt tồn kho; xóa có Hủy / Xóa; tải lại vẫn còn giỏ.
7. Thả tim ở Home, mở Chi tiết và màn Yêu thích: trạng thái đồng bộ; tải lại còn dữ liệu.
8. C1: chọn sách liên quan trong Chi tiết → mở đúng trang cuốn khác.
9. C2: thử `SALE10`, `GIAM50K`, mã sai; kiểm tra tổng tiền đưa sang Checkout.
10. Câu 5: hiện / ẩn mật khẩu ở Login.

**Lưu ý:** `json-server` sửa trực tiếp file `db.json` khi đăng ký / tạo review. Trước buổi demo nên giữ bản sao `db.json` nếu muốn quay lại dữ liệu gốc; thao tác khôi phục sẽ làm mất tài khoản / đánh giá được thêm vào sau đó. Không dùng mật khẩu thật trong bản bài tập — xác thực trong source là giả lập và không an toàn để triển khai sản phẩm thực.

## Đưa lên GitHub

Repository: `https://github.com/Huu010/PhanTrungHuu_23677881`, thư mục đích `week8/`. Giữ nguyên `week1`–`week7`.

Sau khi copy mã nguồn Week8 vào repository đã clone, bỏ qua `node_modules`, `.expo`, file `.env`, file `db-*.json` sao lưu và ảnh chụp máy cá nhân không cần thiết:

```powershell
cd T:\PhanTrungHuu_23677881
git status --short
git add -- week8 ':(exclude)week8/db-*.json'
git diff --cached --stat
git commit -m "Hoan thanh Week8 BookStore React Native"
git push origin main
git status -sb
```

**Kiểm thử:** Không coi việc TypeScript biên dịch hoặc code push thành công là đã kiểm chứng UI. Cần chạy thật trên máy trường, chụp màn hình và điền vào báo cáo Word.
