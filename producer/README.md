# About

Produce different payloads, stream the payloads via message broker to the browser.

## Getting Started Locally

Prerequisite

- Python 3.8+,
- FastAPI

Set the environment variables in the `.env` file:

```bash
export BROKER_INSTANCE=localhost:9092
```

Setup a Python virtual environment and install the dependencies:

```bash
python -m venv venv
source ./venv/bin/activate

pip install -r requirements.txt
```

## Genrate Data

### Notebooks for Generating Data

The following notebooks are used for generatinga and analysing performance of three plots:

1. `src/spectrum_benchmark.ipynb`
2. `src/spectrogram_benchmark.ipynb`
3. `src/spectrograms_benchmark.ipynb`


If we start the visualization interface, we can see the plots in: http://localhost:3000

### Measurement Set

We can also read measurement sets, generate (ProtoBuf) payloads, the command to read measurementset and generate metrics:

```bash
python ms_protobuf_payloads.py <measurement_set.ms>
```

For example, we mounted some large volume of data data from the Meerkat telescope in our `data` folder

```bash
python ms_protobuf_payloads.py ../../data/1643124898_sdp_l0.ms
```

# ProtoBuf Messages

Install ProtoBuf compiler, see [installation]( https://grpc.io/docs/protoc-installation), and install JavaScript see [doc](https://www.npmjs.com/package/protobufjs).

Run the shell script to compile, generate, and save Python and JavaScript definition of the ProtoBuf messages used in this project.

```bash
cd messages
sh -x ./compile-protobuf.sh
```
