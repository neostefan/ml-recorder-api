import { Router } from "express";
import { passportInstance } from "../util"
import * as controllers from "../controllers";

const appRouter = Router();

//get laughter samples
appRouter.get("/laugh", controllers.getSamples)

//post laughter samples
appRouter.post("/laugh", passportInstance.authenticate('jwt', {session: false}), controllers.postSample)

export default appRouter;