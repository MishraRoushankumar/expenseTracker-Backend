export const USER_ROLES = {
  ADMIN: "admin",
  MAINTAINER: "maintainer",
  USER: "user",
} as const;

export const ROLE_PRIORITY = {
  [USER_ROLES.ADMIN]: 3,
  [USER_ROLES.MAINTAINER]: 2,
  [USER_ROLES.USER]: 1,
} as const;
