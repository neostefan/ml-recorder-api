import { Router } from "express";

import * as controllers from "../controllers";

const appRouter = Router();

appRouter.get("/laugh", controllers.getSamples)

appRouter.post("/laugh", controllers.postSample)

export default appRouter;