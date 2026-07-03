import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import {
  deleteUser,
  findUserById,
  updateUser,
  updateUserRole,
} from "./users.repository.js";
import { UpdateProfileDto } from "./users.schema.js";
import { UserRole } from "./users.types.js";
import { JwtPayload } from "../../utils/jwt.js";
import { ROLE_PRIORITY } from "../../constants/rolePriority.constants.js";

/*
========================================
GET PROFILE SERVICE
========================================
*/

export const getProfileService = async (userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
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
) => {
  const existingUser = await findUserById(userId);

  if (!existingUser) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const updatedUser = await updateUser(userId, data);

  if (!updatedUser) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

/*
========================================
UPDATE USER ROLE SERVICE
========================================
*/

export const updateUserRoleService = async (id: number, role: UserRole) => {
  const user = await updateUserRole(id, role);

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
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
    throw new AppError(HTTP_STATUS.BAD_REQUEST, "You cannot delete yourself");
  }

  const targetUser = await findUserById(targetUserId);

  if (!targetUser) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const requesterPriority = ROLE_PRIORITY[requester.role];

  const targetUserPriority = ROLE_PRIORITY[targetUser.role];

  if (requesterPriority <= targetUserPriority) {
    throw new AppError(HTTP_STATUS.FORBIDDEN, "You cannot delete this user");
  }

  const deleted = await deleteUser(targetUserId);

  if (!deleted) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
  }
};
