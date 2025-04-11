'use client'
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../styles/BecomeTutor.module.css';
import { BsCheckCircle, BsArrowRight } from 'react-icons/bs';

const benefits = [
    {
        id: 1,
        text: "Thu nhập hấp dẫn và linh hoạt"
    },
    {
        id: 2,
        text: "Tự do lựa chọn thời gian giảng dạy"
    },
    {
        id: 3,
        text: "Phát triển kỹ năng sư phạm"
    },
    {
        id: 4,
        text: "Được hỗ trợ đào tạo chuyên môn"
    },
    {
        id: 5,
        text: "Cơ hội kết nối với học viên trên toàn quốc"
    },
    {
        id: 6,
        text: "Hệ thống quản lý lớp học hiện đại"
    }
];

export default function BecomeTutor() {
    return (
        <section className={styles.becomeTutorSection}>
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <div className={styles.content}>
                            <h2 className={styles.title}>
                                Trở thành gia sư cùng chúng tôi
                            </h2>
                            <p className={styles.subtitle}>
                                Chia sẻ kiến thức, xây dựng tương lai và phát triển sự nghiệp giảng dạy của bạn
                            </p>
                            <div className={styles.benefitsList}>
                                {benefits.map((benefit) => (
                                    <div key={benefit.id} className={styles.benefitItem}>
                                        <BsCheckCircle className={styles.checkIcon} />
                                        <span>{benefit.text}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className={styles.registerButton}>
                                Đăng ký ngay
                                <BsArrowRight className={styles.arrowIcon} />
                            </Button>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageContainer}>
                                <img
                                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
                                    alt="Become a tutor"
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.stats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>1000+</span>
                                    <span className={styles.statLabel}>Gia sư</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>5000+</span>
                                    <span className={styles.statLabel}>Học viên</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>20+</span>
                                    <span className={styles.statLabel}>Môn học</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
} 