'use client'
import { Container, Navbar, Form, Button, Nav } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { BsSearch, BsQuestionCircle, BsGeoAlt } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Hiển thị thanh tìm kiếm khi cuộn quá 600px (chiều cao của Hero section)
            const shouldShowSearch = window.scrollY > 600;
            setShowSearch(shouldShowSearch);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShowLogin = () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
    };

    const handleShowSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
    };

    const handleBecomeTutor = () => {
        router.push('/become-tutor');
    };

    return (
        <>
            <Navbar fixed="top" bg="white" className={styles.header}>
                <Container className="d-flex align-items-center">
                    {/* Logo */}
                    <Navbar.Brand
                        onClick={() => router.push('/')}
                        className={styles.logo}
                        style={{ cursor: 'pointer' }}
                    >
                        superprof
                    </Navbar.Brand>

                    {/* Search Bar - Hidden by default */}
                    <div className={`${styles.headerSearch} ${showSearch ? styles.show : ''}`}>
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

                    {/* Navigation */}
                    <Nav className={styles.nav}>
                        <Button
                            variant="link"
                            className={styles.helpButton}
                        >
                            <BsQuestionCircle size={20} />
                        </Button>
                        <Button
                            variant="outline-danger"
                            className={styles.becomeButton}
                            onClick={handleBecomeTutor}
                        >
                            Trở thành gia sư
                        </Button>
                        <Button
                            variant="link"
                            className={styles.loginButton}
                            onClick={() => setShowLoginModal(true)}
                        >
                            Đăng nhập
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <LoginModal
                show={showLoginModal}
                onHide={() => setShowLoginModal(false)}
                onShowSignup={handleShowSignup}
            />

            <SignupModal
                show={showSignupModal}
                onHide={() => setShowSignupModal(false)}
                onShowLogin={handleShowLogin}
            />
        </>
    );
} 