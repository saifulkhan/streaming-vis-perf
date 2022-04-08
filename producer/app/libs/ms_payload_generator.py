"""
Functions to convert visibilities into QA plots.
"""

import numpy as np
from datetime import datetime
import math

from models.protobuf.spectrum_pb2 import Spectrum
from models.protobuf.spectrogram_pb2 import Spectrograms, Spectrogram


# translate numbers from a range to another range
# by default, -180 - 180 -> 0 - 360
def transfrom_hsl(x, min_a=-180, max_a=180, min_b=0, max_b=360):
    return (x - min_a) * ((max_b - min_b) / (max_a - min_a)) + min_b


def spectrum_plot(data_sample, antenna1, antenna2, frequency, chan_avg=5):
    """
    Generate plot of mean autospectrum in intensity over all antennas.

    :param data: visibility data array
    :param antenna1: antenna 1
    :param antenna2: antenna 2
    :param frequency: channel frequencies
    :param chan_avg: number of channels to average together

    """
    # Extract autocorrelations and calculate their intensity
    auto = np.array(antenna1) == np.array(antenna2)
    data_auto = data_sample[auto, :, :]
    # averaging polarisation 0 and 3
    spectrum = 0.5 * (data_auto[:, :, 0] + data_auto[:, :, 3]).real

    # Take mean over antennas
    spectrum = spectrum.mean(axis=0)

    # Average frequencies over channels and convert to MHz
    freq_avg = 1.0e-6 * frequency.reshape(-1, chan_avg).mean(axis=1)

    # Take mean and standard deviation of spectrum over channels
    tmp = spectrum.reshape(-1, chan_avg)
    spec_avg = tmp.mean(axis=1)
    spec_std = tmp.std(axis=1)

    payload = Spectrum(
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        x_min=math.floor(np.min(freq_avg)),
        x_max=math.ceil(np.max(freq_avg)),
        y_min=np.min(spec_avg) - np.max(spec_std),
        y_max=np.max(spec_avg) + np.max(spec_std),
        channels=list(freq_avg),
        power=list(np.round(spec_avg, 2)),
        sd_l=list(np.round(spec_std, 2)),
        sd_u=list(np.round(spec_std, 2)),
    )

    payload_ser = payload.SerializeToString()
    return payload_ser


def spectrograms(data, baseline, frequency, polarisation, chan_avg=50):
    """
    Generate plot of phase.

    :param data: visibility data array
    :param baseline: baselines
    :param frequency: frequency of channels
    :param polarisation: polarisations
    :param chan_avg: number of channels to average together

    """
    # Get array dimensions
    nbase, _, npol = data.shape

    # Normalise visibilities by dividing by amplitude
    data_norm = np.where(data != 0.0, data / np.abs(data), 0.0)

    # Average over channels
    freq_avg = frequency.reshape(-1, chan_avg).mean(axis=1)
    data_avg = data_norm.reshape(nbase, -1, chan_avg, npol).mean(axis=2)

    # Get phase (in range -180 to 180)
    phase = np.angle(data_avg, deg=True)

    # convert phase (in range 0 to 360); shape = (baseline, channel, polarisation)
    phase_hsl = transfrom_hsl(phase)
    # (baseline, channel, polarisation) -> (baseline, polarisation, channel)
    phase_values = phase_hsl.transpose(0, 2, 1)

    _spectrograms = Spectrograms()

    num_baselines = 60  # len(baseline)

    for b in range(60, 1 + num_baselines, 1):
        for p in range(len(polarisation)):
            spec = _spectrograms.spectrogram.add()
            spec.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            spec.baseline = baseline[b]
            spec.polarisation = polarisation[p]
            spec.phase[:] = list(np.int_(phase_values[b][p]))

    payload_ser = _spectrograms.SerializeToString()
    return payload_ser
