import prisma from "@/database/database";
import { faker } from "@faker-js/faker";

export async function createBetInDB(participantId: number, gameId: number) {
    return await prisma.bets.create({
        data: {
            homeTeamScore: faker.number.int({ min: 1000, max: 100000 }),
            awayTeamScore: faker.number.int({ min: 1000, max: 100000 }),
            amountBet: faker.number.int({ min: 1000, max: 100000 }),
            gameId: gameId,
            participantId: participantId
        }
    })
};

export async function createBetWithNoParticipant(gameId: number) {
    const bet = {
        homeTeamScore: faker.number.int({ min: 1000, max: 100000 }),
        awayTeamScore: faker.number.int({ min: 1000, max: 100000 }),
        amountBet: faker.number.int({ min: 1000, max: 100000 }),
        gameId: gameId,
        participantId: 0
    }
    return bet;
};

export async function createBetWithNoGame(participantId: number) {
    const bet = {
        homeTeamScore: faker.number.int({ min: 1000, max: 100000 }),
        awayTeamScore: faker.number.int({ min: 1000, max: 100000 }),
        amountBet: faker.number.int({ min: 1000, max: 100000 }),
        gameId: 0,
        participantId: participantId
    }
    return bet;
};

export async function createBet(gameId: number, participantId: number) {
    const bet = {
        homeTeamScore: faker.number.int({ max: 999 }),
        awayTeamScore: faker.number.int({ max: 999 }),
        amountBet: faker.number.int({ min: 1000, max: 100000 }),
        gameId: gameId,
        participantId: participantId
    }
    return bet;
};

export async function createBetWithNoAmountBet(gameId: number, participantId: number) {
    const bet = {
        homeTeamScore: faker.number.int({ max: 999 }),
        awayTeamScore: faker.number.int({ max: 999 }),
        amountBet: 0,
        gameId: gameId,
        participantId: participantId
    }
    return bet;
};

export async function createBetWithBiggerAmountBet(gameId: number, participantId: number) {
    const bet = {
        homeTeamScore: faker.number.int({ max: 999 }),
        awayTeamScore: faker.number.int({ max: 999 }),
        amountBet: faker.number.int({ min: 1000, max: 100000 }),
        gameId: gameId,
        participantId: participantId
    }
    return bet;
};

export async function findBets(gameId: number) {
    return await prisma.bets.findMany({
        where: {
            gameId: gameId
        }
    })
};