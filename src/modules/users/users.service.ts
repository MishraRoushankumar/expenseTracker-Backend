import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import {
  deleteUser,
  findUserById,
  updateUser,
  updateUserRole,
} from "./users.repository.js";
import type { UpdateProfileDto } from "./users.schema.js";
import type { User, UserRole } from "./users.types.js";
import type { JwtPayload } from "../../utils/auth/jwt.js";
import { ROLE_PRIORITY } from "../../constants/role.constants.js";
import { USER_MESSAGES } from "../../constants/user.constants.js";

/*
========================================
GET PROFILE SERVICE
========================================
*/

export const getProfileService = async (userId: number): Promise<User> => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGES.USER_NOT_FOUND);
  }

  return user;
};

/*
========================================
UPDATE PROFILE SERVICE
========================================
*/

export const updateProfileService = async (
  userId: number,
  data: UpdateProfileDto,
): Promise<User> => {
  const updatedUser = await updateUser(userId, data);

  if (!updatedUser || updatedUser === undefined) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGES.USER_NOT_FOUND);
  }

  return updatedUser;
};

/*
========================================
UPDATE USER ROLE SERVICE
========================================
*/

export const updateUserRoleService = async (
  id: number,
  role: UserRole,
): Promise<User> => {
  const user = await updateUserRole(id, role);

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGES.USER_NOT_FOUND);
  }

  return user;
};

/*
========================================
DELETE USER SERVICE
========================================
*/

export const deleteUserService = async (
  requester: JwtPayload,
  targetUserId: number,
): Promise<void> => {
  if (requester.userId === targetUserId) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      USER_MESSAGES.INVALID_SELF_DELETE,
    );
  }

  const targetUser = await findUserById(targetUserId);

  if (!targetUser) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGES.USER_NOT_FOUND);
  }

  const requesterPriority = ROLE_PRIORITY[requester.role];

  const targetUserPriority = ROLE_PRIORITY[targetUser.role];

  if (requesterPriority <= targetUserPriority) {
    throw new AppError(
      HTTP_STATUS.FORBIDDEN,
      USER_MESSAGES.INVALID_OTHER_DELETE,
    );
  }

  const deleted = await deleteUser(targetUserId);

  if (!deleted) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGES.USER_NOT_FOUND);
  }
};
