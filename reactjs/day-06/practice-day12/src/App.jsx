import { useState } from "react";
import './App.css'
import Counter from "../components/Counter";
import TodoList from "../components/TodoList";

const App = () => {
  const [isCounter, setIsCounter] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 p-6">
      {/* Button Switch */}
      <button
        onClick={() => setIsCounter(!isCounter)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
      >
        {isCounter ? "Switch to TodoList" : "Switch to Counter"}
      </button>

      {/* Conditional Rendering */}
      <div className="w-full max-w-2xl">
        {isCounter ? <Counter /> : <TodoList />}
      </div>
    </div>
  );
}

export default App;