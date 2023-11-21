import prisma from "@/database/database";
import { faker } from "@faker-js/faker";

export async function createWrongBalance() {
    return {
        name: faker.internet.userName(),
        balance: faker.number.int({ max: 999 })
    }
}

export async function createFailParticipant() {
    return {
        name: faker.number.int({ max: 999 }),
        balance: faker.internet.userName()
    }
}

export async function createParticipant(){
    return {
        name: faker.internet.userName(),
        balance: faker.number.int({min: 1000, max: 10000000})
    }
}