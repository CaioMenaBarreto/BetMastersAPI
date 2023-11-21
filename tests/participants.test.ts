import app from "@/app";
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from "@/database/database";
import { createWrongBalance, createParticipant, createFailParticipant } from "./factories/participant-factory";

const server = supertest(app);
beforeEach(async () => {
    await prisma.participants.deleteMany();
})

describe("Participant Creation Tests", () => {
    it("Should return status 401 on user creation with balance < $10", async () => {
        const body = await createWrongBalance();
        const result = await server.post('/participants').send(body);
        const status = result.status;

        expect(status).toEqual(401);
    });

    it("Should return status 422 when body is invalid", async () => {
        const body = await createFailParticipant();
        const result = await server.post('/participants').send(body);
        const status = result.status;

        expect(status).toEqual(422);
    })

    it("Should return status 422 when body is no given", async () => {
        const result = await server.post('/participants');
        const status = result.status;

        expect(status).toEqual(422);
    })

    it('Should return status 201 and correct response body when user is added', async () => {
        const body = await createParticipant();
        const response = await server.post('/participants').send(body);

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            name: body.name,
            balance: body.balance
        });
    });
});

describe('Get all partipants', () => {
    it('Should return all participants', async () => {
        const participant1 = await createParticipant();
        const participant2 = await createParticipant();

        await server.post('/participants').send(participant1);
        await server.post('/participants').send(participant2);

        const { status, body } = await server.get(`/participants`);
        expect(status).toBe(200);

        expect(body).toEqual([
            expect.objectContaining(participant1),
            expect.objectContaining(participant2),
        ]);
    });

    it('should return an empty array', async () => {
        const { status, body } = await server.get(`/participants`);
        expect(status).toBe(200);

        expect(body).toEqual({ message: "There are no participants" });
    })
});