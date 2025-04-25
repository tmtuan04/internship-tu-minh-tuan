import React from "react";

export const Cart = ({ cartItems }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4">
        🛒 Cart <span className="text-sm text-gray-600">({cartItems.length} items)</span>
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow-sm"
            >
              <span>
                {item.name} <span className="text-sm text-gray-500 mr-3">x{item.quantity}</span>
              </span>
              <span className="font-semibold">${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
