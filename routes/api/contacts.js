import { Router } from "express";

import * as ContactController from "../../models/controller.js";

export const router = Router();

router.get("/contacts", ContactController.getAll);

router.get("/contacts/:contactId", ContactController.getById);

router.post("/contacts", ContactController.createContact);

router.delete("/contacts/:contactId", ContactController.deleteContact);

router.put("/contacts/:contactId", ContactController.updateContactById);

router.patch("/contacts/:contactId/favorite", ContactController.updateStatus);
