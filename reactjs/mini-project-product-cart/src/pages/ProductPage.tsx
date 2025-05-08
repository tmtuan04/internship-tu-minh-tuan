import { useEffect, useState, useContext, useCallback } from "react";
import { Input, Card, Pagination, Spin, Button, Modal, Form, InputNumber, Upload } from "antd";
import { CartContext } from "../context/CartContext";
import { showToast } from "../utils/toast";
import { SearchOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";

import { deleteProduct } from "../api/deleteProduct";
import { fetchProducts } from "../api/productsData";
import { createProduct } from "../api/createProduct";
import { updateProduct } from "../api/updateProduct"; // Import hàm updateProduct

import { Products } from "../types/productTypes";
import { ProductInput } from "../types/productTypes"


// Ant Design (antd) cung cấp một component Card, Card có một thuộc tính con gọi là Meta 
// Dùng để hiển thị thông tin phụ như tiêu đề phụ, mô tả, ảnh đại diện trong card.
const { Meta } = Card;

export const ProductPage = () => {
    const { dispatch } = useContext(CartContext);

    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1); // trang hiện tại đang hiển thị
    const [totalItems, setTotalItems] = useState(0); // dùng cho phân trang
    const [modalVisible, setModalVisible] = useState(false);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Products | null>(null);
    const [submitting, setSubmitting] = useState(false);


    const [form] = Form.useForm();

    // Limit là 3ps/p
    const limit = 3;

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchProducts(page, limit, undefined, search);
            setProducts(data.data);
            setTotalItems(data.pagination.totalItems);
        } catch (err) {
            console.error("Error loading products:", err);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleSearch = () => {
        setPage(1); // Reset về trang đầu
        loadProducts();
    };

    const handleFormSubmit = async (values: ProductInput) => {
        if (!imageBase64) {
            showToast("Vui lòng tải ảnh lên", "error");
            return;
        }

        setSubmitting(true);
        try {
            const payload = { ...values, image: imageBase64 };

            if (editingProduct) {
                await updateProduct(editingProduct.id, payload);
                showToast("Đã cập nhật sản phẩm", "success");
            } else {
                await createProduct(payload);
                showToast("Đã thêm sản phẩm mới", "success");
            }

            setModalVisible(false);
            form.resetFields();
            setImageBase64(null);
            setEditingProduct(null);
            loadProducts();
        } catch (error) {
            showToast((error as Error).message, "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        Modal.confirm({
            title: "Xác nhận xoá",
            content: "Bạn có chắc chắn muốn xoá sản phẩm này không?",
            okText: "Xoá",
            cancelText: "Huỷ",
            okType: "danger",
            onOk: async () => {
                try {
                    await deleteProduct(id);
                    showToast("Xoá sản phẩm thành công", "success");
                    loadProducts(); // refresh lại danh sách
                } catch (error) {
                    const err = error as Error;
                    showToast(err.message, "error");
                }
            }
        })
    }

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

            <div className="flex items-center justify-between mb-6 space-x-2">
                <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onPressEnter={handleSearch}
                    className="max-w-md"
                />
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
                    Thêm sản phẩm
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                title={
                                    <span className="font-semibold text-gray-800">{product.name}</span>
                                }
                                extra={
                                    <span className="text-blue-600 font-semibold">${product.price}</span>
                                }
                                className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                cover={
                                    <img
                                        alt={product.name}
                                        src={product.image}
                                        className="h-48 w-full object-cover rounded-t-xl"
                                    />
                                }
                            >
                                <Meta
                                    description={
                                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                    }
                                />
                                <div className="text-sm text-gray-500 mb-4">Còn lại: {product.stock}</div>

                                <div className="flex justify-between items-center mt-4">
                                    <Button
                                        danger
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-red-50 text-red-500 hover:bg-red-100"
                                    >
                                        Xoá
                                    </Button>

                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setImageBase64(product.image); // preload ảnh cũ
                                            form.setFieldsValue(product); // preload form
                                            setModalVisible(true);
                                        }}
                                    >
                                        Sửa
                                    </Button>

                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            dispatch({
                                                type: "ADD_ITEM",
                                                payload: { ...product, _id: product.id.toString() },
                                            });
                                            showToast("Đã thêm vào giỏ hàng", "success");
                                        }}
                                    >
                                        Thêm vào giỏ
                                    </Button>
                                </div>
                            </Card>

                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <Pagination
                            current={page}
                            total={totalItems}
                            pageSize={limit}
                            onChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                </>
            )}
            <Modal
                open={modalVisible}
                title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                onCancel={() => {
                    setModalVisible(false);
                    setEditingProduct(null);
                    form.resetFields();
                    setImageBase64(null);
                }}
                onOk={() => form.submit()}
                okText={editingProduct ? "Lưu" : "Tạo"}
                cancelText="Hủy"
            >
                <Spin spinning={submitting}>
                    <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
                        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: "Tên sản phẩm là bắt buộc" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Giá sản phẩm là bắt buộc" }]}>
                            <InputNumber min={1} className="w-full" />
                        </Form.Item>
                        <Form.Item name="stock" label="Tồn kho" rules={[{ required: true, message: "Số lượng sản phẩm là bắt buộc" }]}>
                            <InputNumber min={1} className="w-full" />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                        <Form.Item name="category" label="Danh mục">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ảnh sản phẩm" required>
                            <Upload
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={async (file) => {
                                    const isImage = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
                                    const isLt2M = file.size / 1024 / 1024 < 2;

                                    if (!isImage) {
                                        showToast("Chỉ chấp nhận ảnh định dạng JPG/PNG", "error");
                                        return false;
                                    }

                                    if (!isLt2M) {
                                        showToast("Ảnh phải nhỏ hơn 2MB", "error");
                                        return false;
                                    }

                                    const base64 = await getBase64(file);
                                    setImageBase64(base64);
                                    form.setFieldsValue({ image: base64 });
                                    return false;
                                }}
                            >
                                {imageBase64 ? (
                                    <img src={imageBase64} alt="preview" style={{ objectFit: "cover" }} />
                                ) : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </div>
    );
};