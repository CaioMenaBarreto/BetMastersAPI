import { NewGame } from "@/protocols/game-protocol";
import Joi, { ObjectSchema } from "joi";

export const finishGameSchema: ObjectSchema<NewGame> = Joi.object({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required(),
});