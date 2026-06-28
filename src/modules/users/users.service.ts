import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../utils/constants.js";

export interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Alex",
    email: "alex@test.com",
  },
  {
    id: 2,
    name: "John",
    email: "john@test.com",
  },
];

export const getAllUsers = (): User[] => {
  return users;
};

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

let nextId = users.length + 1;

export const createUser = (name: string, email: string): User => {
  const exists = users.some((u) => u.email === email);

  if (exists) throw new AppError(HTTP_STATUS.CONFLICT, "Email already in use");

  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);

  return newUser;
};
