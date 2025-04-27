'use client';
import { useState, useEffect } from 'react';

type UserWithRole = {
  id?: string;
  name?: string;
  role?: string;
  [key: string]: any;
};

/**
 * Hook đơn giản để lấy thông tin người dùng từ localStorage
 * @returns Thông tin người dùng hiện tại hoặc null nếu chưa đăng nhập
 */
export function useCurrentUser(): UserWithRole | null {
  const [user, setUser] = useState<UserWithRole | null>(null);

  useEffect(() => {
    // Client-side only
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Lỗi khi đọc thông tin người dùng:', error);
        setUser(null);
      }
    }
  }, []);

  return user;
}

/**
 * Hook đơn giản để test/debug với vai trò khác nhau
 * Chỉ sử dụng cho mục đích phát triển
 */
export function useUserWithRole(role: string = 'student'): UserWithRole {
  return {
    id: '1',
    name: 'Người dùng Test',
    role: role,
    avatar: '/images/avatar.png', 
  };
}