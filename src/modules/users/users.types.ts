export type UserRole = "admin" | "maintainer" | "user";

/*
=========================================
USER ENTITY
=========================================
*/

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

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
