import { User } from "./repository.js";
import bcrypt from "bcrypt";
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
  const sanitizedUser = toUserDto(user);

  console.log(`User logged in: ${user.email}`);

  return res.json({ token, sanitizedUser });
};

//logout

export const logout = async (req, res) => {
  const id = req.user.id;
  console.log(id);
  if (!id) {
    return res.status(401).json({ error: "Not authorized" });
  }
  await User.findByIdAndUpdate(id, { token: null });
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
