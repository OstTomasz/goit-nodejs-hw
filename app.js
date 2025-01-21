import express from "express";
import logger from "morgan";
import cors from "cors";

import { contactsRouter } from "./routes/api/contacts.js";
import { jwtsRouter } from "./routes/api/jwts.js";
import { usersRouter } from "./routes/api/users.js";

export const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", contactsRouter);
app.use("/api", auth(), jwtsRouter);
app.use("/api", usersRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
