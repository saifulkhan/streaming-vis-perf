# Visualisations

Implement and benchmark performance of different visualizations.

## Getting Started Locally

Setup environment and install dependencies. Update the `.env` file.

```bash
# if the producer is running in a host machine
BROKER_INSTANCE=localhost:9092

# if the producer is running in a container
BROKER_INSTANCE=localhost:9092
```

Python environment and dependencies:

```bash
source ./venv/bin/activate
```

### Benchmark Notebooks

### Visualizations

#### Synthetic Data

```bash
 cd app/metric-generator

# generate synthetic power spectrum protobuf payload
mock_protobuf_spectrum.py
# we can see the power spectrum plot in:
# http://localhost:3000/plot/spectrum?protocol=protobuf


# generate synthetic spectrogram protobuf payload
python mock_protobuf_spectrograms.py
# we can see the spectrograms and a spectrogram in
# http://localhost:3000/plot/spectrograms?protocol=protobuf
# http://localhost:3000/plot/spectrogram?idx=1&protocol=protobuf
```

#### Measurementset

We can read measurementset, generate protobuf payloads.

```bash
# command
python ms_protobuf_payloads.py <measurement_set.ms>

# data from the Meerkat telescope is mounted to the `data` folder
python ms_protobuf_payloads.py ../../data/1643124898_sdp_l0.ms

```

The visualizations can be accessed from

http://localhost:3000/plot/spectrum?protocol=protobuf
http://localhost:3000/plot/spectrograms?protocol=protobuf
http://localhost:3000/plot/spectrogram?idx=1&protocol=protobuf
