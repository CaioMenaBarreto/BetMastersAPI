import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ApplicationError, RequestError } from "@/protocols/errors-protocol";

export default function errorMiddleware(error: ApplicationError | RequestError, req: Request, res: Response, next: NextFunction) {

    if (error.name === "badRequestError") return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    if (error.name === "ValueInsufficient") return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === "BalanceInsufficient") return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === "GameNotExists") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "ParticipantNotExists") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "GameFinished") return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === "GameNotHaveBets") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "InvalidBet") return res.status(httpStatus.UNAUTHORIZED).send(error.message);

    console.log(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
}