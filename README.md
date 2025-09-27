# IPv4/IPv6 Address Application

## Project Overview
This Python application is designed as a **prototype tool for network technicians** to retrieve and display the computer’s current **public IPv4 and IPv6 addresses**.  

Using a public REST API (such as [ipapi.co](https://ipapi.co) or [ipstack.com](https://ipstack.com)), the application also provides additional information, including:  
- **Geolocation** (City, Region, Country)  
- **Internet Service Provider (ISP)**  
- **Autonomous System Number (ASN)**  

**Purpose:**  
- Quickly provide IP addressing information for troubleshooting and monitoring.  
- Serve as a prototype for potential future network management tools.

---

## Features
- Retrieve **public IPv4 and IPv6 addresses**.  
- Display **geolocation information** for each IP.  
- Show **ISP and ASN** details.  
- Clean, **formatted terminal output** for readability.  
- Handles **errors and invalid API responses** gracefully.


## Requisites

Before running the application, ensure you have the following installed:

### 📥 Downloads
- [Git](https://git-scm.com/downloads) – for cloning this repository.  
- [Python 3.9+](https://www.python.org/downloads/) – required to run the backend (FastAPI).  
- [Node.js (LTS)](https://nodejs.org/) – required if running the React frontend.  

### ⚙️ Installations
1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # macOS/Linux
   venv\Scripts\activate      # Windows
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
3. For frontend (if included), navigate to the frontend/ folder and install dependencies:
   ```bash
   npm install
4. Install leaflet for Map integration:
   ```bash
   npm install react-leaflet leaflet

### ▶️ Running the Application

#### Frontend (React)
1. Run the frontend in development mode:
   ```bash
    npm run dev
By default, it will be available at http://localhost:5173

#### Backend (FastAPI)
2. Change directory to backend:
   ```bash
    cd backend
3. Run the backend server using Uvicorn:
    ```bash
    py -m uvicorn main:app --reload
By default, the API will be available at http://127.0.0.1:8000
