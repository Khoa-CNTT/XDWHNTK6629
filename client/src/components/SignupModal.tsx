'use client'
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import styles from '../styles/SignupModal.module.css';

interface SignupModalProps {
    show: boolean;
    onHide: () => void;
    onShowLogin: () => void;
}

export default function SignupModal({ show, onHide, onShowLogin }: SignupModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onHide();
        };

        if (show) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [show, onHide]);

    const handleShowLogin = () => {
        onHide();
        onShowLogin();
    };

    if (!show) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onHide}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
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
            </div>
        </div>,
        document.body
    );
} 