## Descrição

API para publicar registros na plataforma de mensageria Kafka e em seguida gravar no banco de dados NoSQL MongoDB

## Pré-Requisitos

Node.JS
Yarn
Nest.JS
Docker

## Instalação

```bash
$ yarn
$ yarn build
```

## Rodando a aplicação (Docker necessário)

```bash
# desenvolvimento
$ docker-compose -- Subir o Zookeper, Kafka e MongoDB
$ docker-build -- Buildar a API
$ docker-run -- Rodar a API
```

## ENV

```bash
# criar um arquivo .env e informar as seguintes variáveis
PORT=3000
KAFKABROKER=host.docker.internal:29092
MONGODBCONNECT=mongodb://host.docker.internal:27017
```

## Endpoints

Esta API tem 3 endpoints

* GET - http://localhost:3000/publish <- Lista registros gravados no MongoDB.
* POST - http://localhost:3000/publish <- Publica um registro no tópico do Kafka, recebe dados através do parâmetro objectJSON no body.
* GET - http://localhost:3000/consume <- Lista a quantidade de registros em um tópico.
* DELETE - http://localhost:3000/consume <- Deleta os registros do tópico do Kafka.
