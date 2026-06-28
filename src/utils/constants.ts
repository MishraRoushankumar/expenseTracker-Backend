import { User } from "../modules/users/users.types.js";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

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
