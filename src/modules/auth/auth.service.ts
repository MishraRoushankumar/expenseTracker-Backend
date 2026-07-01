import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../utils/constants.js";
import { generateToken } from "../../utils/jwt.js";
import { BCRYPT_SALT_ROUND } from "./auth.constants.js";
import { createUser, findUserByEmail } from "../users/users.repository.js";
import { LoginDto, RegisterDto } from "./auth.schema.js";
import bcrypt from "bcrypt";

/*
=====================================
REGISTER USER
=====================================
*/

export const registerUser = async (data: RegisterDto): Promise<void> => {
  const existingUser = findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError(HTTP_STATUS.CONFLICT, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, BCRYPT_SALT_ROUND);

  createUser({
    email: data.email,
    passwordHash: hashedPassword,
    firstName: data.firstName,
    lastName: data.lastName,
  });
};

/*
=====================================
LOGIN USER
=====================================
*/

export const loginUser = async (data: LoginDto): Promise<string> => {
  const user = findUserByEmail(data.email);

  if (!user) {
    throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordCorrect) {
    throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  return generateToken({ userId: user.id, email: user.email });
};
