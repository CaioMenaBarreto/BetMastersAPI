import { gameRepository } from "@/repositories/game-repository"

async function postGame(homeTeamName: string, awayTeamName: string){
    const newGame = await gameRepository.postGame(homeTeamName, awayTeamName);
    return newGame;
}

async function getGames(){
    const games = await gameRepository.getGames();
    return games;
}

export const gameService = {
    postGame,
    getGames
}