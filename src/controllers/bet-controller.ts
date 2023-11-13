import { betService } from "@/services/bet-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function postBet(req: Request, res: Response){
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body;

    const newBet = await betService.postBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);

    res.status(httpStatus.CREATED).send(newBet);
}

export const betController = {
    postBet
}