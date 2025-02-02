import { Router } from "express";

import * as UsersController from "../../models/users/controller.js";

export const userRouter = Router();

userRouter.post("/signup", UsersController.createUser);
userRouter.post("/login", UsersController.login);
