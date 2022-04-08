# Visualisations

Implement and benchmark performance of different visualizations.

## Login to the producer container

If the service is started in a container then login

```bash
docker exec -it producer bash
```

## Getting started locally

Setup environment and install dependencies. Update the `.env` file.

```bash
# if the producer is running in a host machine
BROKER_INSTANCE=localhost:9092
```

Python environment and dependencies:

```bash
source ./venv/bin/activate
```

## Produce data

### Synthetic Data

Go to the scripts location folder

```bash
 cd app/metric-generator
```

Generate synthetic power spectrum protobuf payload

```bash
python mock_protobuf_spectrum.py
```

We can see the power spectrum plot in: http://localhost:3000/plot/spectrum?protocol=protobuf

Generate synthetic spectrogram protobuf payload

```bash
python mock_protobuf_spectrograms.py
```

We can see the spectrograms in: http://localhost:3000/plot/spectrograms?protocol=protobuf and and a spectrogram in: http://localhost:3000/plot/spectrogram?idx=1&protocol=protobuf

#### Measurementset

We can read measurementset, generate protobuf payloads. Command to read measurementset and generate metrics

```bash
python ms_protobuf_payloads.py <measurement_set.ms>
```

Fpr example, we mounted some large volume of data data from the Meerkat telescope in our `data` folder

```bash
python ms_protobuf_payloads.py ../../data/1643124898_sdp_l0.ms
```

The visualizations can be accessed from:
http://localhost:3000/plot/spectrum?protocol=protobuf,
http://localhost:3000/plot/spectrograms?protocol=protobuf, and
http://localhost:3000/plot/spectrogram?idx=1&protocol=protobuf

### Notebooks for generating benchmarks

```bash
TODO
```
