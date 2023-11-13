import { Request, Response } from "express";
import { participantsService } from "@/services/participants-service";
import httpStatus from "http-status";

async function postParticipants(req: Request, res: Response){
    const { name, balance } = req.body;

    const newParticipant = await participantsService.postParticipants(name, balance);

    res.status(httpStatus.CREATED).send(newParticipant);
}

async function getParticipants(req: Request, res: Response){

    const participants = await participantsService.getParticipants();

    res.status(httpStatus.OK).send(participants);
}

export const participantsController ={
    postParticipants,
    getParticipants
}