import { Link } from "react-router";
import { Button } from "antd";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🎉 Chào mừng đến <span className="text-blue-600">TuanStore</span> 🎉</h1>
      <div className="space-x-4">
        <Link to="/products">
          <Button type="primary">Xem sản phẩm</Button>
        </Link>
        <Link to="/cart">
          <Button>Giỏ hàng</Button>
        </Link>
      </div>
    </div>
  );
};