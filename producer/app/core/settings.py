"""
Project Settings file
"""
import os
from starlette.datastructures import CommaSeparatedStrings, Secret

DEFAULT_ROUTE_STR = ""
ALLOWED_HOSTS = CommaSeparatedStrings(os.getenv("ALLOWED_HOSTS", "*"))
