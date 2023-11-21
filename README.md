# BetMastersAPI - API REST para Gerenciamento de Apostas
Aplicação de back-end para o desafio técnico de back-end node júnior proposto pela Driven Education. Nesta aplicação, é possível gerenciar o back-end de um site de apostas através de requisições HTTP(s) seguindo a convenção REST.

# Demo
[Link do projeto](https://betmastersapi.onrender.com)

# Como funciona?

Este projeto é uma API REST para atender a criação de participantes, jogos e apostas. Ele possui 3 entidades: `participants`, `games` e `bets`. As características destas entidades estão no arquivo `schema.prisma`.

## Entidade Participants

### Rota POST `/participants`

 - Cria um novo participante. Os participantes não podem ter o `balance` menor que R$10,00, se esse for o caso um erro com o status 401 será retornado. A estrutura esperada para um participante é:
```
{
	name: string;
	balance: number; 
    (representado em centavos, ou seja, R$ 10,00 -> 1000)
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

### Rota GET `/participants`

- Retorna todos os participantes cadastrados.

## Entidade Games

### Rota POST `/games`

- Cria um novo jogo. Os jogos quando são criados tem por default um valor de 0x0 na pontuação dos times e a coluna isFinished será false. A estrutura esperada para um jogo é:
```
{
	homeTeamName: string;
	awayTeamName: string;
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

### Rota POST `/games/:id/finish`

- Atualiza os dados de um jogo dado o seu id e os campos enviados. Se o id não corresponder a nenhum jogo, o erro 404 é retornado. A estrutura esperada para finalizar um jogo é:
```
{
	homeTeamScore: number;
	awayTeamScore: number;
}
```

Se a estrutura não for respeitada, um erro 422 é retornado.

### Rota GET `/games`

- Retorna todos os jogos cadastrados.


### Rota GET `/games/:id`

- Busca um jogo específico dado um id. Se não for encontrado, retorna um erro 404. Se não houver nenhum erro, o jogo será retornado com todas as informações  atualizadas e as apostas realizadas nele.

## Entidade Bets

### Rota POST `/bets`

- Cria uma nova aposta. Ao pesquisar com o gameId e o participantId se nenhuma correspondência for encontrada um erro de 404 será retornado. A estrutura esperada para uma aposta é:
```
{ 
	homeTeamScore: number;
	awayTeamScore: number; 
	amountBet: number; (representado em centavos, ou seja, R$ 10,00 -> 1000)
	gameId: number; 
	participantId: number;
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

# Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node (versão 18.17.1);
- Express;
- Express-async-errors;
- Cors;
- TypeScript;
- Prisma;
- Postgres;
- Jest e Supertest;
- Joi;
- Dotenv;
- Ts-jest;
- Ts-node;
- Tsc-alias;
- Tsconfig-paths;
- Faker;
- HTTP-STATUS;
- Nodemon. 

# Como rodar em desenvolvimento
Para executar este projeto em desenvolvimento, é necessário seguir os passos abaixo:

- Clonar o repositório;
- Baixar as dependências necessárias com o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Para poder executar os testes, será necessário criar um outro arquivo `.env.test` com base no `.env.example`;
- Este arquivo `.env` é composto pelas seguintes propriedades:
```
  DATABASE_URL="postgres://<user>:<password>@localhost:5432/<dbName>"
```
- A propriedade `DATABASE_URL` é usada para fazer a conexão com o banco de dados.

- Será necessário executar o Prisma para criar o banco de dados e as tabelas necessárias. Para isso, execute o comando: `npx prisma migrate dev`;
- Para rodar o projeto em desenvolvimento, execute o comando `npm run dev`;

# Como rodar em produção
- Buildar o projeto com npm run build;
- Subir na plataforma de sua preferência (Ex: Render).