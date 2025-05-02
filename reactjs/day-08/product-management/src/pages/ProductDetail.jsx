import { useParams } from "react-router";
import { Card, Button, Spin } from "antd";
import { useCart } from "../context/useCart";
import { useEffect, useState } from "react";
import { getProductById } from "../data";

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spin />
      </div>
    );
  }

  if (!product)
    return <p className="text-center text-red-500">Không tìm thấy sản phẩm</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card
        title={product.name}
        cover={
          <img
            alt={product.name}
            src={product.image}
            className="h-64 object-cover"
          />
        }
      >
        <p className="mb-4">{product.description}</p>
        <Button type="primary" onClick={() => addToCart(product)}>
          Thêm vào giỏ hàng
        </Button>
      </Card>
    </div>
  );
};
