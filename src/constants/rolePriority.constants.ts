import { UserRole } from "../modules/users/users.types.js";

export const ROLE_PRIORITY: Record<UserRole, number> = {
  user: 1,
  maintainer: 2,
  admin: 3,
};
