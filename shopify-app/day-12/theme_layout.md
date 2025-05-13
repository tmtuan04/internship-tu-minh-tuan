# 🧱 Tổng quan cấu trúc thư mục theme Shopify

| Thư mục      | Mục đích chính                                                                 |
| ------------ | ------------------------------------------------------------------------------ |
| `layout/`    | Chứa layout chính của theme, ví dụ `theme.liquid` là "khung tổng thể" của web. |
| `templates/` | Các mẫu trang chính như `product`, `collection`, `cart`, `index`, `404`, v.v.  |
| `sections/`  | Các khối nội dung có thể tái sử dụng hoặc kéo thả trong theme editor.          |
| `blocks/`    | (Mới) Các block nhỏ hơn bên trong `sections`, hỗ trợ cấu trúc sâu hơn.         |
| `snippets/`  | Các đoạn mã tái sử dụng nhỏ như thẻ meta, product price, icon, v.v.            |
| `config/`    | Cấu hình theme, đặc biệt là `settings_schema.json` để tạo giao diện chỉnh sửa. |
| `assets/`    | Lưu CSS, JS, hình ảnh hoặc các file media tĩnh khác.                           |
| `locales/`   | File dịch đa ngôn ngữ, ví dụ `en.default.json`, `vi.json` để hiển thị bản địa. |

## 📄 Vì sao có cả `.liquid` và `.json`?

🔹 `.liquid` – Template động:
- Là ngôn ngữ template của Shopify.
- Kết hợp HTML với logic (vòng lặp, if/else, biến dữ liệu).
- Dùng cho: `layout`, `sections`, `snippets`, `templates`.

🔹 `.json` – Template có thể cấu hình trong giao diện admin:
- Dùng từ Shopify Online Store 2.0 trở đi.
- Ví dụ: `templates/product.json` sẽ cho phép bạn cấu hình trang sản phẩm bằng cách **kéo thả sections** trong admin mà **không cần sửa code**.
- Tệp `.json` sẽ định nghĩa layout dạng:
```
{
  "sections": {
    "main": {
      "type": "main-product"
    }
  },
  "order": ["main"]
}
```

📌 Ví dụ thực tế:
Nếu bạn có `templates/product.json`:
- Nó sẽ load layout từ các section được khai báo (ví dụ: `sections/main-product.liquid`).
- Bạn có thể kéo thả, ẩn hiện, sắp xếp các section đó trong Shopify Editor UI.

**Tóm lại**: `.json` = cấu hình bố cục của page (dùng cho editor)