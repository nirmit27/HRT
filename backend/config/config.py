"""
Configurations and settings
"""

from os import environ
from dotenv import load_dotenv


load_dotenv()


# Environment Variables
PORT = environ["PORT"] or 5000
DEBUG_MODE = True if environ["DEBUG_MODE"] == "True" else False
JWT_SECRET_KEY = environ["JWT_SECRET_KEY"]
JWT_BLACKLIST_ENABLED = True if environ["JWT_BLACKLIST_ENABLED"] else False

# File / Schema
FILENAME = environ["FILENAME"]
HEADERS = [
    "Employee_ID",
    "First_Name",
    "Last_Name",
    "DOB",
    "Aadhaar",
    "PAN",
    "Driver_License",
]
