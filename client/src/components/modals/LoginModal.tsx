'use client'
import { Modal } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    show: boolean;
    onHide: () => void;
    onShowSignup: () => void;
    onLogin?: () => void;
}

export default function LoginModal({ show, onHide, onShowSignup, onLogin }: LoginModalProps) {
    const handleShowSignup = () => {
        onHide();
        onShowSignup();
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (onLogin) onLogin();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            contentClassName={styles.modalContent}
            backdropClassName={styles.modalBackdrop}
            dialogClassName={styles.modalDialog}
        >
            <button className={styles.closeButton} onClick={onHide}>
                ×
            </button>

            <div className={styles.modalHeader}>
                <div className={styles.logo}>S</div>
                <h2 className={styles.modalTitle}>Đăng nhập</h2>
            </div>

            <div className={styles.modalBody}>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        Đăng nhập
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>hoặc</span>
                </div>

                <div className={styles.socialButtons}>
                    <button className={styles.socialButton}>
                        <FcGoogle size={20} />
                        <span>Đăng nhập với Google</span>
                    </button>
                    <button className={styles.socialButton}>
                        <BsApple size={20} />
                        <span>Đăng nhập với Apple</span>
                    </button>
                </div>

                <div className={styles.footer}>
                    <p>Chưa có tài khoản?</p>
                    <button onClick={handleShowSignup} className={styles.signupLink}>
                        Đăng ký
                    </button>
                </div>
            </div>
        </Modal>
    );
}