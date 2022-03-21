# Consumer

Produce different payloads, stream the payloads via message broker to the browser.

## Container

Set the environment variables in the `.env` file:

```bash
BROKER_INSTANCE=broker:29092
```

The project `./consumer` folder is mounted to the `/app` folder of the `consumer` container.

## Getting Started Locally

Start the consumer API server

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

Start the server:

```bash
source ./venv/bin/activate
uvicorn server.main:app --reload --port 8002 --host 0.0.0.0
```
