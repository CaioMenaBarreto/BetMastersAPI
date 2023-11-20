import { gameFinished } from "@/errors/game-finished";
import { gameNotExists } from "@/errors/game-not-exists";
import { balanceInsufficientError } from "@/errors/insufficient-balance";
import { invalidBet } from "@/errors/invalid-bet";
import { participantNotExists } from "@/errors/participant-not-exists";
import { PostBet } from "@/protocols/bet-protocol";
import { betRepository } from "@/repositories/bet-repository";
import { gameRepository } from "@/repositories/game-repository";
import { participantsRepository } from "@/repositories/participants-repository";

async function postBet(bet: PostBet) {
    const participant = await participantsRepository.getParticipantById(bet.participantId);
    const game = await gameRepository.getGameById(bet.gameId);

    if (!participant) throw participantNotExists();

    if (!game) throw gameNotExists();

    if(game.isFinished) throw gameFinished();

    if (participant.balance < bet.amountBet) throw balanceInsufficientError()

    if(bet.amountBet <= 0) throw invalidBet();

    const newParticipantBalance = participant.balance - bet.amountBet;

    await participantsRepository.updateParticipantBalance(participant.id, newParticipantBalance);
    const newBet = await betRepository.postBet(bet);

    return newBet;
} 

export const betService = {
    postBet
}