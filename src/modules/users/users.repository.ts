import { User } from "./users.types.js";

const users: User[] = [
  {
    id: 1,

    email: "test@gmail.com",

    firstName: "Roushan",

    lastName: "Mishra",

    createdAt: new Date(),

    updatedAt: new Date(),
  },
];

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
UPDATE USER
=========================================
*/

export const updateUser = (
  id: number,
  data: Partial<User>,
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
  return true;
};
