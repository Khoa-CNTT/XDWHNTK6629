'use client';
import { ReactNode } from 'react';

interface RequireRoleProps {
  children: ReactNode;
  role: string | string[];
  user?: {
    role?: string;
  } | null;
  fallback?: ReactNode;
}

/**
 * Component wrapper đơn giản để kiểm soát việc hiển thị UI dựa trên vai trò người dùng
 * @param children Nội dung sẽ hiển thị nếu người dùng có quyền
 * @param role Vai trò hoặc mảng các vai trò được phép xem nội dung
 * @param user Object người dùng hiện tại (có thể null)
 * @param fallback Nội dung thay thế hiển thị khi không có quyền (mặc định: null)
 */
export function RequireRole({
  children,
  role,
  user,
  fallback = null
}: RequireRoleProps) {
  // Nếu không có user, hiển thị fallback
  if (!user) {
    return <>{fallback}</>;
  }

  // Chuyển đổi role thành mảng nếu nó là string
  const roles = Array.isArray(role) ? role : [role];

  // Kiểm tra xem user.role có thuộc roles không
  const hasPermission = user.role ? roles.includes(user.role) : false;

  // Trả về children nếu có quyền, ngược lại trả về fallback
  return hasPermission ? <>{children}</> : <>{fallback}</>;
}