import { Router } from "express";
import bcrypt from "bcrypt"; /* Checkout Argon2 */
import { auth } from "../../middleware/auth.js";
import { User } from "../../models/users/repository.js";
import { JWT } from "../../lib/jwt.js";

export const usersRouter = Router();

const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pwd, salt);

  return hash;
};

const validatePassword = async (pwd, hash) => bcrypt.compare(pwd, hash);

// // Data Transfer Object.
// const toUserDto = (userEntity) => ({
//   id: userEntity._id,
//   email: userEntity.email,
// });

// // Get All Users.
// usersRouter.get("/", auth([UserRole.ADMIN]), async (req, res) => {
//   const users = await Users.find();
//   return res.json(users.map(toUserDto));
// });

// Register.
usersRouter.post("/users/signup", async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ email, password: hashedPassword });

  console.log(`User registered: ${user.email}`);

  return res.sendStatus(201);
});

// Login.
usersRouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValidPassword = await validatePassword(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = await JWT.sign({ id: user._id });

  console.log(`User logged in: ${user.email}`);

  return res.json({ token });
});

// // Get Current user.
// usersRouter.get("/me", auth(), async (req, res) => {
//   const user = await Users.findById(req?.userId);

//   if (!user) {
//     return res.sendStatus(403);

//   }

//   return res.json(toUserDto(user));
// });

// Logout.
// usersRouter.delete("/me", auth(), async (req, res) => {
//   const user = await User.findById(req?.userId);
//   console.log(`User logged out: ${user.email}`);

//   return res.sendStatus(204);
// });
