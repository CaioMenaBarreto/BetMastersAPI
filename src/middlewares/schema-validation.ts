import { badRequestError } from "@/errors/bad-request-error";
import { NextFunction, Request, Response } from "express";
badRequestError
function schemaValidation(schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            throw badRequestError(errors);
        }
        next();
    };
};

export default schemaValidation;