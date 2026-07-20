import type { InferSelectModel } from "drizzle-orm";
import type { users } from "../../db/schema/users.js";

export type UserRole = "admin" | "maintainer" | "user";

/*
=========================================
USER ENTITY
=========================================
*/

export type User = InferSelectModel<typeof users>;

/*
=========================================
CREATE USER INPUT
=========================================
*/

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

/*
=========================================
UPDATE PROFILE INPUT
=========================================
*/

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
}

/*
=========================================
SAFE USER ENTITY
=========================================
*/

export interface SafeUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
