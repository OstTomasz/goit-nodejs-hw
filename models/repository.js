import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
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

export const Contact = model("Contact", contactSchema);
