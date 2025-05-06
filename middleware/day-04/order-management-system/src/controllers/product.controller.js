import db from "../config/db.js";
import { uploadBase64Image } from "../lib/upload.js";

export const getAllProducts = async (req, res) => {
  try {
    // Mặc định là 1 - 3
    const { page = 1, limit = 3, name, category } = req.query;
    // Vị trí bắt đầu
    const offset = (page - 1) * limit;

    // WHERE 1=1 để dễ nối điều kiện AND phía sau mà không quan tâm có ĐK gì ở trước
    let query = `SELECT * FROM products WHERE 1=1`;
    let countQuery = "SELECT COUNT(*) as total FROM products WHERE 1=1";
    const queryParams = [];

    // Filter: name (Tương đối)
    if (name) {
      query += " AND name LIKE ?";
      countQuery += " AND name LIKE ?";
      queryParams.push(`%${name}%`);
    }

    // Filter: category (Tuyệt đối)
    if (category) {
      query += " AND category = ?";
      countQuery += " AND category = ?";
      queryParams.push(category);
    }

    // Thêm phân trang (limit + offset)
    query += " LIMIT ? OFFSET ?";
    queryParams.push(Number(limit), Number(offset));

    // Tổng product phù hợp với filter (Phục vụ phân trang)
    // Lấy từ phần tử đầu tiên (index 0) đến 2 phần tử trước cuối mảng (không bao gồm 2 phần tử cuối).
    const [countResult] = await db.query(countQuery, queryParams.slice(0, -2));
    const totalItems = countResult[0].total;

    // Get paginated results
    const [products] = await db.query(query, queryParams);

    res.status(200).json({
      data: products,
      pagination: {
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, stock, description, category, image } = req.body;

  try {
    if (!image) throw new Error("Image is required");

    const imageUrl = await uploadBase64Image(image);

    const [result] = await db.query(
      "INSERT INTO products (name, price, stock, description, category, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, price, stock, description, category, imageUrl]
    );
    const newProductId = result.insertId;

    res.status(201).json({
      message: "Product created successfully",
      product: {
        id: newProductId,
        name,
        price,
        stock,
        description,
        category,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { name, price, stock, description, category, image } = req.body;
  try {
    let imageUrl;

    // Nếu người dùng gửi ảnh mới (base64), thì upload lại
    if (image && image.startsWith("data:image/")) {
      imageUrl = await uploadBase64Image(image);
    }

    // Nếu không gửi ảnh mới thì không thay đổi ảnh
    const [result] = await db.query(
      `
        UPDATE products 
        SET name = ?, price = ?, stock = ?, description = ?, category = ?
        ${imageUrl ? ', image = ?' : ''}
        WHERE id = ?
      `,
      imageUrl
        ? [name, price, stock, description, category, imageUrl, id]
        : [name, price, stock, description, category, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: {
        id,
        name,
        price,
        stock,
        description,
        category,
        ...(imageUrl && { image: imageUrl }),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
