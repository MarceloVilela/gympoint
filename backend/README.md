<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
App gerenciador de academia.
</h3>

<h4 align="center">Backend.</h4>

## Pré-requisitos

Para executar o projeto será necessário instalar as seguintes aplicações:

- Docker
- Node
- Yarn (Opcional)

##  Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd gympoint/backend`;
3. Rode `yarn` para instalar as dependências;
4. Execute os comandos docker
```
docker run --name postgresgympoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```
```
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
```
5. Crie um banco de dados no postgres com o nome de postgresgympoint;
6. Renomeie o arquivo `.env.example` para `.env`;
7. Coloque as suas credenciais dentro do `.env`;
8. Rode `yarn sequelize db:migrate` para executar as migrations;
9. Rode `yarn sequelize db:seed:all` para executar os seeds;
10. Rode `yarn dev` para iniciar o servidor.
11. Rode `yarn queue` para iniciar a fila de processamentos (emails de matrícula).
