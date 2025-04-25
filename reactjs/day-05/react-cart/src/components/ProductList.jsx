import { ProductItem } from "./ProductItem";

const products = [
  { id: 1, name: "iPhone", price: 999 },
  { id: 2, name: "iPad", price: 699 },
  { id: 3, name: "MacBook", price: 1999 },
];

export const ProductList = ({ onAddToCart }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
