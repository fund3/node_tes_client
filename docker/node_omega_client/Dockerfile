FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install nodejs npm nodejs-dev libcapnp-dev g++ -y

COPY . /app
WORKDIR /app
RUN npm install -y
RUN npm run build
