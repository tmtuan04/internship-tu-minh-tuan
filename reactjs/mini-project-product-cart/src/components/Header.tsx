import { Link } from "react-router";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../hook/useCart";

const Header = () => {
    const { cart } = useCart();

    return (
        <div className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                TuanStore
            </Link>
            <Link to="/cart">
                <Badge count={cart.length} offset={[0, 0]}>
                    <ShoppingCartOutlined style={{ fontSize: 24 }} />
                </Badge>
            </Link>
        </div>
    )
}

export default Header;