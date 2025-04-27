'use client'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { BsCamera, BsPersonCircle, BsGeoAlt, BsKey, BsEyeSlash, BsEye } from 'react-icons/bs';
import styles from './Dashboard.module.css';
import Image from 'next/image';

export default function Dashboard() {
    const [userData, setUserData] = useState({
        firstName: 'Nguyễn',
        lastName: 'Nam',
        email: 'tranhuu.loi1@dtu.edu.vn',
        phone: '',
        skype: '',
        googleMeetId: '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle image upload logic here
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Saving user data:', userData);
    };

    const handleCancel = () => {
        // Reset form or navigate back
        console.log('Canceling changes');
    };

    const togglePasswordSection = () => {
        setShowPasswordSection(!showPasswordSection);
        // Reset password fields and messages when toggling
        if (!showPasswordSection) {
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setPasswordError('');
            setPasswordSuccess('');
        }
    };

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData({
            ...passwordData,
            [field]: value
        });
        // Clear errors when typing
        setPasswordError('');
    };

    const validatePassword = () => {
        if (passwordData.newPassword.length < 8) {
            setPasswordError('Mật khẩu mới phải có ít nhất 8 ký tự');
            return false;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('Xác nhận mật khẩu không khớp');
            return false;
        }

        return true;
    };

    const handleSavePassword = () => {
        if (validatePassword()) {
            // Here you would normally call an API to update the password
            console.log('Updating password:', passwordData);
            setPasswordSuccess('Mật khẩu đã được cập nhật thành công!');
            
            // Reset password fields after successful change
            setTimeout(() => {
                setShowPasswordSection(false);
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setPasswordSuccess('');
            }, 3000);
        }
    };

    return (
        <div className={styles.settingsPage}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className={styles.settingsContainer}>
                            {/* General Information Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <BsPersonCircle className={styles.sectionIcon} />
                                    Thông tin chung
                                </h2>
                                <div className={styles.sectionContent}>
                                    <Row>
                                        <Col md={4}>
                                            <div className={styles.avatarSection}>
                                                <div className={styles.avatarWrapper}>
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                                                        alt="Profile"
                                                        width={200}
                                                        height={200}
                                                        className={styles.avatar}
                                                    />
                                                    <label htmlFor="avatar-upload" className={styles.uploadButton}>
                                                        <BsCamera />
                                                        <input
                                                            type="file"
                                                            id="avatar-upload"
                                                            hidden
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={8}>
                                            <Form>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Họ</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={userData.firstName}
                                                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Tên</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={userData.lastName}
                                                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        value={userData.email}
                                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </section>

                            {/* Contact Information Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <BsGeoAlt className={styles.sectionIcon} />
                                    Thông tin liên hệ
                                </h2>
                                <div className={styles.sectionContent}>
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        value={userData.phone}
                                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                        placeholder="Nhập số điện thoại"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Skype</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={userData.skype}
                                                        onChange={(e) => setUserData({ ...userData, skype: e.target.value })}
                                                        placeholder="Nhập ID Skype"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Google Meet ID</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={userData.googleMeetId}
                                                        onChange={(e) => setUserData({ ...userData, googleMeetId: e.target.value })}
                                                        placeholder="Nhập Google Meet ID"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </section>

                            {/* Password Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <BsKey className={styles.sectionIcon} />
                                    Đổi mật khẩu
                                </h2>
                                <div className={styles.sectionContent}>
                                    {!showPasswordSection ? (
                                        <Button 
                                            variant="danger" 
                                            className={styles.changePasswordButton}
                                            onClick={togglePasswordSection}
                                        >
                                            Đổi mật khẩu
                                        </Button>
                                    ) : (
                                        <div className={styles.passwordSection}>
                                            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                                            {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
                                            
                                            <Form>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                                                    <div className={styles.passwordInput}>
                                                        <Form.Control
                                                            type={showCurrentPassword ? "text" : "password"}
                                                            value={passwordData.currentPassword}
                                                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                                            placeholder="Nhập mật khẩu hiện tại"
                                                        />
                                                        <Button 
                                                            variant="link" 
                                                            className={styles.eyeButton}
                                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        >
                                                            {showCurrentPassword ? <BsEyeSlash /> : <BsEye />}
                                                        </Button>
                                                    </div>
                                                </Form.Group>
                                                
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mật khẩu mới</Form.Label>
                                                    <div className={styles.passwordInput}>
                                                        <Form.Control
                                                            type={showNewPassword ? "text" : "password"}
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                                            placeholder="Nhập mật khẩu mới"
                                                        />
                                                        <Button 
                                                            variant="link" 
                                                            className={styles.eyeButton}
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                        >
                                                            {showNewPassword ? <BsEyeSlash /> : <BsEye />}
                                                        </Button>
                                                    </div>
                                                    <Form.Text className="text-muted">
                                                        Mật khẩu phải có ít nhất 8 ký tự.
                                                    </Form.Text>
                                                </Form.Group>
                                                
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                                                    <div className={styles.passwordInput}>
                                                        <Form.Control
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            value={passwordData.confirmPassword}
                                                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                                            placeholder="Nhập lại mật khẩu mới"
                                                        />
                                                        <Button 
                                                            variant="link" 
                                                            className={styles.eyeButton}
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                                        </Button>
                                                    </div>
                                                </Form.Group>
                                                
                                                <div className={styles.passwordButtons}>
                                                    <Button 
                                                        variant="outline-secondary" 
                                                        onClick={togglePasswordSection}
                                                        className="me-2"
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button 
                                                        variant="success" 
                                                        onClick={handleSavePassword}
                                                    >
                                                        Lưu mật khẩu mới
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Form Actions */}
                            <section className={styles.section}>
                                <div className={styles.formActions}>
                                    <Button
                                        variant="outline-secondary"
                                        className={styles.cancelButton}
                                        onClick={handleCancel}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant="success"
                                        className={styles.saveButton}
                                        onClick={handleSave}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}