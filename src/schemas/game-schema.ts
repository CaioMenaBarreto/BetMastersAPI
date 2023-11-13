import { NewGame } from "@/protocols/game-protocol";
import Joi, { ObjectSchema } from "joi";

export const newGameSchema: ObjectSchema<NewGame> = Joi.object({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required(),
});