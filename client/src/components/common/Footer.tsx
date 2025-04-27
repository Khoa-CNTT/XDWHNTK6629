'use client'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="py-4">
                    {/* About Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Giới thiệu</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/about-us">Về chúng tôi</Link></li>
                            <li><Link href="/terms">Điều khoản sử dụng</Link></li>
                            <li><Link href="/privacy">Chính sách bảo mật</Link></li>
                            <li><Link href="/online-learning">Học trực tuyến</Link></li>
                        </ul>
                    </Col>

                    {/* Subjects Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Môn học</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/subjects/math">Toán học</Link></li>
                            <li><Link href="/subjects/literature">Ngữ văn</Link></li>
                            <li><Link href="/subjects/english">Tiếng Anh</Link></li>
                            <li><Link href="/subjects/physics">Vật lý</Link></li>
                            <li><Link href="/subjects/chemistry">Hóa học</Link></li>
                        </ul>
                    </Col>

                    {/* Resources Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Tài nguyên</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/study-tips">Phương pháp học</Link></li>
                            <li><Link href="/exam-prep">Ôn thi hiệu quả</Link></li>
                            <li><Link href="/tutor-register">Trở thành gia sư</Link></li>
                        </ul>
                    </Col>

                    {/* Help & Connect Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Hỗ trợ & Kết nối</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/help">Trung tâm trợ giúp</Link></li>
                            <li><Link href="/contact">Liên hệ</Link></li>
                        </ul>
                        <h5 className={styles.title} style={{ marginTop: '1.2rem' }}>Theo dõi</h5>
                        <div className={styles.socialLinks}>
                            <Link href="https://facebook.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </Link>
                            <Link href="https://instagram.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </Link>
                            <Link href="https://youtube.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                                <FaYoutube />
                            </Link>
                            <Link href="https://tiktok.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                                <FaTiktok />
                            </Link>
                        </div>
                    </Col>
                </Row>

                <div className={styles.copyright}>
                    © 2025 HomiTutor, nền tảng kết nối gia sư hàng đầu
                </div>
            </Container>
        </footer>
    );
}
