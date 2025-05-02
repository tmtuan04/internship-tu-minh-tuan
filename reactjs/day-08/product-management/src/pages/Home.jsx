import { Card, Spin } from "antd";
import { getProducts } from "../data";
import { useCart } from "../context/useCart";
import { Link } from "react-router";
import { useState, useEffect } from "react";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sản phẩm:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spin />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <Card
          key={product.id}
          cover={
            <img
              src={product.image}
              alt={product.name}
              className="h-48 object-cover"
            />
          }
          actions={[
            <button
              onClick={() => addToCart(product)}
              className="text-blue-500"
            >
              Thêm vào giỏ
            </button>,
            <Link to={`/products/${product.id}`} className="text-green-500">
              Xem chi tiết
            </Link>,
          ]}
        >
          <Card.Meta title={product.name} description={product.description} />
        </Card>
      ))}
    </div>
  );
};
