from time import sleep
import asyncio

import sys

sys.path.append("../")

from models.protocol import Protocol
from models.message_topic import MessageTopic
from libs.producer import Producer
import libs.mock_payload_generator as mock_payload_generator

topic = f"{Protocol.PROTOBUF}_{MessageTopic.SPECTRUM}"
producer = Producer()


async def main():
    print(f"Sending message to topic = {topic}")
    await producer.start()

    for channel in range(500, 50000, 500):
        sleep(1)
        payload, _ = mock_payload_generator.spectrum_protobuf(channel)
        print("send...")
        await producer.produce(payload, topic)

    await producer.stop()


if __name__ == "__main__":
    asyncio.run(main())
