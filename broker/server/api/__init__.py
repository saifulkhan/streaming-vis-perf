from fastapi import APIRouter

from server.api.consumer_ctl import consumer_ctl
from server.api.producer_ctl import producer_ctl


router = APIRouter()
router.include_router(consumer_ctl, prefix="/consumer")
router.include_router(producer_ctl, prefix="/producer")
