import uvicorn
from fastapi import FastAPI
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.cors import CORSMiddleware
from loguru import logger

from server.core.settings import DEFAULT_ROUTE_STR
from server.api import router
from server.core.config import PROJECT_NAME, BROKER_INSTANCE, LOGGING_LEVEL


app = FastAPI(title=PROJECT_NAME, version="2")
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(CORSMiddleware, allow_origins=["*"])
app.include_router(router, prefix=DEFAULT_ROUTE_STR)

logger.info(f"PROJECT_NAME = {PROJECT_NAME}, BROKER_INSTANCE = {BROKER_INSTANCE}")


@app.on_event("startup")
async def on_app_start():
    """Anything that needs to be done while app starts"""
    pass


@app.on_event("shutdown")
async def on_app_shutdown():
    """Anything that needs to be done while app shutdown"""
    pass


@app.get("/ping")
def ping():
    return {"message": "running"}


if __name__ == "__main__":
    uvicorn.run(app, log_level="debug", reload=True)
