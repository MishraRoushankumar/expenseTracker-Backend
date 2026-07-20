import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/index.js";
import type {
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
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return user;
};

/*
=========================================
FIND USER BY EMAIL
=========================================
*/

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
};

/*
=========================================
CREATE USER
=========================================
*/

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const { email, passwordHash, firstName, lastName } = data;

  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      firstName,
      lastName,
    })
    .returning();

  return user;
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
  const { firstName, lastName } = data;

  const [user] = await db
    .update(users)
    .set({
      firstName,
      lastName,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();

  return user;
};

/*
=========================================
DELETE USER
=========================================
*/

export const deleteUser = async (id: number): Promise<boolean> => {
  const deleted = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning({ id: users.id });

  return deleted.length > 0;
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
  const [user] = await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();

  return user;
};
