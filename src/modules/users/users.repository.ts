import { db } from "../../config/database.js";
import { mapUserRow } from "./users.mapper.js";
import {
  CreateUserInput,
  UpdateProfileInput,
  User,
  UserRole,
} from "./users.types.js";

/*
=========================================
FIND USER BY ID
=========================================
*/

export const findUserById = async (id: number): Promise<User | undefined> => {
  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapUserRow(result.rows[0]);
};

/*
=========================================
FIND USER BY EMAIL
=========================================
*/

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapUserRow(result.rows[0]);
};

/*
=========================================
CREATE USER
=========================================
*/

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const { email, passwordHash, firstName, lastName } = data;

  const result = await db.query(
    `
      INSERT INTO users (
        email,
        password_hash,
        first_name,
        last_name
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [email, passwordHash, firstName, lastName],
  );

  return mapUserRow(result.rows[0]);
};

/*
=========================================
UPDATE USER
=========================================
*/

export const updateUser = async (
  id: number,
  data: UpdateProfileInput,
): Promise<User | undefined> => {
  const result = await db.query(
    `
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `,
    [data.firstName, data.lastName, id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapUserRow(result.rows[0]);
};

/*
=========================================
DELETE USER
=========================================
*/

export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await db.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return result.rows.length > 0;
};

/*
=========================================
UPDATE USER ROLES
=========================================
*/

export const updateUserRole = async (
  id: number,
  role: UserRole,
): Promise<User | undefined> => {
  const result = await db.query(
    `
      UPDATE users
      SET
        role = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `,
    [role, id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapUserRow(result.rows[0]);
};
