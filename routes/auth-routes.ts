import { Router } from "express";
import * as controllers from "../controllers";

let authRouter = Router();

authRouter.post("/register", controllers.postSignUp)

authRouter.post("/login", controllers.postLogIn)

export default authRouter;