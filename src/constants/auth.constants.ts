export const AUTH_MESSAGES = {
  /*
  ==========================================
  AUTHENTICATION
  ==========================================
  */

  AUTH_REQUIRED: "Authentication required",
  TOKEN_MISSING: "No token provided",
  INVALID_TOKEN: "Invalid or expired token",

  /*
  ==========================================
  LOGIN
  ==========================================
  */

  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_USER_ID: "Invalid userID",
  LOGIN_SUCCESS: "Login successfully",

  /*
  ==========================================
  REGISTRATION
  ==========================================
  */

  EMAIL_IN_USE: "Email already in use",
  REGISTRATION_SUCCESS: "Registration successful",
  REGISTERATION_SUCCESS: "User registered successfully",

  /*
  ==========================================
  LOGOUT
  ==========================================
  */

  LOGOUT_SUCCESS: "Logged out successfully.",
} as const;

export const BCRYPT_SALT_ROUND = 10;

export const ACCESS_TOKEN_EXPIRES_IN = "1h";
