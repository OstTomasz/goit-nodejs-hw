import { Router } from "express";

import * as ContactController from "../../models/contacts/controller.js";

export const contactRouter = Router();

contactRouter.get("/", ContactController.getAll);

contactRouter.get("/:contactId", ContactController.getById);

contactRouter.post("/", ContactController.createContact);

contactRouter.delete("/:contactId", ContactController.deleteContact);

contactRouter.put("/:contactId", ContactController.updateContactById);

contactRouter.patch("/:contactId/favorite", ContactController.updateStatus);
