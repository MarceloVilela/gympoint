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
4. Crie um banco de dados no `postgres` com o nome de `postgresgympoint`;
5. Renomeie o arquivo `.env.example` para `.env`;
6. Coloque as suas credenciais dentro do `.env`;
7. Rode `yarn sequelize db:migrate` para executar as migrations;
8. Rode `yarn dev` para iniciar o servidor.
