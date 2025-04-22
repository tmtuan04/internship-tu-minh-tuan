export const validateSignup = (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  next();
};

export const validateProduct = (req, res, next) => {
  const { name, price, stock, description, category } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Product name is required and must be a string." });
  }

  if (price === undefined || typeof price !== "number" || price < 0) {
    return res
      .status(400)
      .json({ error: "Price must be a non-negative number." });
  }

  if (stock === undefined || typeof stock !== "number" || stock < 0) {
    return res
      .status(400)
      .json({ error: "Stock must be a non-negative number." });
  }

  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string." });
  }

  if (category && typeof category !== "string") {
    return res.status(400).json({ error: "Category must be a string." });
  }

  next();
};
