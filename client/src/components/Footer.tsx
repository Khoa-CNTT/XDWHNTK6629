'use client'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="py-5">
                    {/* About Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Giới thiệu</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/who-are-we">Chúng tôi là ai?</Link></li>
                            <li><Link href="/terms">Điều khoản & Điều kiện</Link></li>
                            <li><Link href="/privacy">Chính sách bảo mật</Link></li>
                            <li><Link href="/global">Superprof Toàn cầu</Link></li>
                            <li><Link href="/online-lessons">Học trực tuyến</Link></li>
                            <li><Link href="/states">Khu vực</Link></li>
                            <li><Link href="/careers">Cơ hội nghề nghiệp</Link></li>
                        </ul>
                    </Col>

                    {/* All Subjects Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Tất cả môn học</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/arts-hobbies">Nghệ thuật & Sở thích</Link></li>
                            <li><Link href="/career-development">Phát triển nghề nghiệp</Link></li>
                            <li><Link href="/computer-sciences">Khoa học máy tính</Link></li>
                            <li><Link href="/languages">Ngoại ngữ</Link></li>
                            <li><Link href="/music">Âm nhạc</Link></li>
                            <li><Link href="/health">Sức khỏe & Thể chất</Link></li>
                            <li><Link href="/academic">Gia sư học thuật</Link></li>
                            <li><Link href="/sports">Thể thao</Link></li>
                        </ul>
                    </Col>

                    {/* Join the adventure Column */}
                    <Col md={3}>
                        <h5 className={styles.title}>Tham gia cùng chúng tôi</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/blog">Blog Superprof</Link></li>
                        </ul>
                    </Col>

                    {/* Help Column */}
                    <Col md={2}>
                        <h5 className={styles.title}>Hỗ trợ</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/help">Trung tâm trợ giúp</Link></li>
                            <li><Link href="/contact">Liên hệ</Link></li>
                        </ul>
                    </Col>

                    {/* Follow us Column */}
                    <Col md={1}>
                        <h5 className={styles.title}>Theo dõi</h5>
                        <div className={styles.socialLinks}>
                            <Link href="https://facebook.com" className={styles.socialIcon}>
                                <FaFacebook />
                            </Link>
                            <Link href="https://instagram.com" className={styles.socialIcon}>
                                <FaInstagram />
                            </Link>
                        </div>
                    </Col>
                </Row>

                <div className={styles.copyright}>
                    © 2025 Superprof, học cùng những người giỏi nhất!
                </div>
            </Container>
        </footer>
    );
}
