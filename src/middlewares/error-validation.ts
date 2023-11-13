import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ApplicationError, RequestError } from "@/protocols/errors-protocol";

export default function errorMiddleware(error: ApplicationError | RequestError, req: Request, res: Response, next: NextFunction){

    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "notFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "Conflict") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "badRequestError") return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    if (error.name === "unauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error.message);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}