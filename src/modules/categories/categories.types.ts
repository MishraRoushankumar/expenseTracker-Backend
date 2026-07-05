export interface Category {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInput {
  name: string;
  userId: number;
}

export interface UpdateCategoryInput {
  name: string;
}
