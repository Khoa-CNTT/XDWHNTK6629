'use client'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { BsSearch, BsGeoAlt } from 'react-icons/bs';
import {
    PiMathOperationsBold,
    PiBookOpenTextBold,
    PiTranslateBold,
    PiAtomBold,
    PiFlaskBold
} from 'react-icons/pi';
import styles from '../styles/Hero.module.css';

export default function Hero() {
    return (
        <div className={styles.hero}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Tìm kiếm <br />
                        gia sư phù hợp
                    </h1>

                    {/* Search Form */}
                    <div className={styles.searchSection}>
                        <Form className={styles.searchForm}>
                            <div className={styles.inputGroup}>
                                <div className={styles.searchInput}>
                                    <BsSearch className={styles.inputIcon} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Thử tìm 'Toán'"
                                    />
                                </div>
                                <div className={styles.locationInput}>
                                    <BsGeoAlt className={styles.inputIcon} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Địa điểm học"
                                    />
                                </div>
                                <Button variant="danger" className={styles.searchButton}>
                                    Tìm kiếm
                                </Button>
                            </div>
                        </Form>
                    </div>

                    {/* Popular Subjects */}
                    <div className={styles.popularSubjects}>
                        <Row className="justify-content-center">
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div className={styles.subjectItem}>
                                    <PiMathOperationsBold />
                                    <span>Toán học</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div className={styles.subjectItem}>
                                    <PiBookOpenTextBold />
                                    <span>Ngữ văn</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div className={styles.subjectItem}>
                                    <PiTranslateBold />
                                    <span>Tiếng Anh</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div className={styles.subjectItem}>
                                    <PiAtomBold />
                                    <span>Vật lý</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div className={styles.subjectItem}>
                                    <PiFlaskBold />
                                    <span>Hóa học</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
} 