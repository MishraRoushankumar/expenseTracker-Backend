export interface User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
}
