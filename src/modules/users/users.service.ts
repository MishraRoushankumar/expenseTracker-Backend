import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { findUserById, updateUser } from "./users.repository.js";
import { UpdateProfileDto } from "./users.schema.js";

/*
========================================
GET PROFILE SERVICE
========================================
*/

export const getProfileService = async (userId: number) => {
  const user = findUserById(userId);

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
  const existingUser = findUserById(userId);

  if (!existingUser) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const updatedUser = updateUser(userId, data);

  return updatedUser;
};
