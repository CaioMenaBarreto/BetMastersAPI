import { gameController } from "@/controllers/game-controller";
import schemaValidation from "@/middlewares/schema-validation";
import { finishGameSchema } from "@/schemas/finish-game-schema";
import { newGameSchema } from "@/schemas/game-schema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post('/games',schemaValidation(newGameSchema), gameController.postGame);
gameRouter.post('/games/:id/finish', schemaValidation(finishGameSchema), gameController.finishGameById)
gameRouter.get('/games', gameController.getGames);
gameRouter.get('/games/:id', gameController.getGameById);

export default gameRouter; 