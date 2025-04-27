'use client';
import { Container, Alert, Button } from 'react-bootstrap';

export function UnauthorizedAccessMessage() {
  return (
    <Container className="py-5">
      <Alert variant="warning">
        <Alert.Heading>Không có quyền truy cập</Alert.Heading>
        <p>
          Bạn không có quyền truy cập vào trang quản lý khóa học này.
          Chỉ gia sư và quản trị viên mới có thể xem trang này.
        </p>
        <hr />
        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" href="/">Về trang chủ</Button>
          <Button variant="outline-success" href="/tutor/registration">Đăng ký làm gia sư</Button>
        </div>
      </Alert>
    </Container>
  );
}