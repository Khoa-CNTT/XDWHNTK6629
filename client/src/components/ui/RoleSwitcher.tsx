'use client';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

/**
 * Component để chuyển đổi vai trò người dùng trong quá trình phát triển
 * Chỉ sử dụng cho mục đích phát triển và kiểm thử
 */
export function RoleSwitcher() {
  const [currentRole, setCurrentRole] = useState('student');

  // Đọc vai trò hiện tại từ localStorage khi component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.role) {
          setCurrentRole(userData.role);
        }
      }
    } catch (error) {
      console.error('Lỗi khi đọc vai trò:', error);
    }
  }, []);

  // Hàm chuyển đổi vai trò
  const switchRole = (role: string) => {
    try {
      // Tạo đối tượng user giả lập
      const mockUser = {
        id: '1',
        name: 'Người dùng Test',
        role: role,
        avatar: '/images/avatar.png', // Đường dẫn đến ảnh đại diện
      };

      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentRole(role);

      // Refresh trang để các thay đổi có hiệu lực
      window.location.reload();
    } catch (error) {
      console.error('Lỗi khi lưu vai trò:', error);
    }
  };


  const roles = ['admin', 'tutor', 'student'];

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <Card style={{ width: '250px' }}>
        <Card.Header className="bg-dark text-white">
          <small>Dev Tool: Chuyển đổi vai trò</small>
        </Card.Header>
        <Card.Body>
          <p className="mb-2"><small>Vai trò hiện tại:</small> <strong>{currentRole}</strong></p>
          <ButtonGroup size="sm" className="w-100">
            {roles.map(role => (
              <Button
                key={role}
                onClick={() => switchRole(role)}
                variant={currentRole === role ? 'primary' : 'outline-secondary'}
                className="text-capitalize"
              >
                {role}
              </Button>
            ))}
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
}