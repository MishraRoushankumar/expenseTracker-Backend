/*
=========================================
SECURITY SCHEMES
=========================================
*/

export const bearerSecurity = {
  bearerAuth: {
    type: "http",

    scheme: "bearer",

    bearerFormat: "JWT",

    description: "JWT access token. Enter only the token value.",
  },
};
