from fastapi import FastAPI, HTTPException  # Import FastAPI and HTTPException for API and error handling
import requests  # Used to make HTTP requests to external APIs
from fastapi.middleware.cors import CORSMiddleware  # Import middleware to handle CORS

app = FastAPI()  # Create a FastAPI application instance

# Enable CORS so the frontend (running at http://localhost:5173) can call this API
app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:5173"],  # Only allow requests from this origin
allow_credentials=True,
allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
allow_headers=["*"],  # Allow all headers
)

BASE_URL = "https://ipwho.is"  # The base URL for the external IP lookup service

# Define an endpoint that takes an IP address as a path parameter
@app.get("/ipinfo/{ip}")
def get_ip_info(ip: str):
url = f"{BASE_URL}/{ip}"  # Build the request URL with the provided IP
response = requests.get(url)  # Send a GET request to ipwho.is

# If the API request fails (non-200 response), raise a server error
if response.status_code != 200:
raise HTTPException(status_code=500, detail="Failed to fetch data from ipwho.is")

data = response.json()  # Parse the response as JSON

# If the IP lookup service reports failure, raise a bad request error
if not data.get("success"):
raise HTTPException(status_code=400, detail=f'IP address "{ip}" is invalid')

# Return a filtered response with only the fields we care about
return {
"ip": data.get("ip"),  # The IP address
"version": data.get("type"),  # IPv4 or IPv6
"country": data.get("country"),  # Country name
"country_code": data.get("country_code"),  # Country code (e.g., "US", "PH")
"region": data.get("region"),  # Region/state
"city": data.get("city"),  # City
"org": data.get("connection", {}).get("isp"),  # Internet Service Provider
"asn": data.get("connection", {}).get("asn"),  # Autonomous System Number
"latitude": data.get("latitude"),  # Geo latitude
"longitude": data.get("longitude"),  # Geo longitude
}
