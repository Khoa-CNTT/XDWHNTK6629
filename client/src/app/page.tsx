'use client';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useUserWithRole } from '@/hooks/useCurrentUser';
import { RequireRole } from '@/components/ui';
import Hero from '@/components/common/Hero';
import TutorList from '@/components/common/TutorList';
import Testimonials from '@/components/common/Testimonials';
import BecomeTutor from '@/components/common/BecomeTutor';

export default function Home() {

  const user = useUserWithRole('guest'); 
  

  return (
    <main>
      <Hero />

      <Container className="py-5">
        <section className="mb-5">
          <TutorList />
        </section>

        {/* Đăng ký trở thành gia sư - chỉ hiển thị khi chưa đăng nhập hoặc đang là học viên */}
        <RequireRole role={['guest', 'student']} user={user}>
          <section className="mb-5">
            <BecomeTutor />
          </section>
        </RequireRole>

        {/* Đánh giá từ người dùng - hiển thị cho tất cả */}
        <section className="mb-5">
          <Testimonials />
        </section>

        {/* Khuyến mãi đặc biệt - chỉ hiển thị cho học viên */}
        <RequireRole role="student" user={user}>
          <section className="mb-5">
            <Row className="align-items-center">
              <Col md={6}>
                <h2>Khuyến mãi đặc biệt</h2>
                <p className="lead">Đăng ký gói học 10 buổi, nhận ngay ưu đãi giảm 15%!</p>
                <p>Chỉ áp dụng cho học viên đã đăng ký. Thời gian khuyến mãi có hạn đến 30/04/2025.</p>
                <Button variant="warning">Đăng ký ngay</Button>
              </Col>
              <Col md={6} className="text-center">
                <img
                  src="/images/promotion.svg"
                  alt="Khuyến mãi đặc biệt"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Col>
            </Row>
          </section>
        </RequireRole>

        {/* Thông báo đặc biệt cho gia sư */}
        <RequireRole role="tutor" user={user}>
          <section className="mb-5">
            <Card className="bg-light">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h3>Chương trình đối tác gia sư cao cấp</h3>
                    <p>Nâng cao hồ sơ của bạn và nhận được nhiều học viên hơn với chương trình đối tác cao cấp.</p>
                    <ul>
                      <li>Hiển thị ưu tiên trong tìm kiếm</li>
                      <li>Hỗ trợ quảng cáo cá nhân hóa</li>
                      <li>Phí hoa hồng giảm 5%</li>
                    </ul>
                  </Col>
                  <Col md={4} className="text-center">
                    <Button variant="outline-primary" size="lg">Tìm hiểu thêm</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </section>
        </RequireRole>
      </Container>
    </main>
  );
}
