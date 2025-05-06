import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Card, InputNumber, Modal } from "antd";
import { CartItem } from "../types/cartTypes";
import { showToast } from "../utils/toast";

export const CartPage = () => {
    const { cart, dispatch } = useContext(CartContext);
    const total = cart.reduce((sum, item) => sum + parseInt(item.price) * item.stock, 0);

    const handleRemoveItem = (id: string) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
            okText: "Xóa",
            cancelText: "Hủy",
            okType: "danger",
            onOk: () => {
                dispatch({ type: "REMOVE_ITEM", payload: id });
                showToast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
            },
        });
    };

    const handleUpdatestock = (id: string, stock: number) => {
        if (stock <= 0) {
            handleRemoveItem(id);
            return;
        }
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, stock } });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 Giỏ hàng của bạn</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {cart.map((item: CartItem) => (
                            <Card
                                key={item._id}
                                className="rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                                    />

                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                                        </div>

                                        <div className="flex justify-between items-end mt-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-600">Số lượng:</span>
                                                <InputNumber
                                                    min={0}
                                                    value={item.stock}
                                                    onChange={(stock) =>
                                                        handleUpdatestock(item._id, stock as number)
                                                    }
                                                    className="w-20"
                                                />
                                            </div>

                                            <div className="flex flex-col items-center gap-2">
                                                <div className="text-base font-bold text-blue-600">
                                                    ${parseInt(item.price) * item.stock}
                                                </div>
                                                <Button
                                                    type="dashed"
                                                    danger
                                                    onClick={() => handleRemoveItem(item._id)}
                                                    className="p-0"
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-end mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
                        <div className="text-xl font-bold text-gray-800">
                            Tổng cộng:{" "}
                            <span className="text-blue-600">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};