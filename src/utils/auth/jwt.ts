import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UserRole } from "../../modules/users/users.types.js";

export interface JwtPayload {
  userId: number;
  email: string;
  role: UserRole;
}

/*
===================================
GENERATE TOKEN
===================================
*/

export const generateToken = (payload: JwtPayload): string => {
  const secret = env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};

/*
===================================
VERIFY TOKEN
===================================
*/

export const verifyToken = (token: string): JwtPayload => {
  const secret = env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  const decoded = jwt.verify(token, secret);

  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }

  return decoded as JwtPayload;
};
