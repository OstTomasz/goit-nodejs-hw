import express from "express";
import logger from "morgan";
import cors from "cors";

import { router } from "./routes/api/contacts.js";

export const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
