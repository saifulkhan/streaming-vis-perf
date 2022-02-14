import pandas as pd


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


def create_payload_size_df(
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


def create_decoding_time_df(
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
