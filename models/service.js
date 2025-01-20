import { Contact } from "./repository.js";
export const getAll = () => Contact.find({});

export const getById = (id) => Contact.findOne({ _id: id });

export const create = (contact) => Contact.create(contact);

export const updateById = (id, updatedContact) =>
  Contact.findOneAndUpdate({ _id: id }, updatedContact);

export const updateStatusContact = (id, favorite) =>
  Contact.findOneAndUpdate({ _id: id }, favorite);

export const deleteById = (id) => Contact.findByIdAndDelete(id);
