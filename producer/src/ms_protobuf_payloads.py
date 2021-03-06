import time
import argparse
from datetime import datetime
import asyncio
import numpy as np
from casacore.tables import table, tablecolumn

import sys

sys.path.append("../")

import libs.ms_payload_generator as ms_payload_generator
from libs.producer import Producer
from models.protocol import Protocol
from models.message_topic import MessageTopic

producer = Producer()
topic_spectrum = f"{Protocol.PROTOBUF}_{MessageTopic.SPECTRUM}"
topic_spectrograms = f"{Protocol.PROTOBUF}_{MessageTopic.SPECTROGRAMS}"

AVG_CHAN_SPECTRUM = 1
AVG_CHAN_SPECTROGRAM = 1

# Map from correlation type to polarisation

corrtype_to_pol = {
    5: "RR",
    6: "RL",
    7: "LR",
    8: "LL",
    9: "XX",
    10: "XY",
    11: "YX",
    12: "YY",
}


async def ms_to_qa(ms, interval=None):
    """
    Feed measurement set to QA one time sample at a time.

    :param ms: name of measurement set
    :params interval: time between sending samples

    """
    print(f"Reading measurement set {ms}")
    await producer.start()

    # Open main table and ancillary tables
    main_table = table(ms, ack=False)
    ant_table = table(main_table.getkeyword("ANTENNA"), ack=False)
    spw_table = table(main_table.getkeyword("SPECTRAL_WINDOW"), ack=False)
    pol_table = table(main_table.getkeyword("POLARIZATION"), ack=False)

    # Get dimensions of data set
    num_rows = main_table.nrows()
    num_antennas = ant_table.nrows()
    num_baselines = ((num_antennas + 1) * num_antennas) // 2
    num_times = num_rows // num_baselines
    num_channels = tablecolumn(spw_table, "NUM_CHAN")[0]
    num_polarisations = tablecolumn(pol_table, "NUM_CORR")[0]

    print(f"No. Rows ........ = {num_rows}")
    print(f"No. Antennas .... = {num_antennas}")
    print(f"No. Baselines ... = {num_baselines}")
    print(f"No. Times ....... = {num_times}")
    print(f"No. Channels .... = {num_channels}")
    print(f"No. Polarisations = {num_polarisations}")

    # Antennas and baselines
    antenna1 = tablecolumn(main_table, "ANTENNA1")[0:num_baselines]
    antenna2 = tablecolumn(main_table, "ANTENNA2")[0:num_baselines]
    name = tablecolumn(ant_table, "NAME")[0:num_antennas]
    baseline = [f"{name[a1]}, {name[a2]}" for a1, a2 in zip(antenna1, antenna2)]

    # Channel frequencies
    frequency = tablecolumn(spw_table, "CHAN_FREQ")[0]

    # Polarisations
    corrtype = tablecolumn(pol_table, "CORR_TYPE")[0]
    polarisation = [corrtype_to_pol[c] for c in corrtype]

    if interval is None:
        # Calculate interval from times in the measurement set
        times = tablecolumn(main_table, "TIME")
        interval = times[num_baselines] - times[0]

    print(f"Time interval between samples = {interval} s")

    # Open the data column of the main table
    data = tablecolumn(main_table, "DATA")

    # Create array to contain data for one time sample
    data_sample = np.zeros(
        (num_baselines, num_channels, num_polarisations), dtype=np.complex128
    )

    try:

        for t in range(num_times):

            start = time.time()
            print(f"Reading time sample {t}")

            # Unpack data for this time sample

            for b in range(num_baselines):
                i = t * num_baselines + b
                data_sample[b, :, :] = data[i]

            sample_time = times[t * num_baselines]

            # Generate spectrum plot and send to queues
            payload1 = ms_payload_generator.spectrum_plot(
                data_sample, antenna1, antenna2, frequency, AVG_CHAN_SPECTRUM
            )
            await producer.produce(payload1, topic_spectrum)

            # Generate spectrograms and send to queues
            payload2 = ms_payload_generator.spectrograms(
                data_sample, baseline, frequency, polarisation, AVG_CHAN_SPECTROGRAM
            )
            await producer.produce(payload2, topic_spectrograms)

            # Wait until sending next sample, if necessary
            wait = start + interval - time.time()
            if wait > 0.0:
                time.sleep(wait)

        await producer.stop()

    except KeyboardInterrupt:

        pass


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("ms", help="name of measurement set")
    args = parser.parse_args()

    asyncio.run(ms_to_qa(args.ms))
