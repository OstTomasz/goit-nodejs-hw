import { Router } from "express";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../../models/contacts.js";

export const router = Router();

const idsList = () => listContacts().map((contact) => contact.id);

router.get("/contacts", (req, res, next) => {
  return res.status(200).json(listContacts());
});

router.get("/contacts/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const existingIds = idsList();
  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  return res.status(200).json(getContactById(id));
});

router.post("/contacts", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const contact = addContact(body.name, body.email, body.phone, body.favorite);
  return res.status(201).json(contact);
});

router.delete("/contacts/:contactId", (req, res, next) => {
  const id = req.params.contactId;
  const existingIds = idsList();
  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  removeContact(id);
  return res.status(200).json({ message: `Contact with id ${id} deleted!` });
});

router.put("/contacts/:contactId", async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const existingIds = idsList();
  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  updateContact(id, body);
  return res.status(200).json({ message: `updated contact with id ${id}` });
});

router.patch("/contacts/:contactId/favorite", async (req, res, next) => {
  const { favorite } = req.body;
  const id = req.params.contactId;
  const existingIds = idsList();
  if (!favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  updateStatusContact(id, favorite);
  return res.status(200).json({ message: `updated contact with id ${id}` });
});
