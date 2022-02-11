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

Start the server

```bash
## set the configuration variables, e.g, the broker address
export BROKER_INSTANCE=localhost:9092

uvicorn server.main:app --reload-include app --port 8002 --host 0.0.0.0
uvicorn server.main:app --reload --port 8002 --host 0.0.0.0
```

## Notebooks for Generating and Plotting Benchmarks

```bash

```

## ProtoBuf Commands

Protocol buffer compiler installation [doc](https://grpc.io/docs/protoc-installation).

```bash
# general syntax
protoc -I=./app/models --python_out=./app/models ./app/models/user.proto

cd messages

# spectrum
rm spectrum_pb2.py
rm ../broker/server/models/spectrum_pb2.py
protoc -I=. --python_out=. ./spectrum.proto
mv spectrum_pb2.py ../broker/server/models/spectrum_pb2.py
```

## Experimental Code for ProtoBuf Serialisation and Deserialisation in Kafaka

Protobuf Kafka serializer and deserializer with schema registry
[Ref.](https://github.com/confluentinc/confluent-kafka-python/tree/master/examples)

```bash
python ./tests/protobuf_producer.py -b "localhost:9092" -s "http://0.0.0.0:8081"
python ./tests/protobuf_consumer.py  -b "localhost:9092" -s "http://0.0.0.0:8081"
```
