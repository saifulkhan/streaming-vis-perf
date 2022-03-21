from aiokafka import AIOKafkaProducer
from core.config import BROKER_INSTANCE

MAX_REQ_SIZE = 50 * 1024 * 1024  # 30 MB


class Producer:
    def __init__(self):
        self.aioproducer = None

    async def start(self):
        print(f"Producer:start: BROKER_INSTANCE = {BROKER_INSTANCE}")
        self.aioproducer = AIOKafkaProducer(
            bootstrap_servers=BROKER_INSTANCE,
            compression_type="gzip",
            max_request_size=MAX_REQ_SIZE,
        )
        await self.aioproducer.start()

    async def produce(self, payload, topic):
        """
        payload: serialized payload
        topic: topic of the message broker
        """
        res = await self.aioproducer.send_and_wait(topic, payload)
        # print(f"produce: sent, response = {res}")
        return

    async def stop(self):
        await self.aioproducer.stop()
