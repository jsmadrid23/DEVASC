from fastapi import FastAPI, HTTPException  # For API and error handling
import requests  # For making external API requests
import socket  # For resolving domains to IPs
from fastapi.middleware.cors import CORSMiddleware  # For enabling frontend access (CORS)

app = FastAPI()

# Enable CORS so your frontend can call this API
app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:5173"],  # Allow only your frontend
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

BASE_URL = "https://ipwho.is"  # External IP info service


@app.get("/ipinfo/{target}")
def get_ip_info(target: str):
# Step 1: Try to resolve the target (could be IP or domain)
try:
resolved_ip = socket.gethostbyname(target)  # If target is a domain, convert it to IP
except socket.gaierror:
raise HTTPException(status_code=400, detail=f'"{target}" is not a valid domain or IP')

# Step 2: Query ipwho.is with the resolved IP
url = f"{BASE_URL}/{resolved_ip}"
response = requests.get(url)

if response.status_code != 200:
raise HTTPException(status_code=500, detail="Failed to fetch data from ipwho.is")

data = response.json()

if not data.get("success"):
raise HTTPException(status_code=400, detail=f'Lookup failed for "{target}"')

# Step 3: Return the result, including both original input and resolved IP
return {
"input": target,               # What the user entered (domain or IP)
"resolved_ip": resolved_ip,    # Final IP used in the lookup
"version": data.get("type"),   # IPv4 or IPv6
"country": data.get("country"),
"country_code": data.get("country_code"),
"region": data.get("region"),
"city": data.get("city"),
"org": data.get("connection", {}).get("isp"),
"asn": data.get("connection", {}).get("asn"),
"latitude": data.get("latitude"),
"longitude": data.get("longitude"),
}
