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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?subject=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    };

    const handleSubjectClick = (subject: string) => {
        router.push(`/search?subject=${encodeURIComponent(subject)}`);
    };

    return (
        <div className={styles.hero}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Tìm kiếm <br />
                        gia sư phù hợp
                    </h1>

                    {/* Search Form */}
                    {isClient && (
                        <div className={styles.searchSection}>
                            <Form className={styles.searchForm} onSubmit={handleSearch}>
                                <div className={styles.inputGroup}>
                                    <div className={styles.searchInput}>
                                        <BsSearch className={styles.inputIcon} />
                                        <Form.Control
                                            type="text"
                                            placeholder="Thử tìm 'Toán'"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.locationInput}>
                                        <BsGeoAlt className={styles.inputIcon} />
                                        <Form.Control
                                            type="text"
                                            placeholder="Địa điểm học"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        variant="danger"
                                        className={styles.searchButton}
                                        type="submit"
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    )}

                    {/* Popular Subjects */}
                    <div className={styles.popularSubjects}>
                        <Row className="justify-content-center">
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div
                                    className={styles.subjectItem}
                                    onClick={() => handleSubjectClick('Toán học')}
                                    role="button"
                                >
                                    <PiMathOperationsBold />
                                    <span>Toán học</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div
                                    className={styles.subjectItem}
                                    onClick={() => handleSubjectClick('Ngữ văn')}
                                    role="button"
                                >
                                    <PiBookOpenTextBold />
                                    <span>Ngữ văn</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div
                                    className={styles.subjectItem}
                                    onClick={() => handleSubjectClick('Tiếng Anh')}
                                    role="button"
                                >
                                    <PiTranslateBold />
                                    <span>Tiếng Anh</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div
                                    className={styles.subjectItem}
                                    onClick={() => handleSubjectClick('Vật lý')}
                                    role="button"
                                >
                                    <PiAtomBold />
                                    <span>Vật lý</span>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className={styles.subjectCol}>
                                <div
                                    className={styles.subjectItem}
                                    onClick={() => handleSubjectClick('Hóa học')}
                                    role="button"
                                >
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