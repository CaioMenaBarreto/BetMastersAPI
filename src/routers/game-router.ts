import { gameController } from "@/controllers/game-controller";
import schemaValidation from "@/middlewares/schema-validation";
import { newGameSchema } from "@/schemas/game-schema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post('/games',schemaValidation(newGameSchema), gameController.postGame);
gameRouter.get('/games', gameController.getGames);

export default gameRouter;