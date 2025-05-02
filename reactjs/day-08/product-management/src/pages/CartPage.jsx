import { useCart } from "../context/useCart";
import { Card, Button, Empty } from "antd";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-4">
        <Empty description="Giỏ hàng trống" />
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cart.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          cover={
            product.image && (
              <img
                alt={product.name}
                src={product.image}
                className="h-48 object-cover"
              />
            )
          }
          actions={[
            <Button danger onClick={() => removeFromCart(product.id)}>
              Xóa khỏi giỏ
            </Button>,
          ]}
        >
          <p>{product.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default CartPage;