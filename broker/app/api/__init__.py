from fastapi import APIRouter

from app.api.consumer import consumer
from app.api.producer import producer


router = APIRouter()
router.include_router(consumer, prefix="/consumer")
router.include_router(producer, prefix="/producer")
