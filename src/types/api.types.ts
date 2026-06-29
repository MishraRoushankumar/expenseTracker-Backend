export interface ApiResponseOptions<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}
