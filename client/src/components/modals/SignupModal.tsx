'use client'
import { Modal } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import styles from './SignupModal.module.css';

interface SignupModalProps {
    show: boolean;
    onHide: () => void;
    onShowLogin: () => void;
}

export default function SignupModal({ show, onHide, onShowLogin }: SignupModalProps) {
    const handleShowLogin = () => {
        onHide();
        onShowLogin();
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
                <h2 className={styles.modalTitle}>Đăng ký</h2>
            </div>

            <div className={styles.modalBody}>
                <form onSubmit={e => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.signupButton}>
                        Đăng ký
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>hoặc</span>
                </div>

                <div className={styles.socialButtons}>
                    <button className={styles.socialButton}>
                        <FcGoogle size={20} />
                        <span>Đăng ký với Google</span>
                    </button>
                    <button className={styles.socialButton}>
                        <BsApple size={20} />
                        <span>Đăng ký với Apple</span>
                    </button>
                </div>

                <div className={styles.footer}>
                    <p>Đã có tài khoản?</p>
                    <button onClick={handleShowLogin} className={styles.loginLink}>
                        Đăng nhập
                    </button>
                    <p className={styles.terms}>
                        Bằng cách đăng ký qua email, Google hoặc Apple, bạn đồng ý với <a href="#">điều khoản sử dụng</a>
                    </p>
                </div>
            </div>
        </Modal>
    );
}