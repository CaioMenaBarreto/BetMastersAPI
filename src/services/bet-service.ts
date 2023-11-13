import { betRepository } from "@/repositories/bet-repository";

async function postBet(homeTeamScore: number, awayTeamScore: number, amountBet: string, gameId: number, participantId: number){
    const newStringAmountBet = amountBet.replace(",", "");
    const newAmountBet = Number(newStringAmountBet);
    const newBet = await betRepository.postBet(homeTeamScore, awayTeamScore, newAmountBet, gameId, participantId);

    return newBet;
}

export const betService = {
    postBet
}