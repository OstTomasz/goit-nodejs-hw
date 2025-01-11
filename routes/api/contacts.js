import { Router } from "express";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../../models/contacts.js";

export const router = Router();

router.get("/", async (req, res, next) => {
  return res.json(listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});
