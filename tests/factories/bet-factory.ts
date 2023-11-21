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

export async function findBets(gameId: number){
    return await prisma.bets.findMany({
        where: {
            gameId: gameId
        }
    })
}