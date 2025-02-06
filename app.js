import express from "express";
import logger from "morgan";
import cors from "cors";

import { userRouter } from "./routes/api/users.js";
import { jwtsRouter } from "./routes/api/jwts.js";
import { contactRouter } from "./routes/api/contacts.js";
import { auth } from "./middlewares/auth.js";

export const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/jwts", auth, jwtsRouter);
app.use("/api/contacts", auth, contactRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
