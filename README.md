# Scalable Streaming Data VIS and Benchmarks

## Start the services

Start all the services

```bash
docker-compose up -d

# Stopping producer        ... done
# Stopping visualisation   ... done
# Stopping consumer        ... done
# Stopping ksqldb-cli      ... done
# Stopping control-center  ... done
# Stopping ksqldb-server   ... done
# Stopping connect         ... done
# Stopping rest-proxy      ... done
# Stopping schema-registry ... done
# Stopping broker          ... done
# Stopping zookeeper       ... done
```

Check the status of the services

```bash
docker-compose ps

#      Name                    Command               State                                         Ports
# ---------------------------------------------------------------------------------------------------------------------------------------------
# broker            /etc/confluent/docker/run        Up      0.0.0.0:9092->9092/tcp,:::9092->9092/tcp, 0.0.0.0:9101->9101/tcp,:::9101->9101/tcp
# connect           /etc/confluent/docker/run        Up      0.0.0.0:8083->8083/tcp,:::8083->8083/tcp, 9092/tcp
# consumer          uvicorn server.main:app -- ...   Up      0.0.0.0:8002->8002/tcp,:::8002->8002/tcp
# control-center    /etc/confluent/docker/run        Up      0.0.0.0:9021->9021/tcp,:::9021->9021/tcp
# ksqldb-cli        /bin/sh                          Up
# ksqldb-server     /etc/confluent/docker/run        Up      0.0.0.0:8088->8088/tcp,:::8088->8088/tcp
# producer          uvicorn server.main:app -- ...   Up
# rest-proxy        /etc/confluent/docker/run        Up      0.0.0.0:8082->8082/tcp,:::8082->8082/tcp
# schema-registry   /etc/confluent/docker/run        Up      0.0.0.0:8081->8081/tcp,:::8081->8081/tcp
# visualisation     docker-entrypoint.sh yarn dev    Up      0.0.0.0:3000->3000/tcp,:::3000->3000/tcp
# zookeeper         /etc/confluent/docker/run        Up      0.0.0.0:2181->2181/tcp,:::2181->2181/tcp, 2888/tcp, 3888/tcp
```

Command to rebuild the images

```bash
docker-compose up -d --no-deps --build
```

## Visualisations

Open `localhost:3000` to access the UI and attach to the `producer` container to generate experimental data for the visualisations. For more information check the READMEs inside each folder.

## Produce data

## Manually start- producer, consumer, and visualisation services

Please see the README files inside each folder.

# Code Architecture

![alt text](./achitecture-code.png "Code architecture")
