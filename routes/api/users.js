import { Router } from "express";

import * as UsersController from "../../models/users/controller.js";

export const userRouter = Router();

userRouter.post("/users/signup", UsersController.createUser);
userRouter.post("/users/login", UsersController.login);
