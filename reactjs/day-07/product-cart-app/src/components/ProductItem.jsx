import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-2xl transition duration-300 bg-white">
      <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>
      <h2 className="font-semibold text-xl text-center mb-2">{product.name}</h2>
      <p className="text-gray-700 text-lg font-medium mb-4">{product.price.toFixed(0)} .đ</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;