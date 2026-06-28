import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS, users } from "../../utils/constants.js";
import { GetAllUsersOptions, PaginatedUsers, User } from "./users.types.js";

/* 
  =================================
  GET ALL USERS
  =================================
*/

export const getAllUsers = ({
  page,
  limit,
  search,
}: GetAllUsersOptions): PaginatedUsers => {
  const filtered = search
    ? users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    : users;

  const total = filtered.length;

  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;

  const paginatedUsers = filtered.slice(start, start + limit);

  return {
    users: paginatedUsers,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

/* 
  =================================
  GET USER BY ID
  =================================
*/

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

/* 
  =================================
  CREATE NEW USERS
  =================================
*/

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
