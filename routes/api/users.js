import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import * as UsersController from "../../models/users/controller.js";

export const userRouter = Router();

userRouter.post("/signup", UsersController.createUser);
userRouter.post("/login", UsersController.login);
userRouter.delete("/logout", auth, UsersController.logout);
userRouter.get("/current", auth, UsersController.getCurrent);
