import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const contactsPath = path.join(".", "models", "contacts.json");

console.log(contactsPath);

export function listContacts() {
  return JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf-8" }));
}

export function getContactById(contactId) {
  const contacts = listContacts();
  if (!contacts.some((contact) => contact.id === contactId)) {
    throw new Error(`Contact with id "${contactId}" not found`);
  }
  return contacts.find((contact) => contact.id === contactId);
}

export function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error(`Contact with id "${contactId}" not found`);
  }
  contacts.splice(index, 1);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

export function addContact(name, email, phone) {
  const contacts = listContacts();

  if (!name || !email || !phone) {
    throw new Error("Name, email, and phone are required fields");
  }
  if (contacts.some((contact) => contact.name === name)) {
    throw new Error(`Contact with name "${name}" already exists`);
  }
  if (contacts.some((contact) => contact.email === email)) {
    throw new Error(`Contact with email "${email}" already exists`);
  }
  if (contacts.some((contact) => contact.phone === phone)) {
    throw new Error(`Contact with phone "${phone}" already exists`);
  }

  contacts.push({ id: randomUUID(), name, email, phone });
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}
