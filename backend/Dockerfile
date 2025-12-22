FROM python:3.14.0-slim-trixie as base
FROM base as development
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN apt-get update && \
    apt-get install -y --no-install-recommends git gettext graphviz gcc g++ && \
    pip install --upgrade pip && \
    pip install  -r requirements.txt && \
    apt-get purge -y --auto-remove git gcc g++

COPY . .


FROM base as production
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend



COPY requirements.txt /backend/requirements.txt
RUN pip3 install --upgrade pip

RUN apt-get update && \
apt-get install -y --no-install-recommends git gettext-base graphviz gcc g++ && \
pip3 install --no-cache-dir -r requirements.txt && \
apt-get purge -y --auto-remove git gcc g++ && \
rm -rf /var/lib/apt/lists/* && \
pip3 install --no-cache-dir gunicorn uvicorn gevent



COPY . .