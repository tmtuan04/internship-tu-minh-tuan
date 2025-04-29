import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, onUpdateCartItem }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">🛍️ Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} onUpdateCartItem={onUpdateCartItem} />
          ))}
          <div className="mt-4 text-lg font-semibold">
            Total: {total.toFixed(0)} .đ
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;