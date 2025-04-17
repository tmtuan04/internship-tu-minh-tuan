function slugify(string) {
  return string
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
    .toLowerCase() // Chuyển thành chữ thường
    .trim() // Xóa khoảng trắng đầu cuối
    .replace(/[^a-z0-9 -]/g, "") // Chỉ giữ lại chữ thường, số và dấu gạch ngang
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
}

export default slugify;