import { betController } from "@/controllers/bet-controller";
import schemaValidation from "@/middlewares/schema-validation";
import { newBetSchema } from "@/schemas/bet-schema";
import { Router } from "express";

const betRouter = Router();

betRouter.post('/bets', schemaValidation(newBetSchema), betController.postBet);

export default betRouter;