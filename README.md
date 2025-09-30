<div align="center">

# 🌐 IP Intelligence Toolkit

<strong>Real‑time IPv4 / IPv6 lookup • Geolocation • Network attribution • Interactive mapping</strong>

<br/>

![UI Screenshot](./images/ScreenshotUI.png)

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-%23009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) 
[![React](https://img.shields.io/badge/React-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) 
[![Leaflet](https://img.shields.io/badge/Leaflet-199900.svg?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A.svg?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](#license)

</div>

## ✨ Overview
This project is a modern **network utility prototype** for quickly inspecting IP address metadata. Enter any public IPv4 or IPv6 address and instantly retrieve:

- 🌍 Geolocation (city, region, country)
- 🛰️ Coordinates (lat / lon) with an interactive map
- 🏢 ISP / Carrier attribution
- 🆔 ASN (Autonomous System Number)
- 🔎 Version detection (IPv4 vs IPv6)

Powered by a **FastAPI backend** that proxies and normalizes data from the public API at `ipwho.is`, and a **React + Tailwind** front‑end with an animated dark UI.

> Ideal for: network students, field technicians, NOC dashboards, or integrating into future NetOps tooling.

---

## 🚀 Feature Highlights
| Category | Details |
|----------|---------|
| Lookup | IPv4 + IPv6 parsing & validation |
| Data Enrichment | Country, region, city, ASN, ISP, coordinates |
| UI/UX | Animated dark gradient theme, responsive layout, color‑coded metadata |
| Mapping | Live Leaflet map with coordinates from API |
| Error Handling | Clear user feedback for invalid or unreachable IPs |
| Extensible | Clean separation between API layer and UI components |

---

## 🧩 Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, TailwindCSS, React Leaflet |
| Backend | FastAPI, Uvicorn, Requests |
| Mapping | Leaflet tiles (client-side) |
| Transport | REST (JSON) |
| Styling | Utility-first Tailwind classes + custom gradients |

---

## 🏗️ Architecture Snapshot
```
React (Vite)  --->  FastAPI  --->  ipwho.is (External Data Source)
   UI + Map          /ipinfo/{ip}        Normalized JSON
```

The backend performs:
1. Input acceptance (`/ipinfo/{ip}`)
2. Upstream fetch (`https://ipwho.is/{ip}`)
3. Validation & success flag check
4. Clean JSON response (only relevant fields)
5. Error normalization (400 for invalid, 500 upstream failure)

---

## 🔌 API Endpoint
### `GET /ipinfo/{ip}`
Returns normalized IP intelligence.

Example Response:
```json
{
  "ip": "8.8.8.8",
  "version": "IPv4",
  "country": "United States",
  "country_code": "US",
  "region": "California",
  "city": "Mountain View",
  "org": "Google LLC",
  "asn": "AS15169",
  "latitude": 37.40599,
  "longitude": -122.078514
}
```

Error (invalid IP):
```json
{
  "detail": "IP address \"999.999.1\" is invalid"
}
```

---

## 🧪 Quick Start (Full Stack)

### 1. Clone & Enter
```bash
git clone https://github.com/<your-username>/DEVASC.git
cd DEVASC
```

### 2. Backend Setup (Python 3.9+)
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

pip install -r requirements.txt
```

Run backend:
```bash
cd backend
uvicorn main:app --reload
```
API: http://127.0.0.1:8000

### 3. Frontend Setup
```bash
npm install
```

Run dev server:
```bash
npm run dev
```
UI: http://localhost:5173

Ensure CORS origin matches (`http://localhost:5173`).

---

## 🗺️ Map Integration
Leaflet + React Leaflet power the map display. Coordinates from the API feed directly into the `<Map />` component. Make sure the Leaflet CSS is imported (Vite + React usually via component or global style).

---

## 📁 Project Structure
```
DEVASC/
├── backend/
│   └── main.py               # FastAPI service ( /ipinfo/{ip} )
├── src/
│   ├── App.jsx               # Root React component
│   ├── components/
│   │   ├── Search.jsx        # IP input + form
│   │   ├── Card.jsx          # Results layout + metadata panels
│   │   └── Map.jsx           # Leaflet map wrapper
│   └── main.jsx              # React entry
├── public/                   # Static assets
├── images/                   # Screenshots
├── requirements.txt
├── package.json
└── README.md
```

---

## 🧠 Design Notes
- Dark gradient aesthetic for focus and contrast.
- Color-coded metadata groups for faster scanning.
- Graceful error states styled distinctly (red accent block).
- Easily extendable to add: reverse DNS, RIR whois summary, latency tests, reputation scoring.

---

## 🔮 Possible Future Enhancements
- Bulk IP CSV upload + batch enrichment
- Caching layer (Redis) to reduce upstream calls
- Rate limiting & API key auth
- Export results (JSON / CSV)
- Dark/light theme toggle
- Reverse DNS + WHOIS summary
- ASN prefix / allocation stats
- Map clustering for multiple lookups

---

## 🧾 License
MIT License. See LICENSE (add one if missing) for details.

---

## 🤝 Contributing
PRs welcome! For larger changes, open an issue to discuss direction first.

---

## 🙌 Acknowledgements
- Data Source: https://ipwho.is
- Mapping: https://leafletjs.com
- Frameworks: FastAPI + React

---

<div align="center">
<sub>Crafted for learning, experimentation, and network visibility.</sub>
</div>
