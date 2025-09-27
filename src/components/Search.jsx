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
      className="flex p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/50 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-500 mb-4 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-gray-500/80 hover:from-gray-700/60 hover:to-gray-600/40 hover:scale-[1.02]"
    >
      <input
        type="text"
        placeholder="Enter IP address"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-4 bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg basis-5/6 me-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.01]"
      />
      <button
        type="submit"
        className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg basis-1/6 hover:from-purple-400 hover:to-indigo-500 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95"
      >
        <p className="text-white text-center font-bold">Search IP Address</p>
      </button>
    </form>
  );
}

export default Search;
