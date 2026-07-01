import { CreateUserInput, UpdateProfileInput, User } from "./users.types.js";

const users: User[] = [
  {
    id: 1,
    email: "test@gmail.com",
    passwordHash: "hashed-password-placeholder",
    firstName: "Roushan",
    lastName: "Mishra",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let nextId = 2;

/*
=========================================
FIND USER BY ID
=========================================
*/

export const findUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

/*
=========================================
FIND USER BY EMAIL
=========================================
*/

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

/*
=========================================
CREATE USER
=========================================
*/

export const createUser = (data: CreateUserInput): User => {
  const user: User = {
    id: nextId++,

    email: data.email,

    passwordHash: data.passwordHash,

    firstName: data.firstName,

    lastName: data.lastName,

    createdAt: new Date(),

    updatedAt: new Date(),
  };

  users.push(user);

  return user;
};

/*
=========================================
UPDATE USER
=========================================
*/

export const updateUser = (
  id: number,
  data: UpdateProfileInput,
): User | undefined => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return undefined;
  }

  Object.assign(user, data, {
    updatedAt: new Date(),
  });

  return user;
};

/*
=========================================
DELETE USER
=========================================
*/

export const deleteUser = (id: number): boolean => {
  //will be updated later
  return true;
};
