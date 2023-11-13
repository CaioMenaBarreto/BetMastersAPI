import { Router } from "express";
import { participantsController } from "@/controllers/participants-controller";
import schemaValidation from "@/middlewares/schema-validation";
import { newParticipantSchema } from "@/schemas/participants-schema";

const participantsRouter = Router();

participantsRouter.post('/participants', schemaValidation(newParticipantSchema), participantsController.postParticipants);
participantsRouter.get('/participants', participantsController.getParticipants);

export default participantsRouter;