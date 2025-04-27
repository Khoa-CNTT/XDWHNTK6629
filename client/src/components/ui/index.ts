// Re-export components liên quan đến phân quyền UI
export { RequireRole } from './RequireRole';
export { UnauthorizedAccessMessage } from './UnauthorizedAccessMessage';
export { RoleSwitcher } from './RoleSwitcher';

// Export các kiểu dữ liệu hữu ích
export type UserWithRole = {
  id?: string;
  name?: string;
  role?: string;
  [key: string]: any;
};