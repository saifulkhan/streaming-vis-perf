import requests
import random
from datetime import datetime
from time import sleep
import numpy as np
import requests


while True:
    # data = {
    #     'topic': 'phase',
    #     'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    #     "body": {
    #         "polarisation": ["XX", "XY"],
    #         "baseline": ["00", "01", "10"],
    #         "phase_values": [
    #             [
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(), # 100 random phase values between 0-360
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #             ],
    #             [
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #             ],
    #             [
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #                 np.random.randint(0,361,100,dtype=np.uint16).tolist(),
    #             ],
    #         ]
    #     }
    # }

    data = {
        "topic": "spectrogram",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "body": np.random.randint(0, 361, 20000, dtype=np.uint16).tolist(),
    }

    print(data)
    requests.post("http://0.0.0.0:8002/producer", json=data)
    sleep(0.001)
