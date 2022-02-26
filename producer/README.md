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

Setup a Python virtual environment and install the dependencies:

```bash
pip install virtualenv
virtualenv venv

source ./venv/bin/activate
pip install -r requirements.txt
```

Set the environment variables in the `.env` file:

```bash
export BROKER_INSTANCE=localhost:9092
```

Start the server:

```bash
source ./venv/bin/activate
uvicorn server.main:app --reload --port 8002 --host 0.0.0.0
```

## Notebooks for Generating and Plotting Benchmarks

```bash

```

## ProtoBuf Commands

## Experimental Code for ProtoBuf Serialisation and Deserialisation in Kafaka

Protobuf Kafka serializer and deserializer with schema registry
[Ref.](https://github.com/confluentinc/confluent-kafka-python/tree/master/examples)

```bash
python ./tests/protobuf_producer.py -b "localhost:9092" -s "http://0.0.0.0:8081"
python ./tests/protobuf_consumer.py  -b "localhost:9092" -s "http://0.0.0.0:8081"
```
