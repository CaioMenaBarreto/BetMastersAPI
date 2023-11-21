import app from "@/app";
import supertest from 'supertest';
import prisma from "@/database/database";
import { createWrongBalance, createParticipant, createFailParticipant } from "./factories/participant-factory";
import httpStatus from "http-status";

const server = supertest(app);

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


describe("Participant creation tests", () => {
    it("Should return status 401 on user creation with balance < $10", async () => {
        const body = await createWrongBalance();
        const result = await server.post('/participants').send(body);
        const status = result.status;

        expect(status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("Should return status 422 when body is invalid", async () => {
        const body = await createFailParticipant();
        const result = await server.post('/participants').send(body);
        const status = result.status;

        expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    })

    it("Should return status 422 when body is no given", async () => {
        const result = await server.post('/participants');
        const status = result.status;

        expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    })

    it('Should return status 201 and correct response body when user is added', async () => {
        const body = await createParticipant();
        const response = await server.post('/participants').send(body);

        expect(response.status).toEqual(httpStatus.CREATED);
        expect(response.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            name: body.name,
            balance: body.balance
        });
    });
});

describe('Get all partipants tests', () => {
    it('should return an empty array', async () => {
        const { status, body } = await server.get(`/participants`);
        expect(status).toBe(httpStatus.OK);

        expect(body).toEqual({ message: "There are no participants" });
    })

    it('Should return all participants', async () => {
        const participant1 = await createParticipant();
        const participant2 = await createParticipant();

        await server.post('/participants').send(participant1);
        await server.post('/participants').send(participant2);

        const { status, body } = await server.get(`/participants`);
        expect(status).toBe(httpStatus.OK);
        expect(body).toBeInstanceOf(Array);
        expect(body).toEqual([
            {
                id: expect.any(Number),
                createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                name: participant1.name,
                balance: participant1.balance
            },
            {
                id: expect.any(Number),
                createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                name: participant2.name,
                balance: participant2.balance
            },
        ]);
    });
});