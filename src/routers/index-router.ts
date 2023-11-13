import { Router } from "express";
import participantsRouter from "./participants-routes";
import gameRouter from "./game-router";
import betRouter from "./bet-router";

const router = Router();

router.use(participantsRouter);
router.use(gameRouter);
router.use(betRouter);

export default router