# BookStore — Week 7 — Phan Trung Hữu (23677881)

Bài 7.1–7.8 React Native: điều hướng 2 tầng, Redux Toolkit, Axios + json-server, debounce 400 ms, lọc kết hợp. Hoàn thành thêm C1 (Wishlist), C2 (lọc giá) và câu hỏi bổ sung 5 (sắp xếp giá).

**Giữ nguyên Expo SDK 57 / React Native 0.86 của Starter.** Không gộp dependency từ Week6 (Expo 58). ZIP gốc không có `package-lock.json`: phải cài qua mạng một lần để tạo lockfile trước khi dùng `npm ci` ở lần sau.

## Chạy trên máy trường (Windows PowerShell)

Ví dụ giải nén project vào `T:\week7`. Mở **hai** terminal VS Code ở thư mục này. Trong **mỗi terminal**, nếu máy vẫn chọn Node 18 mặc định, chọn bản portable đã được kiểm tra từ hồ sơ môi trường:

```powershell
$env:Path = 'T:\tools\node-v24.22.1-win-x64;' + $env:Path
node -v
npm.cmd -v
where.exe node
```

**Terminal 1 — cài thư viện và chạy API** (cần mạng khi cài):

```powershell
cd T:\week7
npm.cmd install
npm.cmd run typecheck
npm.cmd run api
```

Giữ terminal API hoạt động. Mở `http://localhost:3000/books` và `http://localhost:3000/categories` trên trình duyệt: kỳ vọng 12 sách và 5 danh mục.

**Terminal 2 — chạy app** (chọn Node 24 portable lại trong terminal này):

```powershell
cd T:\week7
npm.cmd run web
```

Mở đường dẫn Expo hiển thị (thường `http://localhost:8081`). Chụp ảnh khi thực sự thấy dữ liệu và thao tác thành công. Không dùng hình mẫu trong `docs/ui` để làm minh chứng chạy thực tế.

### Chạy trên Android nếu trường yêu cầu

- Xác nhận `adb devices -l` thấy emulator/device. AVD có sẵn trong hồ sơ là API 30 nhưng **chưa có kết quả xác nhận đã khởi động thành công**.
- Expo Go cần tương thích **SDK 57**, xem https://expo.dev/go?platform=android&sdkVersion=57 .
- Chạy `npm.cmd start`, chọn Android bằng phím `a` sau khi đã xác nhận emulator hoạt động.
- Android emulator: API base mặc định là `http://10.0.2.2:3000` khi hostUri là localhost. Điện thoại thật: máy và điện thoại cùng Wi-Fi, hoặc cấu hình địa chỉ máy bằng biến môi trường **trong Terminal 2 trước khi start**:

```powershell
$env:EXPO_PUBLIC_API_URL = 'http://192.168.X.Y:3000'  # thay bằng IPv4 thật của máy trường
npm.cmd start
```

Kiểm tra API có thể truy cập được từ thiết bị. Không tắt firewall hay đổi card/NAT nếu chưa có log xác định lỗi. Chỉ mở cổng 3000 trong mạng đáng tin cậy nếu nhà trường cho phép và có nhu cầu rõ ràng.

## Những gì phải thử trước khi chụp

1. Home tải 12 sách từ API; giỏ nổi và 4 tab tự dựng.
2. Nhấn vào 3 sách khác nhau: chi tiết đúng; quay lại giữ màn Home.
3. Thêm `Clean Code` hai lần rồi `Clean Code` thêm tối đa đến stock 5; badge và giỏ khớp; thanh toán hiện đúng tổng.
4. Tab Tài khoản chuyển từ chưa đăng nhập sang Học viên Demo, đăng xuất trở lại.
5. Tab Danh mục hiển thị 5 dòng; chọn `Lập trình` thì về Home, chip sáng; gõ `react` chỉ còn `React Native in Action`.
6. Gõ `nha gia` ra `Nhà Giả Kim`; `DAC NHAN` ra `Đắc Nhân Tâm`; từ khoá không tồn tại hiện màn rỗng và Xóa bộ lọc.
7. Lọc giá bằng 3 chip, chọn lại chip đang chọn để bỏ lọc; sắp xếp giá tăng/giảm; kết hợp với danh mục và từ khóa.
8. Nút yêu thích tại Chi tiết bật/tắt đúng.
9. **Thử lỗi:** Dừng API bằng Ctrl+C, tải lại Home rồi xem thông báo lỗi tiếng Việt; chạy API lại và bấm Thử lại.
10. `npm.cmd run typecheck` phải không có lỗi. Kiểm tra không còn `TODO BT7` trong source (trừ tài liệu bản gốc trong Word ngoài project).

## Nộp bài

- Code GitHub: `https://github.com/Huu010/PhanTrungHuu_23677881` → `week7/`.
- Word: `23677881_PhanTrungHuu_Buoi7.docx` với ảnh **chụp từ máy chạy thật** và giải thích ngắn.
- Có `TraLoi.md` đủ 5 câu và ảnh chức năng sắp xếp ở câu 5.
- Nếu hệ thống yêu cầu: nén ZIP `23677881_PhanTrungHuu_Buoi7.zip`, loại `node_modules`, `.expo`.
- Không commit `node_modules`, `.env`, mật khẩu hoặc file tạm. Giữ `package-lock.json` được tạo sau khi cài thành công.

**Giới hạn xác minh tại thời điểm chuẩn bị:** Chưa chạy được Expo/TypeScript của dự án tại môi trường tạo ZIP vì thiếu dependencies và không truy cập được npm registry. Phải thực hiện các lệnh kiểm tra trên máy có mạng trước khi kết luận chạy thành công.
