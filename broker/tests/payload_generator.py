import random
import json
from datetime import datetime
import sys
import numpy as np

sys.path.append("..")

from server.models.spectrum_pb2 import Spectrum


x_min = 0
x_max = 0
y_min = 0
y_max = 10
channels = []
power = []
sd_u = []
sd_l = []

step = 2


def generate_spectrum_pb(num_channels: int):
    """
    Generate UTF-8 payload of spectrum plot
    """

    channels = list(range(num_channels))
    power = list(np.round(np.absolute(np.sin(np.random.rand(num_channels))), 2) * 10)
    sd_u = list(np.round(np.absolute(np.sin(np.random.rand(num_channels))), 2))
    sd_l = list(np.round(np.absolute(np.sin(np.random.rand(num_channels))), 2))

    payload_pb = Spectrum(
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        x_min=x_min,
        x_max=num_channels,
        y_min=y_min,
        y_max=y_max,
        channels=channels,
        power=power,
        sd_l=sd_l,
        sd_u=sd_u,
    )

    payload_ser = payload_pb.SerializeToString()
    return payload_ser, sys.getsizeof(payload_ser)


def generate_spectrum_utf(num_channels: int):
    """
    Generate UTF-8 payload of spectrum plot
    Returns payload and its size
    """

    channels = list(range(num_channels))
    power = list(np.round(np.absolute(np.sin(np.random.rand(num_channels))), 2) * 10)
    sd_u = list(np.round(np.absolute(np.sin(np.random.rand(num_channels))), 2))
    sd_l = list(np.round(np.absolute(np.sin(np.random.rand(num_channels))), 2))

    payload_text = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "x_min": x_min,
        "x_max": num_channels,
        "y_min": y_min,
        "y_max": y_max,
        "channels": channels,
        "power": power,
        "sd_l": sd_l,
        "sd_u": sd_u,
    }

    payload_ser = json.dumps(payload_text).encode("utf-8")
    return payload_ser, sys.getsizeof(payload_ser)
