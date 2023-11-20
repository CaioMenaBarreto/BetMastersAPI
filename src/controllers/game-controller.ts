import { gameService } from "@/services/game-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function postGame(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body;

    const newGame = await gameService.postGame(homeTeamName, awayTeamName)

    res.status(httpStatus.OK).send(newGame);
}

async function getGames(req: Request, res: Response) {
    const games = await gameService.getGames();
    res.status(httpStatus.OK).send(games);
} 

async function finishGameById(req: Request, res: Response) {
    const { homeTeamScore, awayTeamScore } = req.body;
    const { id } = req.params;

    const finishGame = await gameService.finishGame(homeTeamScore, awayTeamScore, id);

    res.status(httpStatus.OK).send(finishGame);
} 

export const gameController = {
    postGame,
    getGames,
    finishGameById
}