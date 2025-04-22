import db from "../config/db.js";

export const createOrder = async (req, res) => {
  const { user_id, items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Order must contain at least one item." });
  }

  // Start transaction - đảm bảo rollback nếu có lỗ
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    let totalPrice = 0;

    // Tính tổng giá và kiểm tra tồn kho
    for (const item of items) {
      const [productResult] = await conn.query(
        "SELECT stock, price FROM products WHERE id = ?",
        [item.product_id]
      );

      if (productResult.length === 0) {
        throw new Error(`Product ID ${item.product_id} not found.`);
      }

      const product = productResult[0];
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ID ${item.product_id}.`);
      }

      totalPrice += product.price * item.quantity;
    }

    // Tạo đơn hàng
    const [orderResult] = await conn.query(
      "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
      [user_id, totalPrice]
    );

    const orderId = orderResult.insertId;

    // Tạo order_items và trừ stock
    for (const item of items) {
      const [productResult] = await conn.query(
        "SELECT price FROM products WHERE id = ?",
        [item.product_id]
      );
      const price = productResult[0].price;

      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, price]
      );

      await conn.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.product_id,
      ]);
    }
    // Mọi thao tác trong transaction đều thành công, dòng này sẽ lưu vĩnh viễn tất cả các thay đổi vào database.
    await conn.commit();
    // Không phải đóng hẳn kết nối, mà là đưa nó về trạng thái sẵn sàng để dùng lại
    // Dùng để tiết kiệm tài nguyên, tránh bị connection leak (rò rỉ kết nối)
    conn.release();

    res.status(201).json({ message: "Order created", order_id: orderId });
  } catch (error) {
    // Dùng khi có lỗi xảy ra ở bất kỳ bước nào trong quá trình transaction -> Hủy bỏ toàn bộ các thao tác đã thực hiện trong transaction
    await conn.rollback();
    conn.release();
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// User xem đơn hàng của mình - Có thể bổ sung thêm xem chi tiết đơn hàng
export const getOrder = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const [orderResult] = await db.query(
      "SELECT * FROM orders WHERE user_id = ?",
      [user_id]
    );

    // Nếu không có đơn hàng
    if (orderResult.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json({ orders: orderResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Admin xem tất cả đơn hàng
export const getOrders = async (req, res) => {
  try {
    const [orderResult] = await db.query("SELECT * FROM orders");

    if (orderResult.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json({ orders: orderResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });  
  }
};

// Admin cập nhật trạng thái đơn hàng - 'pending', 'paid', 'shipped', 'cancelled'
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [orderResult] = await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);

    res.status(200).json({ message: "Order status updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}