import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [showCounter, setShowCounter] = useState(true);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5 bg-gray-100">
      {/* Nút Toggle */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-all duration-300"
        onClick={() => setShowCounter(!showCounter)}
      >
        {showCounter ? "Hide Counter" : "Show Counter"}
      </button>

      {/* Counter */}
      <div
        className={`flex flex-col items-center gap-3 transition-all duration-500 ${
          showCounter ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-700">Counter: {count}</h2>
        <div className="space-x-4">
          <button
            className="bg-amber-300 hover:bg-amber-400 px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={() => setCount((prev) => prev + 1)}
          >
            Increase
          </button>
          <button
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={() => setCount((prev) => prev - 1)}
          >
            Decrease
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
