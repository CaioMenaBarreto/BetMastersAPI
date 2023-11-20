import { gameFinished } from "@/errors/game-finished";
import { gameNotExists } from "@/errors/game-not-exists";
import { gameNotHaveBets } from "@/errors/game-not-have-bets";
import { betRepository } from "@/repositories/bet-repository";
import { gameRepository } from "@/repositories/game-repository"
import { verifyBet } from "@/utils/verify-bet";

async function postGame(homeTeamName: string, awayTeamName: string) {
    const newGame = await gameRepository.postGame(homeTeamName, awayTeamName);
    return newGame;
}

async function getGames() {
    const games = await gameRepository.getGames();
    if (games.length === 0) {
        return { message: "No have games yet!" };
    }
    return games;
}

async function finishGame(homeTeamScore: number, awayTeamScore: number, gameId: string) {
    const newGameId = Number(gameId);

    const game = await gameRepository.getGameById(newGameId);
    if(!game) throw gameNotExists();

    const bets = await betRepository.getBetsById(newGameId);
    if (bets.length === 0) throw gameNotHaveBets();

    if(game.isFinished === true) throw gameFinished();

    const updateGame = await gameRepository.updateGameById(newGameId, homeTeamScore, awayTeamScore);

    verifyBet(bets, updateGame);

    return updateGame;
}

export const gameService = {
    postGame,
    getGames,
    finishGame
}