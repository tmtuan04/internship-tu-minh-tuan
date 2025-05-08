# 🛍️ TuanStore - Ứng dụng Quản lý và Mua sắm Sản phẩm

## 🧾 Giới thiệu

**TuanStore** là một ứng dụng web đơn giản cho phép người dùng:
- Duyệt và tìm kiếm sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Cập nhật số lượng và xóa sản phẩm khỏi giỏ hàng.
- Giao diện đẹp, trực quan với Ant Design, responsive cho ứng dụng di động.
- Toast thông báo cho các hành động.

Ứng dụng sử dụng **React + TypeScript + Ant Design** ở frontend, kết nối với một **API Node.js** ở backend để lấy dữ liệu sản phẩm.

---

## Cấu trúc thư mục dự án

```
mini-project-product-cart/
├── src/
│   ├── api/
│   │   ├── createProduct.ts
│   │   ├── deleteProduct.ts
│   │   ├── productsData.ts
│   │   └── updateProduct.ts
│   │
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   └── Header.tsx
│   │
│   ├── context/
│   │   ├── CartContext.ts
│   │   ├── CartProvider.tsx
│   │   └── CartReducer.ts
│   │
│   ├── hook/
│   │   └── useCart.ts
│   │
│   ├── pages/
│   │   ├── CartPage.tsx
│   │   ├── HomePage.tsx
│   │   └── ProductPage.tsx
│   │
│   ├── types/
│   │   ├── cartTypes.ts
│   │   └── productTypes.ts
│   │
│   ├── utils/
│       └── toast.ts
```

## 🚀 Chức năng chính

### 🔍 Trang Sản phẩm (`/products`)
- Cho phép thêm, sửa, xoá, cập nhật sản phẩm.
- Hiển thị danh sách sản phẩm theo trang (pagination).
- Cho phép tìm kiếm sản phẩm theo tên.
- Mỗi sản phẩm có nút **“Thêm giỏ hàng”**, **“Sửa”**, **“Xoá”**

### 🛒 Giỏ hàng (`/cart`)
- Hiển thị các sản phẩm đã thêm vào giỏ.
- Cho phép cập nhật số lượng hoặc xóa sản phẩm.
- Modal xác nhận khi xóa sản phẩm.
- Hiển thị tổng tiền.

### 🌐 Trang chủ (`/`)
- Giao diện chào mừng.
- Nút chuyển đến danh sách sản phẩm và giỏ hàng.

---

## 🛠️ Công nghệ sử dụng

📦 Frontend Stack
- Framework: React + TypeScript
- Routing: React Router
- Styling: Tailwind CSS + Ant Design (UI Library)
- State Management: React Context API (giỏ hàng)
- HTTP Client: axios
- Notifications: react-hot-toast

🛠️ Backend Stack
- Runtime & Framework: Node.js + Express
- Security:
    - bcryptjs – mã hóa mật khẩu
    - jsonwebtoken – xác thực token JWT
- Middleware:
    - cors – chia sẻ tài nguyên giữa các nguồn
    - morgan – log request
- Configuration: dotenv
- Database: mysql2 (MySQL)
- File Upload / Media: cloudinary – lưu trữ ảnh sản phẩm
- Development Tool: nodemon – tự động restart server khi code thay đổi
