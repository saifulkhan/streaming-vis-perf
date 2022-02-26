import requests
from random import randrange
from datetime import datetime
from time import sleep

# https://docs.confluent.io/platform/current/tutorials/examples/clients/docs/rest-proxy.html

while True:
    url = "http://localhost:8082/topics/jsontest"
    headers = {
        "Content-Type": "application/vnd.kafka.json.v2+json",
        "Accept": "application/vnd.kafka.v2+json",
    }
    data = '{"records":[{"key":"alice","value":{"count":0}},{"key":"alice","value":{"count":1}},{"key":"alice","value":{"count":2}}]}'

    print("Sending...")
    res = requests.post(url, headers=headers, data=data)
    print("Response = ", res)

    sleep(3)
