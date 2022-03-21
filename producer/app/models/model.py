from typing import Optional, List, Any
from pydantic import BaseModel, confloat, StrictStr, validator
from datetime import datetime


class ProducerMessage(BaseModel):
    topic: StrictStr = ""
    timestamp: StrictStr = ""
    body: Any

    @validator("timestamp", pre=True, always=True)
    def set_datetime_utcnow(cls, v):
        return str(datetime.utcnow())


class ProducerResponse(BaseModel):
    topic: StrictStr = ""
    timestamp: StrictStr = ""

    @validator("timestamp", pre=True, always=True)
    def set_datetime_utcnow(cls, v):
        return str(datetime.utcnow())


class ConsumerResponse(BaseModel):
    topic: StrictStr
    timestamp: str
    name: StrictStr
    message_id: StrictStr


class SpectrumDataResponse(BaseModel):
    topic: StrictStr
    timestamp: str
    data: List[Any]
