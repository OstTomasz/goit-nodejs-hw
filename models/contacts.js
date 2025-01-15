import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const contactsPath = path.join(".", "models", "contacts.json");

export const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export function listContacts() {
  return JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf-8" }));
}

export function getContactById(contactId) {
  const contacts = listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

export function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  contacts.splice(index, 1);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

export function addContact(name, email, phone, favorite = false) {
  const contacts = listContacts();

  const newContact = { id: randomUUID(), name, email, phone, favorite };
  contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return {
    id: newContact.id,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
    favorite: newContact.favorite,
  };
}
export function updateContact(id, { name, email, phone, favorite }) {
  const contacts = listContacts();
  const updatedContacts = contacts.map((contact) =>
    contact.id === id
      ? {
          ...contact,
          name: name ?? contact.name,
          email: email ?? contact.email,
          phone: phone ?? contact.phone,
          favorite: favorite ?? contact.favorite,
        }
      : contact
  );

  fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

export function updateStatusContact(id, favorite) {
  const contacts = listContacts();
  const updatedContacts = contacts.map((contact) =>
    contact.id === id
      ? {
          ...contact,
          favorite: !favorite,
        }
      : contact
  );

  fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2));
}
