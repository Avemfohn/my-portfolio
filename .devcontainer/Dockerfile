# Temel imaj olarak Backend sürümünü (Python 3.13) kullanıyoruz
FROM python:3.13-bookworm

# Etkileşimsiz mod (Hata önleyici)
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1


# 1. TEMEL SİSTEM VE PYTHON GEREKSİNİMLERİ
# libpq-dev: Postgres için, git/curl: genel araçlar
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    gnupg \
    procps \
    lsb-release \
    build-essential \
    libpq-dev \
    sudo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. NODE.JS 20 KURULUMU (Frontend için)
# Python imajının içine Node.js ekliyoruz
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. KULLANICI AYARLARI (VS Code için Kritik)
# UID 1000 olan 'vscode' kullanıcısını oluşturuyoruz.
# Bu sayede dosya izin hataları (Permission Denied) yaşamazsın.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/bash \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Pip güncellemesi
RUN pip install --upgrade pip

# Backend gereksinimlerini kur
COPY backend/requirements.txt /tmp/pip-tmp/
RUN pip install --no-cache-dir -r /tmp/pip-tmp/requirements.txt \
    && rm -rf /tmp/pip-tmp

# Varsayılan kullanıcıyı ayarla
USER $USERNAME