## Descrição

API para publicar registros na plataforma de mensageria Kafka e em seguida gravar no banco de dados NoSQL MongoDB

## Instalação

```bash
$ yarn
$ yarn build
```

## Rodando a aplicação (Docker necessário)

```bash
# desenvolvimento
$ docker-compose -- Subir o Kafka
$ docker-mongodb -- Infelizmente não consegui ajustar para que a API no container comunique com o container do MongoDB
$ docker-build -- Buildar a API
$ docker-run - Rodar a API
```

## ENV

```bash
# criar um arquivo .env e informar as seguintes variáveis
PORT=3000
KAFKABROKER=host.docker.internal:29092
MONGODBCONNECT=mongodb://mongodb:27017
```

## Suporte

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Licença

Nest is [MIT licensed](LICENSE).
