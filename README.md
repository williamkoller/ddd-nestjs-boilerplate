# DDD Nestjs Boilerplate

[Arquitetura](./architecture.md)

[Estrutura do projeto](./structure.md)

[Endpoints/Rotas](./endpoints.md)

## Tecnologias usadas

- Node.js
- Typescript
- Nestjs
- Sequelize
- Postgres
- Docker
- Docker Compose
- Github Actions
- Railway
- Jest
- Swagger

## Como rodar o projeto?!

### Requisitos

- Docker
- Docker Compose
- Nvm (Node Version Manager)
- Node.js (v22.12.0)

### Passos

1. Clone the repository

```bash
git clone git@github.com:williamkoller/ddd-nestjs-boilerplategit
```

2. Access the project folder

```bash

cd git@github.com:williamkoller/ddd-nestjs-boilerplategit
```

3. Install the dependencies

```bash
nvm use
npm install
```

4. Run the project

```bash
docker-compose down && docker-compose up --build
```

5. Access the project in the browser

```bash
http://localhost:3003/api/swagger
```

6. Rodar os testes

```bash
npm run test
```

7. Se quiser entrar no container `ddd-api`

```bash
docker exec -it ddd-api sh
```

8. Se quiser entrar no container `ddd-db`

```bash
docker exec -it ddd-db sh
```

## Obs

- A migration roda sozinha quando starta o container da `ddd-api`

## Acesse o container `ddd-api` e rode os comandos abaixo

```bash
docker exec -it ddd-api sh
```

### Para criar uma migation

```bash
npm run migration:create <nome-da-tabela>
```

### Para rodar as migrations

```bash
npm run migration:up
```

### Para reverter as migrations

```bash
npm run migration:down
```

#### Esse projeto foi feito com ❤️ por William Koller
