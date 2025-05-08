# Day 18-19-20: Mini Project Product + Cart

Nội dung chính:
- App Product + Cart kết nối trực tiếp API NodeJS của chính mình
- Có routing đa page
- Context + Reducer quản lý Cart
- Custom hook
- CRUD Product qua API
- Validate form thêm sản phẩm

1. Cart phải lưu localStorage (**Done**)
- Khi reload page thì Cart không được mất.
- Tự động load Cart từ localStorage vào Context khi app khởi động.
- Khi có thay đổi (add/remove item) phải sync lại localStorage.


2. Product Pagination + Search (**Done**)
- Khi fetch danh sách Product từ API NodeJS backend, phải:
- Có search theo tên sản phẩm.
- Có pagination (ví dụ 5 sản phẩm/trang).
- API backend đã hỗ trợ search, limit, skip từ tuần trước.

3. Cart hiển thị tổng tiền (**Done**)
- Trong Cart phải tính tổng số tiền tất cả sản phẩm.
- Khi thay đổi số lượng hoặc xóa sản phẩm thì tổng tiền tự động cập nhật.

4. Cho phép chỉnh sửa số lượng trong Cart (**Done**)
Ở Cart Page:

- Mỗi sản phẩm có nút +, - để tăng/giảm quantity.
- Nếu quantity = 0 thì tự remove khỏi Cart.
- Update Context và localStorage tương ứng.


5. Thông báo Toast khi thêm / xóa sản phẩm (**Done**)
Khi add to cart hoặc remove product: Hiển thị Toast notification (dùng thư viện như react-toastify hoặc tự viết basic component).

6. Tạo Modal xác nhận khi Delete (**Done**)
Khi xóa sản phẩm khỏi Cart hoặc Product List: Hiện modal confirm “Bạn có chắc chắn muốn xóa không?” trước khi thực hiện.

7. Bắt buộc validate dữ liệu thêm Product (**Done**)
- Form thêm Product cần: Validate input rỗng.
- Validate giá trị số hợp lệ (price, quantity > 0).
- Validate hình ảnh phải là URL hợp lệ.
- Lưu ý: dùng 1 trong các lib UI Material-UI, Ant Design, Chakra UI

`Tham khảo thêm nếu xong yêu cầu chính: dùng lib UI Polaris và build project bằng remix` (**Inprogress**)