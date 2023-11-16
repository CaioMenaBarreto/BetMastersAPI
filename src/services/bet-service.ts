import { gameFinished } from "@/errors/game-finished";
import { gameNotExists } from "@/errors/game-not-exists";
import { balanceInsufficientError } from "@/errors/insufficient-balance";
import { participantNotExists } from "@/errors/participant-not-exists";
import { betRepository } from "@/repositories/bet-repository";
import { gameRepository } from "@/repositories/game-repository";
import { participantsRepository } from "@/repositories/participants-repository";

async function postBet(homeTeamScore: number, awayTeamScore: number, amountBet: string, gameId: number, participantId: number) {
    const participant = await participantsRepository.getParticipantById(participantId);
    const newStringAmountBet = amountBet.replace(",", "");
    const newAmountBet = Number(newStringAmountBet);
    const game = await gameRepository.getGameById(gameId);

    if (!participant) {
        throw participantNotExists();
    }

    if (!game) {
        throw gameNotExists();
    }

    if(game.isFinished){
        throw gameFinished();
    }
    console.log(participant.balance);
    console.log(newAmountBet);
    if (participant.balance < newAmountBet) {
        throw balanceInsufficientError()
    }

    const newParticipantBalance = participant.balance - newAmountBet;

    await participantsRepository.updateParticipantBalance(participant.id, newParticipantBalance);
    const newBet = await betRepository.postBet(homeTeamScore, awayTeamScore, newAmountBet, gameId, participantId);

    return newBet;
}

export const betService = {
    postBet
}