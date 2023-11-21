import { betService } from "@/services/bet-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function postBet(req: Request, res: Response){
    const bet = req.body;

    const newBet = await betService.postBet(bet);

    res.status(httpStatus.CREATED).send(newBet);
} 

export const betController = {
    postBet
} 