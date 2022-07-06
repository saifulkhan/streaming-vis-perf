from aiokafka import AIOKafkaProducer
import config

MAX_REQ_SIZE = 50 * 1024 * 1024  # 30 MB


class Producer:
    def __init__(self):
        self.aioproducer = None
        print(f"Producer:start: BROKER_INSTANCE = {config.BROKER_INSTANCE}")

    async def start(self):
        print(f"Producer:start: BROKER_INSTANCE = {config.BROKER_INSTANCE}")
        self.aioproducer = AIOKafkaProducer(
            bootstrap_servers=config.BROKER_INSTANCE,
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
        return res

    async def stop(self):
        await self.aioproducer.stop()
        print(f"Producer:stop: BROKER_INSTANCE = {config.BROKER_INSTANCE}")
