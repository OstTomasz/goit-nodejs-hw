import { User } from "./repository.js";

export const getAll = () => User.find({});

export const register = (user) => User.create(user);
