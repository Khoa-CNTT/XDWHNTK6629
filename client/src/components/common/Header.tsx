'use client'
import { Container, Navbar, Form, Button, Nav, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { BsSearch, BsQuestionCircle, BsGeoAlt, BsPerson, BsEnvelope, BsGear, BsBoxArrowRight, BsBook, BsCalendar, BsGraphUp } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import { toast } from 'react-toastify';
import { RequireRole } from '@/components/ui';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Header() {
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Sử dụng hook để lấy thông tin người dùng
    const user = useCurrentUser();
    const isAuthenticated = !!user;

    useEffect(() => {
        setIsClient(true);
        const handleScroll = () => {
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
        router.push('/tutor/registration');
    };

    const handleViewAvailableLessons = () => {
        router.push('/available-lessons');
    };

    const handleLogin = () => {
        // Lưu thông tin đăng nhập mẫu vào localStorage
        const mockUser = {
            id: '1',
            name: 'Người dùng',
            role: 'student',
            avatar: '/images/avatar.png', // Đường dẫn đến ảnh đại diện
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        setShowLoginModal(false);

        toast.success('Đăng nhập thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Refresh trang để cập nhật trạng thái người dùng
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.info('Đăng xuất thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Refresh trang để cập nhật trạng thái người dùng
        window.location.reload();
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
                        homitutor
                    </Navbar.Brand>

                    {/* Search Bar - Hidden by default */}
                    {isClient && (
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
                    )}

                    {/* Navigation */}
                    <Nav className={styles.nav}>
                        <Button
                            variant="link"
                            className={styles.helpButton}
                        >
                            <BsQuestionCircle size={20} />
                        </Button>

                        {/* Nút hành động dựa trên vai trò */}
                        <RequireRole
                            role="student"
                            user={user}
                            fallback={
                                <Button
                                    variant="outline-success"
                                    className={styles.becomeButton}
                                    onClick={handleViewAvailableLessons}
                                >
                                    Xem lịch dạy trống
                                </Button>
                            }
                        >
                            <Button
                                variant="outline-danger"
                                className={styles.becomeButton}
                                onClick={handleBecomeTutor}
                            >
                                Trở thành gia sư
                            </Button>
                        </RequireRole>

                        {/* Dropdown người dùng hoặc nút đăng nhập */}
                        {isAuthenticated ? (
                            <Dropdown align="end" className={styles.userDropdown}>
                                <Dropdown.Toggle as="div" className={styles.userToggle}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userAvatar}>
                                            <Image
                                                src={user?.avatar || "https://via.placeholder.com/40"}
                                                alt="User avatar"
                                                width={32}
                                                height={32}
                                                className={styles.avatarImage}
                                            />
                                        </div>
                                        <span className={styles.userName}>{user?.name}</span>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className={styles.userMenu}>
                                    <Dropdown.Header>Xin chào, {user?.name}</Dropdown.Header>

                                    {/* Menu riêng cho học sinh */}
                                    <RequireRole role="student" user={user}>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsBook className={styles.dropdownIcon} />
                                            Khóa học của tôi
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsCalendar className={styles.dropdownIcon} />
                                            Lịch học
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsGraphUp className={styles.dropdownIcon} />
                                            Báo cáo tiến độ
                                        </Dropdown.Item>
                                    </RequireRole>

                                    {/* Menu riêng cho gia sư */}
                                    <RequireRole role="tutor" user={user}>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsBook className={styles.dropdownIcon} />
                                            Khóa học đang dạy
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsCalendar className={styles.dropdownIcon} />
                                            Lịch dạy
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsGraphUp className={styles.dropdownIcon} />
                                            Thống kê thu nhập
                                        </Dropdown.Item>
                                    </RequireRole>

                                    {/* Menu riêng cho admin */}
                                    <RequireRole role="admin" user={user}>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsPerson className={styles.dropdownIcon} />
                                            Quản lý người dùng
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsBook className={styles.dropdownIcon} />
                                            Quản lý khóa học
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="#" className={styles.dropdownItem}>
                                            <BsGraphUp className={styles.dropdownIcon} />
                                            Báo cáo & thống kê
                                        </Dropdown.Item>
                                    </RequireRole>

                                    {/* Menu chung cho tất cả người dùng đã đăng nhập */}
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} href="/messages" className={styles.dropdownItem}>
                                        <BsEnvelope className={styles.dropdownIcon} />
                                        Tin nhắn
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        onClick={() => router.push('/dashboard')}
                                        className={styles.dropdownItem}
                                    >
                                        <BsGear className={styles.dropdownIcon} />
                                        Thiết lập tài khoản
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout} className={styles.dropdownItem}>
                                        <BsBoxArrowRight className={styles.dropdownIcon} />
                                        Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Button
                                variant="link"
                                className={styles.loginButton}
                                onClick={() => setShowLoginModal(true)}
                            >
                                Đăng nhập
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            {isClient && (
                <>
                    <LoginModal
                        show={showLoginModal}
                        onHide={() => setShowLoginModal(false)}
                        onShowSignup={handleShowSignup}
                        onLogin={handleLogin}
                    />

                    <SignupModal
                        show={showSignupModal}
                        onHide={() => setShowSignupModal(false)}
                        onShowLogin={handleShowLogin}
                    />
                </>
            )}
        </>
    );
}