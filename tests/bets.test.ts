import httpStatus from "http-status";
import app from "@/app";
import supertest from "supertest";
import prisma from "@/database/database";
import { createGameInDB, finishGame, finishGameInDB } from "./factories/game-factory";
import { createBet, createBetInDB, createBetWithBiggerAmountBet, createBetWithNoAmountBet, createBetWithNoGame, createBetWithNoParticipant } from "./factories/bet-factory";
import { createParticipantInDB, createParticipantInDBWithLessBalance } from "./factories/participant-factory";

beforeAll(async () => {
    await prisma.bets.deleteMany();
    await prisma.games.deleteMany();
    await prisma.participants.deleteMany();
});
beforeEach(async () => {
    await prisma.bets.deleteMany();
    await prisma.games.deleteMany();
    await prisma.participants.deleteMany();
});

const server = supertest(app);

describe('Bet creation tests', () => {
    it('Should return status 404 if !participant', async () => {
        const game = await createGameInDB();
        const body = await createBetWithNoParticipant(game.id)
        const bet = await server.post(`/bets`).send(body)

        expect(bet.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('Should return status 404 if !game', async () => {
        const participant = await createParticipantInDB();
        const body = await createBetWithNoGame(participant.id)
        const bet = await server.post(`/bets`).send(body)

        expect(bet.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('Should return status 401 if the participant balance is less than the amountBet', async () => {
        const participant = await createParticipantInDBWithLessBalance();
        const game = await createGameInDB();
        const body = await createBetWithBiggerAmountBet(game.id, participant.id);
        const bet = await server.post(`/bets`).send(body);

        expect(bet.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('Should return status 401 if the amountBet is invalid', async () => {
        const participant = await createParticipantInDB();
        const game = await createGameInDB();
        const body = await createBetWithNoAmountBet(game.id, participant.id);
        const bet = await server.post(`/bets`).send(body);

        expect(bet.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('Should return status 401 if the game is ended', async () => {
        const participant = await createParticipantInDB();
        const game = await createGameInDB();
        const bodyFinish = await finishGame();
        const updateGame = await server.post(`/games/${game.id}/finish`).send(bodyFinish);
        const body = await createBet(game.id, participant.id);
        const bet = await server.post(`/bets`).send(body);

        expect(bet.status).toBe(httpStatus.UNAUTHORIZED);
    });
})