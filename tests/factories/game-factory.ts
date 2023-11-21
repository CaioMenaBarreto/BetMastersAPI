import prisma from "@/database/database";
import { faker } from "@faker-js/faker";

export async function createFailGame() {
    return {
        homeTeamName: faker.number.int({ max: 999 }),
        awayTeamName: faker.number.int({ max: 999 })
    }
}

export async function createGame() {
    return {
        homeTeamName: faker.lorem.word(),
        awayTeamName: faker.lorem.word()
    }
}

export async function finishGame() {
    return {
        homeTeamScore: faker.number.int({ max: 999 }),
        awayTeamScore: faker.number.int({ max: 999 })
    }
}

export async function finishGameInDB(gameId: number) {
    const game = prisma.games.update({
        data: {
            homeTeamScore: faker.number.int({ max: 999 }),
            awayTeamScore: faker.number.int({ max: 999 }),
            isFinished: true,
        },
        where: {
            id: gameId
        }
    })
    return game;
}
export async function createGameInDB() {
    return await prisma.games.create({
        data: {
            homeTeamName: faker.lorem.word(),
            awayTeamName: faker.lorem.word()
        }
    })
}