import json
import asyncio
from loguru import logger
from fastapi import APIRouter, WebSocket
from aiokafka import AIOKafkaProducer

from app.core.config import PROJECT_NAME, BROKER_INSTANCE, LOGGING_LEVEL
from app.models.model import ProducerMessage, ProducerResponse

producer = APIRouter()


def serializer(value):
    return json.dumps(value).encode("ascii")


loop = asyncio.get_event_loop()
aioproducer = AIOKafkaProducer(
    # loop=loop,
    # client_id=PROJECT_NAME,
    bootstrap_servers=BROKER_INSTANCE,
    value_serializer=serializer,
    compression_type="gzip",
    max_request_size=15728640,  # 15 MB
)


@producer.post("")
async def producer_send(msg: ProducerMessage):
    """
    Produce a message into <topicname>
    This will produce a message into a Apache Kafka topic
    And this path operation will:
    * return ProducerResponse
    """

    payload = msg.dict()
    topic = payload.get("topic")

    logger.info(
        f"producer: broker instance = {BROKER_INSTANCE}, project name = {PROJECT_NAME}"
    )
    await aioproducer.start()

    logger.info(f"producer: send topic = {topic}, payload = {payload}")

    await aioproducer.send_and_wait(topic, payload)

    # response = ProducerResponse(topic=topic)
    logger.info(f"producer: response")
    return
