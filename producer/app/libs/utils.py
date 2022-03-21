import numpy as np
import pandas as pd


## translate numbers from a range to another range
## by default, -180 - 180 -> 0 - 360
def transfrom(x, min_a=-180, max_a=180, min_b=0, max_b=360):
    return np.round((x - min_a) * ((max_b - min_b) / (max_a - min_a)) + min_b, 2)


def convert_bytes(size, unit=None):
    """
    This function converts byes to KB, MB and GB
    """
    if unit == "KB":
        return round(size / 1024, 0)
    elif unit == "MB":
        return round(size / (1024 * 1024), 0)
    elif unit == "GB":
        round(size / (1024 * 1024 * 1024), 0)
    else:
        return size
