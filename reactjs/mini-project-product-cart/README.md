# 🛍️ TuanStore - Ứng dụng Quản lý và Mua sắm Sản phẩm

## 🧾 Giới thiệu

**TuanStore** là một ứng dụng web đơn giản cho phép người dùng:
- Duyệt và tìm kiếm sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Cập nhật số lượng và xóa sản phẩm khỏi giỏ hàng.
- Giao diện đẹp, trực quan với Ant Design.
- Toast thông báo cho các hành động quan trọng.

Ứng dụng sử dụng **React + TypeScript + Ant Design** ở frontend, kết nối với một **API Node.js** ở backend để lấy dữ liệu sản phẩm.

---

## 🚀 Chức năng chính

### 🔍 Trang Sản phẩm (`/products`)
- Cho phép thêm, sửa, xoá, cập nhật sản phẩm.
- Hiển thị danh sách sản phẩm theo trang (pagination).
- Cho phép tìm kiếm sản phẩm theo tên.
- Mỗi sản phẩm có nút **“Thêm vào giỏ hàng”**.

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

- **React** + **TypeScript**
- **React Router**
- **Tailwind CSS**
- **Ant Design** (UI components)
- **React Context** cho quản lý giỏ hàng
- **axios** để gọi API
- **react-hot-toast** cho thông báo