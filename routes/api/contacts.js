import { Router } from "express";

import * as ContactController from "../../models/contacts/controller.js";

export const contactRouter = Router();

contactRouter.get("/contacts", ContactController.getAll);

contactRouter.get("/contacts/:contactId", ContactController.getById);

contactRouter.post("/contacts", ContactController.createContact);

contactRouter.delete("/contacts/:contactId", ContactController.deleteContact);

contactRouter.put("/contacts/:contactId", ContactController.updateContactById);

contactRouter.patch(
  "/contacts/:contactId/favorite",
  ContactController.updateStatus
);
