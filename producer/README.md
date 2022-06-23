# Producer

Produce different payloads, stream the payloads via message broker to the browser.

## Container (N/A)

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

 