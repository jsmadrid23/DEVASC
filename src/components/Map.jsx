import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 10); // recenters + zoom
    }
  }, [latitude, longitude, map]);

  return null;
}

function Map({ latitude, longitude, city, country }) {
  if (!latitude || !longitude) {
    return <div className="p-4 text-gray-500">No location available</div>;
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <RecenterMap latitude={latitude} longitude={longitude} />

        <Marker position={[latitude, longitude]}>
          <Popup>
            {city}, {country} <br /> 📍 {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
