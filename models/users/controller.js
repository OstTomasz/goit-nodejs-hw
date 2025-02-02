import * as UsersService from "./service.js";
import bcrypt from "bcrypt";

const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pwd, salt);

  return hash;
};

const validatePassword = async (pwd, hash) => bcrypt.compare(pwd, hash);

const emailsList = async () => {
  const userList = await UsersService.getAll();
  return userList.map((user) => user.email);
};

const toUserDto = (userEntity) => ({
  id: userEntity._id,
  email: userEntity.email,
});

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const existingEmails = await emailsList();
  if (existingEmails.includes(email)) {
    return res.status(400).json({ message: "Email already in use" });
  }
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const hashedPassword = await hashPassword(password);
  const user = await UsersService.register({ email, password: hashedPassword });

  return res.status(201).json({ user });
};
