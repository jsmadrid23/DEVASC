import { useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [ipInfo, setIpInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (ip) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/ipinfo/${ip}`);
      setIpInfo(res.data);
      setError(null); 
    } catch (err) {
      console.error("Error fetching IP info:", err);
      setIpInfo(null);

      setError(err.response?.data?.detail || `IP address "${ip}" is invalid`);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-400">
          IPV4/IPV6 Address Information
        </h1>
      </div>

      <Search onSearch={handleSearch} />

      {ipInfo && (
        <Card title="IP Address Information" ipInfo={ipInfo} />
      )}

      {error && (
        <div className="p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
          <h2 className="font-bold text-xl mb-2">IP Address information not found</h2>
          <p className="text-gray-700 text-left italic">{error}</p>
        </div>
      )}

      <p className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} Johann Fernandez. All rights reserved.
      </p>
    </div>
  );
}

export default App;
