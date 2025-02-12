import * as ContactsService from "./service.js";

const idsList = async () => {
  const contactList = await ContactsService.getAll();
  return contactList.map((contact) => contact.id);
};
export const getAll = async (req, res) => {
  const contacts = await ContactsService.getAll();
  return res.status(200).json(contacts);
};

export const getById = async (req, res) => {
  const id = req.params.contactId;
  const existingIds = await idsList();
  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }

  const reqestedContact = await ContactsService.getById(id);

  return res.status(200).json(reqestedContact);
};

export const createContact = async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const contact = await ContactsService.create(body);
  return res.status(201).json(contact);
};

export const deleteContact = async (req, res) => {
  const id = req.params.contactId;
  const existingIds = await idsList();
  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  await ContactsService.deleteById(id);
  return res.status(200).json({ message: `Contact with id ${id} deleted!` });
};

export const updateContactById = async (req, res) => {
  const body = req.body;
  const id = req.params.contactId;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const existingIds = await idsList();
  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  await ContactsService.updateById(id, body);
  return res.status(200).json({ message: `updated contact with id ${id}` });
};

export const updateStatus = async (req, res) => {
  const favorite = req.body;
  console.log(favorite);
  const id = req.params.contactId;
  const existingIds = await idsList();
  if (!favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  if (!existingIds.includes(id)) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} not found!` });
  }
  await ContactsService.updateStatusContact(id, favorite);
  return res.status(200).json({ message: `updated contact with id ${id}` });
};
