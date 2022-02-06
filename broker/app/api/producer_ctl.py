import json
import asyncio
from loguru import logger
import random
from datetime import datetime
from fastapi import APIRouter, WebSocket
from aiokafka import AIOKafkaProducer

from app.core.config import PROJECT_NAME, BROKER_INSTANCE, LOGGING_LEVEL
from app.models.model import ProducerMessage, ProducerResponse

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
        f"producer: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )
    topic = "topic1"

    curve = []
    xMax = 600000
    yMax = 20
    for i in range(xMax):
        curve.append([i, random.randrange(5, yMax - 1, 5), 0.4, 0.8])

    data = {
        "topic": "spectrum",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "body": {
            "description": "Spectrum",
            "xLabel": "Frequency (MHz)",
            "yLabel": "Power (dB)",
            "xMin": 0,
            "xMax": xMax,
            "yMin": 1,
            "yMax": yMax,
            "data": curve,
        },
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
    logger.info(f"producer: send topic = {topic}, data = {True}")
    await aioproducer.send_and_wait(topic, data)
    # response = ProducerResponse(topic=topic)
    logger.info(f"producer: response")
    return


@producer_ctl.post("/2")
async def producer_2():
    """ """
    topic = "topic2"
    logger.info(
        f"producer: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )

    from app.models.user_pb2 import User

    data = User(
        name="Saiful Khan",
        favorite_color="Blue",
        favorite_number=1234567890,
    )

    # TODO
    def serializer(value):
        return json.dumps(value).encode()

    producer = AIOKafkaProducer(
        bootstrap_servers=BROKER_INSTANCE,
        # value_serializer=serializer,
        compression_type="gzip",
    )
    await producer.start()

    logger.info(f"producer: send topic = {topic}, data = {data.SerializeToString()}")

    await producer.send_and_wait(topic, data.SerializeToString())

    # response = ProducerResponse(topic=topic)
    logger.info(f"producer: response")
    return


@producer_ctl.post("/3")
async def producer_3():
    """ """
    topic = "topic3"
    logger.info(
        f"producer: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )

    curve = []
    xMax = 600000
    yMax = 20
    for i in range(xMax):
        curve.extend([random.randrange(5, yMax - 1, 5), 0.4, 0.8])

    from app.models.spectrum_pb2 import Spectrum

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

    logger.info(f"producer: send topic = {topic}, data = ")

    await producer.send_and_wait(topic, data.SerializeToString())

    # response = ProducerResponse(topic=topic)
    logger.info(f"producer: response")
    return


# @producer.post("")
# async def producer_send(msg: ProducerMessage):
#     """
#     Produce a message into <topicname>
#     This will produce a message into a Apache Kafka topic
#     And this path operation will:
#     * return ProducerResponse
#     """

#     payload = msg.dict()
#     topic = payload.get("topic")

#     logger.info(
#         f"producer: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
#     )
#     await aioproducer.start()

#     logger.info(f"producer: send topic = {topic}, payload = {payload}")

#     await aioproducer.send_and_wait(topic, payload)

#     # response = ProducerResponse(topic=topic)
#     logger.info(f"producer: response")
#     return
