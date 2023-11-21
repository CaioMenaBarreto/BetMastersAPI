import app from "@/app";
import supertest from 'supertest';
import prisma from "@/database/database";
import { createFailGame, createGame, createGameInDB, finishGame, finishGameInDB } from "./factories/game-factory";
import httpStatus from "http-status";
import { createParticipantInDB } from "./factories/participant-factory";
import { createBetInDB, findBets } from "./factories/bet-factory";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
    await prisma.games.deleteMany();
})

const server = supertest(app);

describe("Game creation tests", () => {
    it("Should return status 422 when body is no given", async () => {
        const result = await server.post('/games');
        const status = result.status;

        expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("Should return status 422 when body is invalid", async () => {
        const body = await createFailGame();
        const result = await server.post('/games').send(body);
        const status = result.status;

        expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('Should return status 201 and correct response body when game is added', async () => {
        const body = await createGame();
        const result = await server.post('/games').send(body);

        expect(result.status).toEqual(httpStatus.CREATED);
        expect(result.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            homeTeamName: body.homeTeamName,
            awayTeamName: body.awayTeamName,
            homeTeamScore: 0,
            awayTeamScore: 0,
            isFinished: false
        });
    });
});

describe('Get all games tests', () => {
    it('should return an empty array', async () => {
        const { status, body } = await server.get(`/games`);
        expect(status).toBe(200);
        expect(body).toEqual({ message: "No have games yet!" });
    });

    it('Should return all games', async () => {
        const game1 = await createGameInDB();
        const game2 = await createGameInDB();
        const { status, body } = await server.get(`/games`);

        expect(status).toBe(200);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: game1.id,
                    createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                    updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                    homeTeamName: game1.homeTeamName,
                    awayTeamName: game1.awayTeamName,
                    homeTeamScore: game1.homeTeamScore,
                    awayTeamScore: game1.awayTeamScore,
                    isFinished: game1.isFinished
                }),
                expect.objectContaining({
                    id: game2.id,
                    createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                    updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                    homeTeamName: game2.homeTeamName,
                    awayTeamName: game2.awayTeamName,
                    homeTeamScore: game2.homeTeamScore,
                    awayTeamScore: game2.awayTeamScore,
                    isFinished: game2.isFinished
                }),
            ])
        );
    });
});

describe('Get game by id tests', () => {
    it('Should return the game with the bets placed on it', async () => {
        const participant = await createParticipantInDB();
        const game = await createGameInDB();
        const bet1 = await createBetInDB(participant.id, game.id);
        const bet2 = await createBetInDB(participant.id, game.id);
        const getGame = await server.get(`/games/${game.id}`);

        expect(getGame.status).toEqual(httpStatus.OK);
        expect(getGame.body).toEqual({
            id: game.id,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            homeTeamName: game.homeTeamName,
            awayTeamName: game.awayTeamName,
            homeTeamScore: game.homeTeamScore,
            awayTeamScore: game.awayTeamScore,
            isFinished: game.isFinished,
            bets: [{
                id: bet1.id,
                createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                homeTeamScore: bet1.homeTeamScore,
                awayTeamScore: bet1.awayTeamScore,
                amountBet: bet1.amountBet,
                gameId: game.id,
                participantId: participant.id,
                status: bet1.status,
                amountWon: bet1.amountWon
            },
            {
                id: bet2.id,
                createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                homeTeamScore: bet2.homeTeamScore,
                awayTeamScore: bet2.awayTeamScore,
                amountBet: bet2.amountBet,
                gameId: game.id,
                participantId: participant.id,
                status: bet2.status,
                amountWon: bet2.amountWon
            }]
        });
    });

    it('Should return the game with no bets', async () => {
        const game = await createGameInDB();
        const getGame = await server.get(`/games/${game.id}`);

        expect(getGame.status).toEqual(httpStatus.OK);
        expect(getGame.body).toEqual({
            id: game.id,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            homeTeamName: game.homeTeamName,
            awayTeamName: game.awayTeamName,
            homeTeamScore: game.homeTeamScore,
            awayTeamScore: game.awayTeamScore,
            isFinished: game.isFinished,
            bets: "This game has no bets"
        })
    });

    it('Should return status 404 if !game', async () => {
        const getGame = await server.get(`/games/${0}`);
        expect(getGame.status).toEqual(httpStatus.NOT_FOUND);
    })
});

describe('Finish game by id tests', () => {
    it('Should return status 404 if !game', async () => {
        const body = await finishGame();
        const postGame = await server.post(`/games/${0}/finish`).send(body);
        expect(postGame.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('Should return status 401 if the game has already finished', async () => {
        const game = await createGameInDB();
        await finishGameInDB(game.id);
        const body = await finishGame();
        const postFinishGame = await server.post(`/games/${game.id}/finish`).send(body);

        expect(postFinishGame.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    
    it('Should return status 200 if game has no bets and can be ended', async () => {
        const game = await createGameInDB();
        const body = await finishGame();
        const postFinishGame = await server.post(`/games/${game.id}/finish`).send(body);
        const bets = await findBets(game.id);

        expect(postFinishGame.status).toEqual(httpStatus.OK);
        expect(bets.length).toEqual(0);
    });

    it('Should return status 200 if game can be ended', async () => {
        const participant = await createParticipantInDB();
        const game = await createGameInDB();
        const bet = await createBetInDB(participant.id, game.id);
        const body = await finishGame();
        const postFinishGame = await server.post(`/games/${game.id}/finish`).send(body);

        expect(postFinishGame.status).toEqual(httpStatus.OK);
        expect(postFinishGame.body).toEqual({
            id: game.id,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            homeTeamName: game.homeTeamName,
            awayTeamName: game.awayTeamName,
            homeTeamScore: body.homeTeamScore,
            awayTeamScore: body.awayTeamScore,
            isFinished: true,
        });
    });
})