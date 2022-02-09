import random
import json
from datetime import datetime
import sys

sys.path.append("..")

from server.models.spectrum_pb2 import Spectrum


def generate_spectrum_pb(num_data):
    """
    Generate UTF-8 payload of spectrum plot
    """
    d = []
    sd_u = []
    sd_l = []
    x_max = num_data
    y_min = 1
    y_max = 20

    for i in range(x_max):
        d.append(random.randrange(y_min, y_max - 1, 1))
        sd_u.append(0.4)
        sd_l.append(0.2)

    payload_pb = Spectrum(
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        x_min=0,
        x_max=x_max,
        y_min=y_min,
        y_max=y_max,
        data=d,
        sd_l=sd_l,
        sd_u=sd_u,
    )

    payload_ser = payload_pb.SerializeToString()
    return payload_ser, sys.getsizeof(payload_ser)


def generate_spectrum_utf(num_data):
    """
    Generate UTF-8 payload of spectrum plot
    Returns payload and its size
    """
    d = []
    sd_u = []
    sd_l = []
    x_max = num_data
    y_min = 1
    y_max = 20

    for i in range(x_max):
        d.append(random.randrange(y_min, y_max - 1, 1))
        sd_u.append(0.4)
        sd_l.append(0.4)

    payload_text = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "x_min": 0,
        "x_max": x_max,
        "y_min": y_min,
        "y_max": y_max,
        "data": d,
        "sd_l": sd_l,
        "sd_u": sd_u,
    }

    payload_ser = json.dumps(payload_text).encode("utf-8")
    return payload_ser, sys.getsizeof(payload_ser)
