import Joi, { ObjectSchema } from "joi";
import { NewBet } from "@/protocols/bet-protocol";

export const newBetSchema: ObjectSchema<NewBet> = Joi.object({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required(),
    amountBet: Joi.string().required(),
    gameId: Joi.number().required(),
    participantId: Joi.number().required()
});