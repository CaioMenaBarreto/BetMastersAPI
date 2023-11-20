import { NewUser } from "@/protocols/participants-protocol";
import Joi, { ObjectSchema } from "joi";

export const newParticipantSchema: ObjectSchema<NewUser> = Joi.object({
    name: Joi.string().required(),
    balance: Joi.number().required(),
});
