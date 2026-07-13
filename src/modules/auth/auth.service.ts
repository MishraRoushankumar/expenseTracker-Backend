import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { generateToken } from "../../utils/auth/jwt.js";
import {
  AUTH_MESSAGES,
  BCRYPT_SALT_ROUND,
} from "../../constants/auth.constants.js";
import { createUser, findUserByEmail } from "../users/users.repository.js";
import type { LoginDto, RegisterDto } from "./auth.schema.js";
import bcrypt from "bcrypt";

/*
=====================================
REGISTER USER
=====================================
*/

export const registerUser = async (data: RegisterDto): Promise<string> => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError(HTTP_STATUS.CONFLICT, AUTH_MESSAGES.EMAIL_IN_USE);
  }

  const hashedPassword = await bcrypt.hash(data.password, BCRYPT_SALT_ROUND);

  const user = await createUser({
    email: data.email,
    passwordHash: hashedPassword,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  return generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
};

/*
=====================================
LOGIN USER
=====================================
*/

export const loginUser = async (data: LoginDto): Promise<string> => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordCorrect) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );
  }

  return generateToken({ userId: user.id, email: user.email, role: user.role });
};
