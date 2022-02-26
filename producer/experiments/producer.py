from aiokafka import AIOKafkaProducer

# TODO read from env BROKER_INSTANCE
# BROKER_INSTANCE = "localhost:9092" # if running in host
BROKER_INSTANCE = "broker:29092" # if running inside container   

MAX_REQ_SIZE = 35 * 1024 * 1024  # 30 MB


async def produce(payload, topic):
    """
    input: serialized payload
    """
    aioproducer = AIOKafkaProducer(
        bootstrap_servers=BROKER_INSTANCE,
        compression_type="gzip",
        max_request_size=MAX_REQ_SIZE,
    )

    await aioproducer.start()
    res = await aioproducer.send_and_wait(topic, payload)
    # print(f"produce: sent, response = {res}")

    return
