import prisma from "@/database/database"
import { PostBet, UpdateBet } from "@/protocols/bet-protocol";

async function postBet(bet: PostBet) {
    const newBet = prisma.bets.create({
        data: {
            homeTeamScore: bet.homeTeamScore,
            awayTeamScore: bet.awayTeamScore,
            amountBet: bet.amountBet,
            gameId: bet.gameId,
            participantId: bet.participantId
        }
    });
    return newBet;
}

async function getBetsById(gameId: number) {
    const bets = await prisma.bets.findMany({
        where: {
            gameId: gameId
        }
    })
    return bets
}

async function updateBetById(betId: number, won: UpdateBet) {
    await prisma.bets.update({
        data: {
            status: won.status,
            amountWon: won.amountWon
        },
        where:{
            id: betId
        }
    })
}

export const betRepository = {
    postBet,
    getBetsById,
    updateBetById
}