from enum import Enum


class Protocol(str, Enum):
    JSON = ("json",)
    PROTOBUF = ("protobuf",)
