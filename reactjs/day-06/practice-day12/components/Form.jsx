import { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  function handleChange(event) {
    console.log("Input value:", event.target.value); // Log giá trị khi gõ
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Final submitted name:", name); // Log giá trị khi submit
    alert(`Hello, ${name}`);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="space-x-2" onSubmit={handleSubmit}>
        {/* value + onChange */}
        <input
          className="border rounded-2xl p-2"
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <button className="cursor-pointer p-1 bg-gray-200 rounded-lg" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
