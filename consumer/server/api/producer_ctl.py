import sys
import json
import asyncio
from loguru import logger
import random
from datetime import datetime
from fastapi import APIRouter, WebSocket
from aiokafka import AIOKafkaProducer

from server.core.config import PROJECT_NAME, BROKER_INSTANCE
from server.models.model import ProducerMessage, ProducerResponse

producer_ctl = APIRouter()


@producer_ctl.post("/1")
async def producer_1():
    """
    Produce a message into <topicname>
    This will produce a message into a Apache Kafka topic
    And this path operation will:
    * return ProducerResponse
    """

    logger.info(
        f"producer_ctl: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )
    topic = "topic1"

    d = []
    sd_u = []
    sd_l = []
    xMax = 600000
    yMax = 20
    for i in range(xMax):
        d.append(random.randrange(5, yMax - 1, 5))
        sd_u.append(0.4)
        sd_l.append(0.4)

    data = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "x_min": 0,
        "x_max": xMax,
        "y_min": 1,
        "y_max": yMax,
        "data": d,
        "sd_u": sd_u,
        "sd_l": sd_l,
    }

    def serializer(value):
        return json.dumps(value).encode("utf-8")

    aioproducer = AIOKafkaProducer(
        bootstrap_servers=BROKER_INSTANCE,
        value_serializer=serializer,
        compression_type="gzip",
        max_request_size=15728640,  # 15 MB
    )

    await aioproducer.start()
    logger.info(
        f"producer_ctl: send topic = {topic}, len(curve) = {len(curve)}, sizeof data = {sys.getsizeof(data)}, after serialization = {sys.getsizeof(serializer(data))}"
    )
    await aioproducer.send_and_wait(topic, data)
    # response = ProducerResponse(topic=topic)
    logger.info(f"producer_ctl: sent")
    return


@producer_ctl.post("/3")
async def producer_3():
    """ """
    topic = "topic3"
    logger.info(
        f"producer_ctl: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )

    curve = []
    xMax = 600000
    yMax = 20
    for i in range(xMax):
        curve.extend([random.randrange(5, yMax - 1, 5), 0.4, 0.8])

    from server.models.spectrum_pb2 import Spectrum

    data = Spectrum(
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        xMin=0,
        xMax=xMax,
        yMin=1,
        yMax=yMax,
        data=curve,
    )

    producer = AIOKafkaProducer(
        bootstrap_servers=BROKER_INSTANCE,
        # value_serializer=serializer,
        compression_type="gzip",
        max_request_size=15728640,  # 15 MB
    )
    await producer.start()

    logger.info(
        f"producer_ctl: send topic = {topic}, len(curve) = {len(curve)}, sizeof data = {sys.getsizeof(data)}, after serialization = {sys.getsizeof(data.SerializeToString())}"
    )
    await producer.send_and_wait(topic, data.SerializeToString())
    # response = ProducerResponse(topic=topic)
    logger.info(f"producer_ctl: response")
    return


@producer_ctl.post("/4")
async def producer_4():
    """ """
    topic = "topic4"
    logger.info(
        f"producer_ctl: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )

    curve = []
    xMax = 600000
    yMax = 20
    for i in range(xMax):
        curve.extend([random.randrange(5, yMax - 1, 5), 0.4, 0.8])

    from server.models.spectrum_pb2 import Spectrum

    data = Spectrum(
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        xMin=0,
        xMax=xMax,
        yMin=1,
        yMax=yMax,
        data=curve,
    )

    logger.info(
        f"producer_ctl: send topic = {topic}, len(curve) = {len(curve)}, sizeof data = {sys.getsizeof(data)}"
    )

    from confluent_kafka import SerializingProducer
    from confluent_kafka.serialization import StringSerializer
    from confluent_kafka.schema_registry import SchemaRegistryClient
    from confluent_kafka.schema_registry.protobuf import ProtobufSerializer

    schema_registry_conf = {"url": "http://0.0.0.0:8081"}
    schema_registry_client = SchemaRegistryClient(schema_registry_conf)

    protobuf_serializer = ProtobufSerializer(
        Spectrum, schema_registry_client, {"use.deprecated.format": True}
    )

    producer_conf = {
        "bootstrap.servers": BROKER_INSTANCE,
        "key.serializer": StringSerializer("utf_8"),
        "value.serializer": protobuf_serializer,
        "message.max.bytes": 15728640,  # 15 MB
    }

    producer = SerializingProducer(producer_conf)

    response = producer.produce(
        topic=topic,
        partition=0,
        # key=str(uuid4()),
        value=data,
        on_delivery=delivery_report,
    )
    producer.flush()

    logger.info(f"producer_ctl: response = {response}")
    return


def delivery_report(err, msg):
    """
    Reports the failure or success of a message delivery.

    Args:
        err (KafkaError): The error that occurred on None on success.

        msg (Message): The message that was produced or failed.

    Note:
        In the delivery report callback the Message.key() and Message.value()
        will be the binary format as encoded by any configured Serializers and
        not the same object that was passed to produce().
        If you wish to pass the original object(s) for key and value to delivery
        report callback we recommend a bound callback or lambda where you pass
        the objects along.

    """
    if err is not None:
        print("Delivery failed for User record {}: {}".format(msg.key(), err))
        return
    print(
        "User record {} successfully produced to {} [{}] at offset {}".format(
            msg.key(), msg.topic(), msg.partition(), msg.offset()
        )
    )
