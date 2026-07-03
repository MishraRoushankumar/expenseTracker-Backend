import { User } from "./users.types.js";

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: "admin" | "maintainer" | "user";
  created_at: Date;
  updated_at: Date;
}

export const mapUserRow = (row: UserRow): User => {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    firstName: row.first_name,
    lastName: row.last_name,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};
