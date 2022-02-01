import requests
import time
import json
import random
from random import randrange
from datetime import datetime
from time import sleep

# response = requests.get("http://0.0.0.0:8002/ping")
# print(response)


while True:
    curve = []
    xMax = 100
    yMax = 20
    for i in range(xMax):
        curve.append([i, random.randrange(5, yMax - 1, 5), 0.4, 0.8])

    msg = {
        "topic": "spectrum",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "body": {
            "description": "Spectrum",
            "xLabel": "Frequency (MHz)",
            "yLabel": "Power (dB)",
            "xMin": 0,
            "xMax": xMax,
            "yMin": 1,
            "yMax": yMax,
            "data": curve,
        },
    }

    print("Sending...")
    requests.post("http://0.0.0.0:8002/producer", json=msg)
    sleep(1)
