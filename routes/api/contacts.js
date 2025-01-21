import { Router } from "express";

import * as ContactController from "../../models/contacts/controller.js";

export const contactsRouter = Router();

contactsRouter.get("/contacts", ContactController.getAll);

contactsRouter.get("/contacts/:contactId", ContactController.getById);

contactsRouter.post("/contacts", ContactController.createContact);

contactsRouter.delete("/contacts/:contactId", ContactController.deleteContact);

contactsRouter.put("/contacts/:contactId", ContactController.updateContactById);

contactsRouter.patch(
  "/contacts/:contactId/favorite",
  ContactController.updateStatus
);
