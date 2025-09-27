import Map from "./Map";

function Card({ title, ipInfo }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      
      
      <div className="md:w-1/2 w-full p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
        <Map 
          latitude={ipInfo.latitude} 
          longitude={ipInfo.longitude} 
          city={ipInfo.city} 
          country={ipInfo.country} 
        />
      </div>

      
      <div className="md:w-1/2 w-full p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
        <div className="font-bold text-xl mb-4">{title}</div>
        <ul className="space-y-2 text-gray-700 text-left">
          <li><strong>IP:</strong> {ipInfo.ip}</li>
          <li><strong>Version:</strong> {ipInfo.version}</li>
          <li><strong>Country:</strong> {ipInfo.country} ({ipInfo.country_code})</li>
          <li><strong>Region:</strong> {ipInfo.region}</li>
          <li><strong>City:</strong> {ipInfo.city}</li>
          <li><strong>ISP:</strong> {ipInfo.org}</li>
          <li><strong>ASN:</strong> {ipInfo.asn}</li>
          <li><strong>Coordinates:</strong> {ipInfo.latitude}, {ipInfo.longitude}</li>
        </ul>
      </div>

    </div>
  );
}

export default Card;
