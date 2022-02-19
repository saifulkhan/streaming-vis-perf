import random
import json
from datetime import datetime
import sys
import numpy as np
import pandas as pd

sys.path.append("..")
from server.models.spectrum_pb2 import Spectrum
from server.models.spectrogram_pb2 import Spectrograms, Spectrogram

#
# Spectrogram
#

x_min = 0
x_max = 0
y_min = 0
y_max = 10
channels = []
power = []
sd_u = []
sd_l = []

step = 2


def spectrum_protobuf(num_channels: int):
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


def spectrum_json(num_channels: int):
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


def to_df_spectrum_size_stat(
    channels=[],
    protobuf_payload_size=[],
    utf_payload_size=[],
):
    """ """
    _df = []

    for idx, channel in enumerate(channels):
        if len(protobuf_payload_size) > 0:
            d1 = {
                "channel": channel,
                "time": protobuf_payload_size[idx],
                "encoding": "ProtoBuf",
            }
            _df.append(d1)

        if len(utf_payload_size) > 0:
            d2 = {
                "channel": channel,
                "time": utf_payload_size[idx],
                "encoding": "JSON (utf-8)",
            }
            _df.append(d2)

    df = pd.DataFrame(_df)
    return df


def to_df_spectrum_decoding_stat(
    num_iter=0,
    channels=[],
    protobuf_decoding_time=[],
    utf_decoding_time=[],
):
    """ """
    idx = 0
    _df = []

    for channel in channels:
        for itr in range(num_iter):

            if len(protobuf_decoding_time) > 0:
                d1 = {
                    "channel": channel,
                    "itr": itr,
                    "time": protobuf_decoding_time[idx],
                    "encoding": "ProtoBuf",
                }
                _df.append(d1)

            if len(utf_decoding_time) > 0:
                d2 = {
                    "channel": channel,
                    "itr": itr,
                    "time": utf_decoding_time[idx],
                    "encoding": "JSON (utf-8)",
                }
                _df.append(d2)

            idx += 1

    df = pd.DataFrame(_df)
    return df


#
# Spectrogram
#


def baseline_polarization(num_spectrograms: int):
    """
    Generate baseline and polarization, e.g., [("0", "XY"), ("1", "XY"), ...]
    """
    base_pol = []
    for i in range(num_spectrograms):
        base_pol.append((str(i), random.choice(["XX", "YY", "XY", "YX"])))
    return base_pol


def spectrogram_protobus(num_spectrograms: int, num_channels: int):
    """
    Generate ProtoBuf payload
    Returns payload and its size
    """
    base_pol = baseline_polarization(num_spectrograms)

    _spectrograms = Spectrograms()

    for i in range(num_spectrograms):
        spec = _spectrograms.spectrogram.add()
        spec.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        spec.baseline = base_pol[i][0]
        spec.polarisation = base_pol[i][1]
        spec.phase[:] = list(np.random.randint(0, 361, num_channels, dtype=np.int16))

    ser = _spectrograms.SerializeToString()
    return ser, sys.getsizeof(ser)


def spectrogram_json(num_spectrograms: int, num_channels: int):
    """
    Generate UTF-8 payload
    Returns payload and its size
    """

    _spectrograms = {"spectrogram": []}

    for i in range(num_spectrograms):
        spec = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "baseline": str(i),
            "polarisation": random.choice(["XX", "YY", "XY", "YX"]),
            "phase": list(
                np.random.randint(0, 360, num_channels, dtype=np.int16).tolist()
            ),
        }
        _spectrograms["spectrogram"].append(spec)

    ser = json.dumps(_spectrograms).encode("utf-8")
    return ser, sys.getsizeof(ser)
