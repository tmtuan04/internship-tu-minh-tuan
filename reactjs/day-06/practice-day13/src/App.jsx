import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  // Sử dụng fetch luôn cho nhanh
  useEffect(() => {
    fetch("https://680efc6867c5abddd1937a89.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          User List
        </h1>
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-700">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
