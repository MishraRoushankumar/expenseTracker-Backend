import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../utils/constants.js";
import { generateToken } from "../../utils/jwt.js";
import { LoginDto, RegisterDto } from "./auth.schema.js";
import { AuthUser } from "./auth.types.js";
import bcrypt from "bcrypt";

const users: AuthUser[] = [];

let nextId = 1;

/*
=====================================
REGISTER USER
=====================================
*/

export const registerUser = async (data: RegisterDto): Promise<void> => {
  const exists = users.some((user) => user.email === data.email);

  if (exists) {
    throw new AppError(
      HTTP_STATUS.CONFLICT,
      "Email is registered with another user",
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  users.push({
    id: nextId++,
    email: data.email,
    password: hashedPassword,
  });
};

/*
=====================================
LOGIN USER
=====================================
*/

export const loginUser = async (data: LoginDto): Promise<string> => {
  const user = users.find((u) => u.email === data.email);

  if (!user) {
    throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  return generateToken({ userId: user.id, email: user.email });
};
