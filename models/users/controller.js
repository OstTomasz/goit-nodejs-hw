import { User } from "./repository.js";
import bcrypt from "bcrypt";
import fs from "node:fs/promises";
import { JWT } from "../../lib/jwt.js";

import * as UsersService from "./service.js";

const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pwd, salt);

  return hash;
};

const validatePassword = async (pwd, hash) => bcrypt.compare(pwd, hash);

const toUserDto = (userEntity) => ({
  email: userEntity.email,
  subscription: userEntity.subscription,
  token: userEntity.token, // we don't need to expose the token in the response
});

//register
export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    return res.status(400).json({ message: "Email already in use" });
  }
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const hashedPassword = await hashPassword(password);
  const user = await UsersService.register({ email, password: hashedPassword });
  const sanitizedUser = toUserDto(user);
  return res.status(201).json({ sanitizedUser });
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ message: "There is no user with this email" });
  }

  const isValidPassword = await validatePassword(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = await JWT.sign({ id: user.id });
  user.token = token;
  user.save();
  const sanitizedUser = toUserDto(user);

  console.log(`User logged in: ${user.email}`);

  return res.json({ token, sanitizedUser });
};

//logout

export const logout = async (req, res) => {
  const user = req.user;
  console.log(user);
  if (!user.id) {
    return res.status(401).json({ error: "Not authorized" });
  }
  await User.findByIdAndUpdate(user.id, { token: null });
  user.save();
  console.log(`User logged out: ${req.user.email}`);

  return res.status(204).json({ message: "User logged out successfully" });
};

//current

export const getCurrent = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const sanitizedUser = toUserDto(user);
  console.log(`User info requested: ${user.email}`);
  return res.json(sanitizedUser);
};
//update Avatar
export const updateAvatar = async (req, res) => {
  const user = req.user;
  console.log(user);

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const avatar = user.avatarURL;
  const newAvatar = null;

  console.log(req.file);

  if (!req.file?.originalname) {
    return res.status(400).json({ message: "Invalid file" });
  }

  const originalName = req.file.originalname;

  console.log(`Uploading ${originalName} ...`);

  const targetName = `${user.email}|${originalName}`;

  const targetFileName = path.join(IMAGES_DIRECTORY, targetName);

  try {
    await fs.rename(req.file.path, targetFileName);
  } catch (error) {
    await fs.unlink(req.file.path);
    return res.sendStatus(500);
  }

  return res.status(302);
};
