from time import sleep
import asyncio
import sys

sys.path.append("../")

from models.protocol import Protocol
from models.message_topic import MessageTopic
from libs.producer import Producer
import libs.mock_payload_generator as mock_payload_generator


topic = f"{Protocol.PROTOBUF}_{MessageTopic.SPECTROGRAMS}"
producer = Producer()


async def main():
    print(f"Sending message to topic = {topic}")
    await producer.start()

    for num_spectrograms in range(10, 110, 10):
        for num_channels in range(500, 5000, 500):
            for itr in range(5):
                sleep(1)
                payload, _ = mock_payload_generator.spectrogram_protobus(
                    num_spectrograms, num_channels
                )
                print("send...")
                await producer.produce(payload, topic)

    await producer.stop()


if __name__ == "__main__":
    asyncio.run(main())
