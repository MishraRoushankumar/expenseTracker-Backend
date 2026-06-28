export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PaginatedUsers {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetAllUsersOptions {
  page: number;
  limit: number;
  search?: string;
}
