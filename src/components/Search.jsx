import { useState } from "react";

function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-6 outline-1 outline-gray-200 rounded-lg transition-shadow duration-300 mb-4"
    >
      <input
        type="text"
        placeholder="Enter IP address"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-4 bg-gray-100 outline-1 outline-gray-200 rounded-lg basis-5/6 me-3"
      />
      <button
        type="submit"
        className="p-4 bg-orange-400 rounded-lg basis-1/6 hover:shadow-md hover:shadow-orange-300 transition-shadow duration-300"
      >
        <p className="text-white text-center font-bold">Search IP Address</p>
      </button>
    </form>
  );
}

export default Search;
