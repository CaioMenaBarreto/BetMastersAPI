import prisma from "@/database/database"

async function postBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    const newBet = prisma.bet.create({
        data: {
            hometeamscore: homeTeamScore,
            awayteamscore: awayTeamScore,
            amountbet: amountBet,
            gameid: gameId,
            participantid: participantId,
            status: "PENDING",
            amountwon: null
        }
    });
    return newBet;
}

export const betRepository = {
    postBet
}