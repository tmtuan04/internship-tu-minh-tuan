import React from 'react';

const CartItem = ({ item, onUpdateCartItem }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>{item.price} .đ x {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-300 px-2 rounded"
          onClick={() => onUpdateCartItem(item.id, item.quantity - 1)}
        >-</button>
        <span>{item.quantity}</span>
        <button
          className="bg-gray-300 px-2 rounded"
          onClick={() => onUpdateCartItem(item.id, item.quantity + 1)}
        >+</button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onUpdateCartItem(item.id, 0)}
        >x</button>
      </div>
    </div>
  );
};

export default CartItem;