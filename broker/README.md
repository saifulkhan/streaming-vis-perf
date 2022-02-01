# About


## Getting Started

Start the message broker

```bash
docker-compose up -d
docker-compose ps
```

Start the consumer API server

Prerequisite
- Python 3.8+, 
- FastAPI

```bash
## setup a python virtual environment and install the dependencies.
pip install virtualenv
virtualenv venv

source ./venv/bin/activate

pip install -r requirements.txt
```

```bash
## set the configuration variables, e.g, the broker address
export BROKER_INSTANCE=localhost:9092

## start the server
uvicorn app.main:app --reload-include app --port 8002 --host 0.0.0.0
```

## Send Messages

```bash
python ./tests/send.py        
```