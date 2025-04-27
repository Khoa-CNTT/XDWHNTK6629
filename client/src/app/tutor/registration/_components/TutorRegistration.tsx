'use client'
import { useRouter } from 'next/navigation'; // Update import to use App Router
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import styles from './TutorRegistration.module.css';
import { FaGoogle, FaApple } from 'react-icons/fa';

export default function TutorRegistration() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        router.push('/tutor/createanad/step1');
    };

    return (
        <div className={styles.tutorRegistrationSection}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h1 className={styles.title}>
                            Trở thành gia sư,<br />
                            chia sẻ đam mê của bạn!
                        </h1>
                        <p className={styles.description}>
                            Chào mừng bạn đến với nền tảng dạy học trực tuyến hàng đầu Việt Nam,
                            nơi kết nối hàng nghìn học viên với những người thầy xuất sắc mỗi ngày.
                        </p>
                        <div className={styles.features}>
                            <div className={styles.featureItem}>
                                <span className={styles.icon}>💰</span>
                                <span>Thu nhập hấp dẫn từ 200.000đ - 500.000đ/giờ</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.icon}>🕒</span>
                                <span>Tự do sắp xếp thời gian giảng dạy</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.icon}>🎯</span>
                                <span>Phát triển kỹ năng sư phạm chuyên nghiệp</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.icon}>🌟</span>
                                <span>Được hỗ trợ đào tạo chuyên môn</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.icon}>🤝</span>
                                <span>Kết nối với học viên trên toàn quốc</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.icon}>💻</span>
                                <span>Hệ thống quản lý lớp học hiện đại</span>
                            </div>
                        </div>
                        <p className={styles.subtext}>
                            Với hơn 20 môn học từ Học thuật, Ngoại ngữ, Nghệ thuật đến Thể thao,
                            bạn có thể chia sẻ kiến thức trong lĩnh vực sở trường của mình.
                        </p>
                        <p className={styles.audience}>
                            Dành cho giáo viên, sinh viên, chuyên gia, người đi làm có kinh nghiệm...
                        </p>
                        <p className={styles.cta}>
                            Đăng ký ngay để bắt đầu hành trình giảng dạy của bạn!
                        </p>
                    </div>

                    <div className={styles.formContent}>
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>Tạo hồ sơ gia sư</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className={styles.formGroup}>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Đăng ký bằng email
                                </Button>

                                <div className={styles.divider}>
                                    <span>hoặc</span>
                                </div>

                                <Button
                                    variant="light"
                                    className={styles.socialButton}
                                >
                                    <FaGoogle /> Đăng ký với Google
                                </Button>
                                <Button
                                    variant="light"
                                    className={styles.socialButton}
                                >
                                    <FaApple /> Đăng ký với Apple
                                </Button>

                                <p className={styles.loginText}>
                                    Bạn đã có tài khoản? <a href="#" className={styles.loginLink}>Đăng nhập</a>
                                </p>
                                <p className={styles.termsText}>
                                    Bằng cách đăng ký, bạn đồng ý với <a href="#" className={styles.termsLink}>điều khoản sử dụng</a> của chúng tôi
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}