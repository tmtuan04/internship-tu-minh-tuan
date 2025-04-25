export const ProductItem = ({ product, onAddToCart }) => {
    return (
      <div className="flex flex-col border rounded-xl shadow-md p-4 m-2 bg-white hover:shadow-lg transition duration-300">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">Price: <span className="font-medium">${product.price}</span></p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md transition duration-200"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    );
  }
  