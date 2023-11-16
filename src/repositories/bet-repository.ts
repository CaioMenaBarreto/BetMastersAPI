import prisma from "@/database/database"

async function postBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    const newBet = prisma.bets.create({
        data: {
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,
            amountBet: amountBet,
            gameId: gameId,
            participantId: participantId
        }
    });
    return newBet;
}

export const betRepository = {
    postBet
}