import { Bets } from "@/protocols/bet-protocol";
import { Game } from "@/protocols/game-protocol";
import { betRepository } from "@/repositories/bet-repository";
import { participantsRepository } from "@/repositories/participants-repository";

export async function verifyBet(bets: Bets, game: Game) {
    const houseEdge = 0.3;
    let sumBets = 0;
    let sumWinningBets = 0;
    
    for (let i = 0; i < bets.length; i++) {
        sumBets += bets[i].amountBet;
        if (bets[i].homeTeamScore === game.homeTeamScore && bets[i].awayTeamScore === game.awayTeamScore) {
            sumWinningBets += bets[i].amountBet;
        }
    }

    for (let i = 0; i < bets.length; i++) {
        if (bets[i].homeTeamScore === game.homeTeamScore && bets[i].awayTeamScore === game.awayTeamScore) {
            const value = (bets[i].amountBet / sumWinningBets) * (sumBets) * (1 - houseEdge);
            const participant = await participantsRepository.getParticipantById(bets[i].participantId);
            const newBalance = participant.balance + value;
            const won = {
                amountWon: value,
                status: "WON"
            }
            await betRepository.updateBetById(bets[i].id, won);
            await participantsRepository.updateParticipantBalance(bets[i].participantId, newBalance)
        } else {
            const lost = {
                amountWon: 0,
                status: "LOST"
            }
            await betRepository.updateBetById(bets[i].id, lost);
        }
    }
}