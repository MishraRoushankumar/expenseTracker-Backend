export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  TOKEN_MISSING: "No token provided",
  INVALID_TOKEN: "Invalid or expired token",
  EMAIL_IN_USE: "Email already in use",
} as const;

export const BCRYPT_SALT_ROUND = 10;

export const ACCESS_TOKEN_EXPIRES_IN = "1h";
