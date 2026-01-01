# Temel imaj olarak Slim sürüm (Hafif ve hızlı)
FROM python:3.13-slim-bookworm as base

# --- DEVELOPMENT AŞAMASI (Gerekirse) ---
FROM base as development
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
# libpq-dev EKLENDİ
RUN apt-get update && \
    apt-get install -y --no-install-recommends git gettext graphviz gcc g++ libpq-dev && \
    pip install --upgrade pip && \
    pip install -r requirements.txt && \
    apt-get purge -y --auto-remove git gcc g++

COPY . .

# --- PRODUCTION AŞAMASI (Railway'in kullandığı yer) ---
FROM base as production
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirements.txt /backend/requirements.txt
RUN pip3 install --upgrade pip

# KRİTİK DÜZELTME BURADA:
# 1. libpq-dev eklendi (Postgres için şart)
# 2. --no-cache-dir ile pip önbelleği temizlendi (Daha küçük imaj)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    gettext-base \
    graphviz \
    gcc \
    g++ \
    libpq-dev && \
    pip3 install --no-cache-dir -r requirements.txt && \
    # gcc ve g++ derleme için lazımdı, şimdi silebiliriz ama libpq-dev kalmalı
    apt-get purge -y --auto-remove git gcc g++ && \
    rm -rf /var/lib/apt/lists/* && \
    pip3 install --no-cache-dir gunicorn uvicorn gevent

COPY . .

# Gunicorn ile başlat
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]