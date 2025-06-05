export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export function success<T>(data: T, message = 'Success', code = 200): ApiResponse<T> {
  return { code, data, message };
} 