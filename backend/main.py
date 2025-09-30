from fastapi import FastAPI, HTTPException
import requests
import socket
import subprocess
import platform
import whois
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://ipwho.is"


# ------------ Main Unified Endpoint ------------
@app.get("/details/{query}")
def get_full_details(query: str):
    result = {}

    # ---------------- Lookup / Resolve ----------------
    try:
        ip_address = socket.gethostbyname(query)
        result["lookup"] = {"domain": query, "ip_address": ip_address}
    except socket.gaierror:
        ip_address = query  # assume it's already an IP
        result["lookup"] = {"domain": None, "ip_address": ip_address}

    # ---------------- IP Info ----------------
    try:
        url = f"{BASE_URL}/{ip_address}"
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception("Failed to fetch data from ipwho.is")

        data = response.json()
        if not data.get("success"):
            raise Exception(f"Invalid IP: {ip_address}")

        result["ip_info"] = {
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
    except Exception as e:
        result["ip_info"] = {"error": str(e)}

    # ---------------- WHOIS Info ----------------
    try:
        if result["lookup"]["domain"]:  # only do WHOIS if it’s a domain
            w = whois.whois(result["lookup"]["domain"])
            result["whois"] = {
                "domain_name": w.domain_name,
                "registrar": w.registrar,
                "creation_date": str(w.creation_date),
                "expiration_date": str(w.expiration_date),
                "updated_date": str(w.updated_date),
                "name_servers": w.name_servers,
                "status": w.status,
                "emails": w.emails,
            }
        else:
            result["whois"] = {"info": "Not a domain, WHOIS skipped"}
    except Exception as e:
        result["whois"] = {"error": str(e)}

    # ---------------- Ping Status ----------------
    try:
        param = "-n" if platform.system().lower() == "windows" else "-c"
        command = ["ping", param, "1", ip_address]
        result_ping = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        status = "Reachable" if result_ping.returncode == 0 else "Unreachable"
        result["ping"] = {"ip": ip_address, "status": status}
    except Exception as e:
        result["ping"] = {"error": str(e)}

    return result
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
