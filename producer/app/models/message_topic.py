from enum import Enum


class MessageTopic(str, Enum):
    SPECTRUM = "spectrum"
    SPECTROGRAMS = "spectrograms"
    SPECTROGRAM = "spectrogram"
    RFI = "rfi"
