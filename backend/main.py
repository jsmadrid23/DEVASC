from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://ipwho.is"

@app.get("/ipinfo/{ip}")
def get_ip_info(ip: str):
    url = f"{BASE_URL}/{ip}"
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch data from ipwho.is")

    data = response.json()

    if not data.get("success"):
        raise HTTPException(status_code=400, detail=f'IP address "{ip}" is invalid')

    return {
        "ip": data.get("ip"),
        "version": data.get("type"),
        "country": data.get("country"),
        "country_code": data.get("country_code"),
        "region": data.get("region"),
        "city": data.get("city"),
        "org": data.get("connection", {}).get("isp"),
        "asn": data.get("connection", {}).get("asn"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
    }
