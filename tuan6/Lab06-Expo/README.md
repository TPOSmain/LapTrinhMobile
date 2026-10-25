# Lab 06 – Navigation (Expo + React Native + TypeScript)

Bài thực hành React Navigation gồm 5 bài, mỗi bài một file trong `src/`, có menu chọn bài ở `App.tsx`.

| Bài | File | Nội dung |
|---|---|---|
| 1 | `src/Bai1.tsx` | Select Phone: Stack, truyền params và nhận kết quả quay lại |
| 2 | `src/Bai2.tsx` | Gắn API mockapi.io: loading / error / thử lại |
| 3 | `src/Bai3.tsx` | Bottom Tab: Home / Search / Profile |
| 4 | `src/Bai4.tsx` | Stack + Tab + Passing Params, Context yêu thích |
| 5 | `src/Bai5.tsx` | Drawer: Home / Profile / Settings (Switch, chế độ tối) |

Dữ liệu và component dùng chung nằm ở `src/shared.tsx`. Ảnh điện thoại nằm ở `assets/`.

## Yêu cầu

- Node.js bản LTS mới nhất (đã thử bundle với Node 22+)
- VS Code (khuyến nghị cài các extension trong `.vscode/extensions.json`)
- Ứng dụng **Expo Go** trên điện thoại (cùng Wi-Fi với máy tính), hoặc Android Studio / Xcode nếu dùng giả lập

## Chạy dự án

```bash
npm install
npm start
```

Quét mã QR bằng Expo Go (Android) hoặc app Camera (iOS). Hoặc nhấn `a` (Android emulator), `i` (iOS simulator), `w` (web).

> Bài 5 (Drawer) dùng Reanimated nên nên test trên điện thoại hoặc giả lập thay vì web.

Kiểm tra kiểu TypeScript:

```bash
npm run typecheck
```

## Bài 2: cấu hình API

1. Tạo API trên https://mockapi.io/ với resource `phones` (các trường: `name`, `price`, `oldPrice`, `rating`, `reviewCount`, `supplier`, `badge`, `colors`, `defaultColor`) và nhập ít nhất một bản ghi có `id = 1`.
2. Sao chép `.env.example` thành `.env` rồi điền endpoint:

```
EXPO_PUBLIC_API_URL=https://xxxxxxxx.mockapi.io/api/v1
```

3. Chạy lại bằng `npx expo start -c` (xóa cache để nhận biến môi trường mới).

Để trống `EXPO_PUBLIC_API_URL` thì app dùng dữ liệu mẫu offline.

## Đẩy lên Git

File `.env` đã được ignore nên không bị push. Chạy lần lượt:

```bash
git init
git add .
git commit -m "Lab06: Navigation (Bai 1-5)"
git branch -M main
git remote add origin https://github.com/<ten-ban>/<ten-repo>.git
git push -u origin main
```

(Tạo repo trống trên GitHub trước, không tick "Add README".)

## Ghi chú

- `navigation.popTo("Product", { color })` ở Bài 1 dùng cho React Navigation 7 (từ bản 7, `navigate` không còn tự quay lại màn đã có trong stack).
- `import "react-native-gesture-handler"` phải nằm ở dòng đầu của `index.ts` (cần cho Drawer).
- Các phiên bản thư viện khớp với Expo SDK 58. Nếu nâng SDK, chạy `npx expo install --fix`.
