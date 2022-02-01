import asyncio
import json
import logging
import typing

from fastapi import APIRouter, WebSocket
from starlette.endpoints import WebSocketEndpoint
from aiokafka import AIOKafkaConsumer

from app.models.model import ConsumerResponse
from app.core.config import BROKER_INSTANCE
from app.core.config import PROJECT_NAME

logger = logging.getLogger(__name__)

consumer = APIRouter()


async def consume(consumer, topicname):
    async for msg in consumer:
        return msg.value.decode()


@consumer.websocket_route("/{topicname}")
class WebsocketConsumer(WebSocketEndpoint):
    """
    Consume messages from <topicname>
    This will start a Kafka Consumer from a topic
    And this path operation will:
    * return ConsumerResponse
    """

    async def on_connect(self, websocket: WebSocket) -> None:
        topicname = websocket["path"].split("/")[2]

        logger.info(f"consumer: topicname = {topicname}")
        await websocket.accept()
        await websocket.send_json({"status": "connected"})

        loop = asyncio.get_event_loop()
        self.consumer = AIOKafkaConsumer(
            topicname,
            loop=loop,
            # client_id=PROJECT_NAME,
            bootstrap_servers=BROKER_INSTANCE,
            # enable_auto_commit=False,
            group_id="my-group",  # TODO
        )

        await self.consumer.start()

        self.consumer_task = asyncio.create_task(
            self.send_consumer_message(websocket=websocket, topicname=topicname)
        )

        logger.info("consumer: connected")

    async def on_disconnect(self, websocket: WebSocket, close_code: int) -> None:
        self.consumer_task.cancel()
        await self.consumer.stop()
        # logger.info("counter: %d", self.counter)
        logger.info("consumer: disconnected")
        logger.info("consumer: stopped")

    async def on_receive(self, websocket: WebSocket, data: typing.Any) -> None:
        await websocket.send_json({"Message": data})

    async def send_consumer_message(self, websocket: WebSocket, topicname: str) -> None:
        while True:
            data = await consume(self.consumer, topicname)
            logger.info(f"consumer: data = {data}, {json.loads(data)}")

            # TODO
            # response = ConsumerResponse(topic=topicname, **json.loads(data))
            # response = SpectrumDataResponse(topic=topicname, **json.loads(data))
            # logger.info("response = %s", response)

            # await websocket.send_text(f"{response.json()}")
            # res = {'data': response.json()}
            # logger.info("res = %s", res")
            # await websocket.send_json(res)

            await websocket.send_json(json.loads(data))
