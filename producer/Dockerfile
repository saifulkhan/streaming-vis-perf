FROM python:3.9-slim

# dont write pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# dont buffer to stdout/stderr
ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY . .

ARG BROKER_INSTANCE
ENV BROKER_INSTANCE=$BROKER_INSTANCE

# dependencies
RUN set -eux \
    && pip install --upgrade pip setuptools wheel \
    && pip install -r requirements.txt \
    && rm -rf /root/.cache/pip

CMD ["uvicorn", "server.main:app", "--reload", "--host", "0.0.0.0", "--port", "4000"]
