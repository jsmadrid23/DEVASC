import Map from "./Map";
import { exportToCSV } from "../utils/csvExport";

function Card({ title, ipInfo }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={() => exportToCSV(ipInfo)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-400 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95"
          title="Export IP information to CSV"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-9-2m9 2l9-2" />
          </svg>
          <span className="text-white font-semibold">Export CSV</span>
        </button>
      </div>

      {/* Map and Info Container */}
      <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Map Container */}
      <div className="lg:w-1/2 w-full p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/50 rounded-lg shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-white">Location Map</h3>
        </div>
        <Map 
          latitude={ipInfo.latitude} 
          longitude={ipInfo.longitude} 
          city={ipInfo.city} 
          country={ipInfo.country} 
        />
      </div>

      {/* Information Container */}
      <div className="lg:w-1/2 w-full p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/50 rounded-lg shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
        <div className="flex items-center mb-6">
          <svg className="w-5 h-5 text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">Input:</span>
            <span className="text-purple-300 font-mono">{ipInfo.input}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">Resolved IP:</span>
            <span className="text-purple-300 font-mono">{ipInfo.resolved_ip}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">Version:</span>
            <span className="text-indigo-300">{ipInfo.version}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">Country:</span>
            <span className="text-green-300">{ipInfo.country} ({ipInfo.country_code})</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">Region:</span>
            <span className="text-blue-300">{ipInfo.region}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">City:</span>
            <span className="text-cyan-300">{ipInfo.city}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">ISP:</span>
            <span className="text-yellow-300">{ipInfo.org}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">ASN:</span>
            <span className="text-pink-300">{ipInfo.asn}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <span className="text-gray-300 font-medium">Coordinates:</span>
            <span className="text-orange-300 font-mono">{ipInfo.latitude}, {ipInfo.longitude}</span>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default Card;
