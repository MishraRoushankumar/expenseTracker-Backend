import { User } from "./users.types.js";

export const users: User[] = [
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
] as const;
