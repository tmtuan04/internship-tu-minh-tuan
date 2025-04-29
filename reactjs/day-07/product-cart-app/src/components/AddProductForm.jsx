import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) {
      alert('Name and price are required!');
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      alert('Price must be a positive number!');
      return;
    }
    onAddProduct({ name, price: Number(price), image: image || 'https://picsum.photos/200' });
    setName('');
    setPrice('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">+ Add New Product</h2>
      <div className="mb-4">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Image URL (optional)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
