import { Router } from "express";
import { JWT } from "../../lib/jwt.js";

export const jwtsRouter = Router();

jwtsRouter.get("/", async (req, res) => {
  const token = await JWT.sign("Hello there");
  return res.json({ token });
});
