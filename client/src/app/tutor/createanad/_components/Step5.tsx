'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLightbulb, FaCheck, FaRegSmile, FaMoneyBillWave } from 'react-icons/fa';
import styles from './Step5.module.css';

// Các bước trong luồng tạo quảng cáo
const steps = [
  { id: 1, label: 'Môn học & Lớp' },
  { id: 2, label: 'Tiêu đề & Mô tả' },
  { id: 3, label: 'Giới thiệu bài học' },
  { id: 4, label: 'Địa điểm dạy học' },
  { id: 5, label: 'Giá theo giờ' },
];

export default function Step5() {
  const router = useRouter();
  const [hourlyRate, setHourlyRate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Lấy thông tin giá đã lưu trước đó (nếu có)
    const storedRate = localStorage.getItem('hourlyRate');
    if (storedRate) setHourlyRate(storedRate);
  }, []);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chỉ cho phép nhập số
    const value = e.target.value.replace(/[^0-9]/g, '');
    setHourlyRate(value);
  };

  const handleBack = () => {
    // Lưu thông tin đã nhập để khi quay lại không bị mất
    if (hourlyRate) localStorage.setItem('hourlyRate', hourlyRate);

    // Quay lại bước 4
    router.push('/tutor/createanad/step4');
  };

  const handleSubmit = () => {
    // Lưu thông tin giá theo giờ
    localStorage.setItem('hourlyRate', hourlyRate || '160000');

    // Đánh dấu đã hoàn thành
    setIsSubmitted(true);
  };

  const handleComplete = () => {
    // Điều hướng đến trang dashboard sau khi hoàn tất
    router.push('/tutor/dashboard');
  };

  // Hiển thị thanh tiến trình các bước
  const renderProgressSteps = () => {
    return (
      <div className={styles.stepsProgress}>
        {steps.map((step) => (
          <div key={step.id} className={styles.step}>
            <div
              className={`${styles.stepCircle} ${step.id < 5 ? styles.completed : step.id === 5 ? styles.active : ''
                }`}
            >
              {step.id < 5 ? <FaLightbulb /> : step.id}
            </div>
            <div
              className={`${styles.stepLabel} ${step.id === 5 ? styles.active : ''
                }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.step5Container}>
      <Container fluid>
        <Row className={styles.contentRow}>
          {/* Phần bên trái - Mô tả hướng dẫn */}
          <Col md={4} className={styles.instructionColumn}>
            <div className={styles.instructionContent}>
              <FaLightbulb className={styles.instructionIcon} />
              <h2 className={styles.instructionTitle}>Thông tin hữu ích</h2>
              <p className={styles.instructionText}>
                Bạn có thể tự do chọn mức giá theo giờ và thay đổi nó bất cứ lúc nào.
              </p>

              <p className={styles.instructionText}>
                Nếu bạn mới bắt đầu, bạn không nên chọn mức giá quá cao và hãy đợi đến khi có một số đánh giá và khuyến nghị để điều chỉnh mức giá.
              </p>

              <div className={styles.infoBox}>
                <p className={styles.infoText}>
                  <strong>Lưu ý:</strong> Mức giá phù hợp sẽ giúp bạn thu hút được nhiều học viên hơn khi mới bắt đầu.
                </p>
              </div>
            </div>
          </Col>

          {/* Phần bên phải - Form nhập liệu */}
          <Col md={8} className={styles.formColumn}>
            <div className={styles.formColumnContent}>
              {/* Hiển thị thanh tiến trình các bước */}
              {renderProgressSteps()}

              {!isSubmitted ? (
                <>
                  <div className={styles.header}>
                    <h1 className={styles.title}>Bước 5: <span className={styles.highlight}>Giá</span> theo giờ</h1>
                    <p className={styles.subtitle}>
                      Lưu ý: Mức giá trung bình cho các buổi học tiếng Anh tại Việt Nam là 160.000 VND/giờ
                    </p>
                  </div>

                  {/* Phần nhập giá */}
                  <div className={styles.formSection}>
                    <div className={styles.priceInputContainer}>
                      <input
                        type="text"
                        className={styles.priceInput}
                        value={hourlyRate}
                        onChange={handleRateChange}
                        placeholder="160000"
                      />
                      <span className={styles.priceUnit}>VND/giờ</span>
                    </div>
                  </div>

                  <div className={styles.navButtons}>
                    <button
                      className={styles.backButton}
                      onClick={handleBack}
                    >
                      Quay lại
                    </button>
                    <button
                      className={styles.nextButton}
                      onClick={handleSubmit}
                    >
                      Hoàn tất
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.submitSuccessMessage}>
                  <div className={styles.submitSuccessIcon}>
                    <FaRegSmile />
                  </div>
                  <h2 className={styles.submitSuccessTitle}>Đăng ký thành công!</h2>
                  <p className={styles.submitSuccessText}>
                    Cảm ơn bạn đã đăng ký làm gia sư trên nền tảng của chúng tôi.
                    Hồ sơ gia sư của bạn đã được tạo thành công và sẽ được xét duyệt trong vòng 24 giờ.
                  </p>
                  <button
                    className={styles.nextButton}
                    onClick={handleComplete}
                  >
                    Đến trang quản lý
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}