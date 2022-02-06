import sys
import asyncio
import json
from loguru import logger
import typing

from fastapi import APIRouter, WebSocket
from starlette.endpoints import WebSocketEndpoint
from aiokafka import AIOKafkaConsumer

from app.models.model import ConsumerResponse
from app.core.config import BROKER_INSTANCE
from app.core.config import PROJECT_NAME

# logger = logging.getLogger(__name__)

consumer_ctl = APIRouter()


@consumer_ctl.websocket_route("/{topicname}")
class WebsocketConsumer(WebSocketEndpoint):
    """
    Consume messages from <topicname>
    This will start a Kafka Consumer from a topic
    And this path operation will:
    * return ConsumerResponse
    """

    async def on_connect(self, websocket: WebSocket) -> None:
        topicname = websocket["path"].split("/")[2]

        logger.info(f"consumer_ctl: topicname = {topicname}")
        await websocket.accept()
        await websocket.send_json({"status": "connected"})

        loop = asyncio.get_event_loop()
        self.consumer = AIOKafkaConsumer(
            topicname,
            loop=loop,
            # client_id=PROJECT_NAME,
            bootstrap_servers=BROKER_INSTANCE,
            # enable_auto_commit=False,
            # group_id=topicname,  # TODO
        )

        await self.consumer.start()

        # try:
        #     async for msg in self.consumer_ctl:
        #         print(
        #             "{}:{:d}:{:d}: key={} value={} timestamp_ms={}".format(
        #                 msg.topic,
        #                 msg.partition,
        #                 msg.offset,
        #                 msg.key,
        #                 msg.value,
        #                 msg.timestamp,
        #             )
        #         )
        #         print(f"type of msg = {type(msg)}")
        #         # response = ConsumerResponse(topic=topicname, **json.loads(msg))
        #         await websocket.send_bytes(msg.value)

        # finally:
        #     logger.info("consumer_ctl: connected")
        #     await self.consumer.stop()

        self.consumer_task = asyncio.create_task(
            self.send_consumer_message(websocket=websocket, topicname=topicname)
        )

        logger.info("consumer_ctl:on_connect: connected")

    async def on_disconnect(self, websocket: WebSocket, close_code: int) -> None:
        await self.consumer.stop()
        # logger.info("counter: %d", self.counter)
        logger.info("consumer_ctl:on_disconnect: stopped")

    async def on_receive(self, websocket: WebSocket, data: typing.Any) -> None:
        logger.info(f"consumer_ctl:on_receive: data")
        await websocket.send_json({"Message": data})

    async def send_consumer_message(self, websocket: WebSocket, topicname: str) -> None:
        logger.info(f"consumer_ctl:send_consumer_message:")

        # async def consume(consumer, topicname):
        #     async for msg in consumer:
        #         return msg.value.decode()

        while True:

            # text / json
            # data = await consume(self.consumer, topicname)
            # # logger.info(f"consumer_ctl: data = {data}, {json.loads(data)}")
            # logger.info(f"consumer_ctl:send_consumer_message: data = {True}")
            # # TODO
            # # response = ConsumerResponse(topic=topicname, **json.loads(data))
            # # response = SpectrumDataResponse(topic=topicname, **json.loads(data))
            # # logger.info("response = %s", response)

            # # await websocket.send_text(f"{response.json()}")
            # # res = {'data': response.json()}
            # # logger.info("res = %s", res")
            # # await websocket.send_json(res)

            # await websocket.send_json(json.loads(data))

            try:
                async for msg in self.consumer:
                    logger.info(
                        f"consumer_ctl:send_consumer_message: topic = {msg.topic}, {msg.partition}, {msg.offset}, {msg.key}, {msg.timestamp}"
                    )
                    logger.info(
                        f"consumer_ctl:send_consumer_message: type = {type(msg.value)}, size = {sys.getsizeof(msg.value)}"
                    )
                    # logger.debug(f"consumer_ctl:send_consumer_message: value = {msg.value}")

                    if msg.topic == "topic1":
                        await websocket.send_json(json.loads(msg.value))
                    else:
                        await websocket.send_bytes(msg.value)

            finally:
                logger.info("consumer_ctl: connected")
                await self.consumer.stop()
