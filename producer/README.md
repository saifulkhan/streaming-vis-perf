# Producer

Produce different payloads, stream the payloads via message broker to the browser.

## Container

Set the environment variables in the `.env` file:

```bash
 BROKER_INSTANCE=broker:29092
```

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
pip install virtualenv
virtualenv venv

source ./venv/bin/activate
pip install -r requirements.txt
```

## Scripts and Notebooks for Generating and Plotting Benchmarks

```bash

```

## ProtoBuf Commands

############################################################################

# Metric Generator

# Getting Started

## Option-1: Using Container

The docker container's working/source directory `/usr/src/metric-generator` is mapped/mounted to the host's `./metric-generator` folder. Therefore, attaching a VSCode editor to the `metric-generator` container is a convenient way to develop and debug.

## Option-2: Start Locally

This is not recommended. The instructions below are to develop and debug in the host machine.

```bash
# create a virtual environment and install dependencies
pip install virtualenv
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt

# The python-casacore installation in virtualenv may give C++ library related error. Using conda environment for installing casacore may solve the issue.
conda create --name metric-generator python=3.8
conda activate metric-generator

conda install -c conda-forge python-casacore
conda install -c conda-forge loguru
conda install -c conda-forge plotly
conda install -c conda-forge starlette
conda install -c conda-forge requests

# update the broker API in the .env file
BROKER_INSTANCE=localhost:9092
```

# Generate Metrics

SSH to the container:

```bash
docker exec -it metric-generator bash
```

## Mock Data

This is particularly helpful during development and debugging. The following scripts create random spectrum plot and spectrogram data, and send to the message broker.

```
python mock_spectrum.py
python mock_spectrograms.py
```

## Measurementset Data

Create spectrum plot and spectrogram data from a measurement set, and send to the message broker.

```bash
python ms_to_qa.py <.ms>

# example
python ms_to_qa.py ./data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms
```

For the RFI debugging we aggregate date from two measurement sets (a) visibility data with flags, for example,

```bash
python ms_to_rfi.py <measurement-set with visibility and flags> <measurement-set of RFI>

# example
python ms_to_rfi.py ./data/rfi/20_sources_with_screen/aa0.5_ms.MS ./data/rfi/aa05_low_rfi_84chans.ms
```

## ska-sdp-cbf-emulator Integration

> Note. This integration was not tested recently.

Read payloads from plasma, create spectrum plot data, and send to the message broker

```bash
# create plasma store
plasma_store -m 1000000000 -s /tmp/plasma &

# convert plasma payload to spectrumplot and send to the message broker
python plasma_to_spectrumplt.py "/tmp/plasma"

# start receiver
cd data
emu-recv -c ./50000ch.conf

# send data
cd data
emu-send -c ./50000ch.conf ./50000ch-model.ms
```

## Data Structures

The data structure written below is in human readable format, find the files in `metric-generator/models` for details.

Line plot for spectrum display:

```sh
Spectrum {
    timestamp: String,
    x_min: int,
    x_max: int,
    y_min: int,
    y_max: int,
    channels: int[],
    power: float[],
    sd_l: float[],
    sd_u: float[],
}
```

Waterfall of spectrograms for phase display:

```sh
Spectrogram {
    timestamp: String,
    baseline: String,
    polarisation: String,
    phase: int[];
}

Spectrograms {
    spectrogram: Spectrogram[];
}
```

See the file `rand_phase_display_data.py` as an example.

## Download Measurementset

We used measurement set [PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms](https://console.cloud.google.com/storage/browser/ska1-simulation-data/simulations/psi_simulations_SP-1158/low/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms;tab=objects?prefix=&forceOnObjectsSortingFiltering=false) to test the spectrogram. Example commands to download measurement sets from GCP:

```bash
# using gsutil tool
gsutil -m cp -r <src> <dst>

# create & download in the metrics-generator/data folder
cd metrics-generator
mkdir ./data

# example 1
gsutil -m cp -r "gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" ./data/

# example 2
gsutil -m cp -r "gs://ska1-simulation-data/simulations/psi_simulations_SP-1158/low/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" ./data/

```
