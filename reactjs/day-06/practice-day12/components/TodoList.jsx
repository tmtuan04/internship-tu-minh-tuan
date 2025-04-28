import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    // Flow 3 bước: Check, set, set rỗng
    if (input.trim() === "") {
      alert("Todo không được để trống!");
      return;
    }
    setTodos([input, ...todos]);
    setInput("");
  };

  const handleDeleteTodo = (index) => {
    // Lọc và trả về array k có index nào trùng
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    const newTodo = prompt("Nhập nội dung mới:", todos[index]);
    if (newTodo !== null && newTodo.trim() !== "") {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? newTodo : todo
      );
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Todo List</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Create task..."
          className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <span className="text-gray-700">{todo}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEditTodo(index)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition-all"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;