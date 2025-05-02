import { Link } from "react-router";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../context/useCart";

const Header = () => {
  const { cart } = useCart();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        TuanStore
      </Link>
      <Link to="/cart">
        {/* Badge là một component hiển thị huy hiệu nhỏ (thường là số hoặc dấu chấm) trên một phần tử khác, ví dụ như biểu tượng giỏ hàng. */}
        {/* offset={[0, 0]}:
        Điều chỉnh vị trí huy hiệu so với phần tử con (ở đây là biểu tượng ShoppingCartOutlined).
        [x, y]: dịch chuyển theo trục X và Y (theo pixel). [0, 0] nghĩa là vị trí mặc định. 
      */}
        <Badge count={cart.length} offset={[0, 0]}>
          <ShoppingCartOutlined style={{ fontSize: 24 }} />
        </Badge>
      </Link>
    </div>
  );
};

export default Header;
