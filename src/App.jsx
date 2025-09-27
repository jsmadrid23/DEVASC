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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                IP Address Lookup
              </h1>
              <p className="text-gray-300 text-lg mt-2">
                Discover detailed information about IPv4 and IPv6 addresses
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl font-semibold text-white">Search IP Address</h2>
            </div>
            <Search onSearch={handleSearch} />
          </div>

          {ipInfo && (
            <div className="mb-8 animate-fadeIn">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-semibold text-white">Results</h2>
              </div>
              <Card title="IP Address Information" ipInfo={ipInfo} />
            </div>
          )}

          {error && (
            <div className="mb-8 animate-fadeIn">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-semibold text-red-400">Error</h2>
              </div>
              <div className="p-6 bg-gradient-to-r from-red-900/50 to-red-800/30 border border-red-700/50 rounded-lg shadow-lg backdrop-blur-sm">
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex items-center text-gray-400 text-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2C5.477 2 2 5.477 2 10s3.477 8 8 8 8-3.477 8-8-3.477-8-8-8zM8 11a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App;
