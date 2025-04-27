'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLightbulb, FaHome, FaLaptop, FaCheck, FaInfoCircle } from 'react-icons/fa';
import styles from './Step4.module.css';

// Các bước trong luồng tạo quảng cáo
const steps = [
  { id: 1, label: 'Môn học & Lớp' },
  { id: 2, label: 'Tiêu đề & Mô tả' },
  { id: 3, label: 'Giới thiệu bài học' },
  { id: 4, label: 'Địa điểm dạy học' },
  { id: 5, label: 'Giá theo giờ' },
];

// Các lựa chọn địa điểm dạy học
const locationOptions = [
  {
    id: 'your_home',
    label: 'Tại nhà bạn',
    icon: <FaHome />,
    description: 'Học viên sẽ đến nhà bạn để học'
  },
  {
    id: 'online',
    label: 'Trực tuyến (Online)',
    icon: <FaLaptop />,
    description: 'Dạy học qua các nền tảng trực tuyến'
  },
];

export default function Step4() {
  const router = useRouter();
  const [location, setLocation] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    // Kiểm tra nếu người dùng đã hoàn thành các bước trước đó
    // const storedSubject = localStorage.getItem('selectedSubject');
    // const storedTitle = localStorage.getItem('adTitle');
    // const storedDescription = localStorage.getItem('lessonDescription');

    // if (!storedSubject || !storedTitle || !storedDescription) {
    //   // Nếu thiếu thông tin từ các bước trước, quay lại
    //   router.push('/tutor/createanad/step1');
    // }

    // Kiểm tra thông tin địa điểm đã lưu trước đó
    const storedLocation = localStorage.getItem('teachingLocation');
    const storedAddress = localStorage.getItem('teachingAddress');

    if (storedLocation) {
      setLocation(storedLocation);
    }

    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, [router]);

  const handleLocationSelect = (locationId: string) => {
    setLocation(locationId);
  };

  const handleBack = () => {
    // Lưu thông tin đã nhập để khi quay lại không bị mất
    if (location) {
      localStorage.setItem('teachingLocation', location);
    }

    // Quay lại bước 3
    router.push('/tutor/createanad/step3');
  };

  const handleSubmit = () => {
    // Lưu thông tin địa điểm
    localStorage.setItem('teachingLocation', location || '');
    localStorage.setItem('teachingAddress', address);

    // Chuyển đến bước 5 thay vì đánh dấu hoàn thành
    router.push('/tutor/createanad/step5');
  };

  const handleComplete = () => {
    // Điều hướng đến trang dashboard hoặc trang xác nhận
    router.push('/tutor/dashboard');
  };

  // Hiển thị thanh tiến trình các bước
  const renderProgressSteps = () => {
    return (
      <div className={styles.stepsProgress}>
        {steps.map((step) => (
          <div key={step.id} className={styles.step}>
            <div
              className={`${styles.stepCircle} ${step.id < 4 ? styles.completed : step.id === 4 ? styles.active : ''
                }`}
            >
              {step.id < 4 ? <FaLightbulb /> : step.id}
            </div>
            <div
              className={`${styles.stepLabel} ${step.id === 4 ? styles.active : ''
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
    <div className={styles.step4Container}>
      <Container fluid>
        <Row className={styles.contentRow}>
          {/* Phần bên trái - Mô tả hướng dẫn */}
          <Col md={4} className={styles.instructionColumn}>
            <div className={styles.instructionContent}>
              <FaLightbulb className={styles.instructionIcon} />
              <h2 className={styles.instructionTitle}>Thông tin hữu ích</h2>
              <p className={styles.instructionText}>
                Địa chỉ của bạn sẽ không xuất hiện trên trang web. Nó sẽ chỉ được chia sẻ với học viên mà bạn đã đồng ý dạy học.
              </p>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <FaHome />
                </div>
                <p className={styles.infoText}>
                  Bạn có thể dạy học tại nhà của bạn ở địa chỉ đã đăng ký
                </p>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <FaLaptop />
                </div>
                <p className={styles.infoText}>
                  Dạy học trực tuyến qua các nền tảng video call
                </p>
              </div>

              <div className={styles.infoBox}>
                <p className={styles.infoBoxText}>
                  <strong>Lưu ý:</strong> Việc lựa chọn hình thức dạy học linh hoạt sẽ giúp bạn tiếp cận được nhiều học viên hơn.
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
                    <h1 className={styles.title}>
                      Bước 4: <span className={styles.highlight}>Địa điểm</span> dạy học
                    </h1>
                    <p className={styles.subtitle}>Nơi diễn ra buổi học của bạn</p>
                  </div>

                  {/* <div className={styles.locationInput}>
                    <span className={styles.locationIcon}>
                      <FaMapMarkedAlt />
                    </span>
                    <span className={styles.locationText}>{address}</span>
                  </div> */}

                  <div className={styles.optionsContainer}>
                    <h3 className={styles.optionTitle}>Bạn sẽ dạy học ở đâu?</h3>

                    {locationOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`${styles.locationOption} ${location === option.id ? styles.selected : ''}`}
                        onClick={() => handleLocationSelect(option.id)}
                      >
                        <div className={styles.locationOptionContent}>
                          <span className={styles.locationOptionIcon}>
                            {option.icon}
                          </span>
                          <span className={styles.locationOptionText}>
                            {option.label}
                          </span>
                        </div>

                        {location === option.id && (
                          <span className={styles.checkIcon}>
                            <FaCheck />
                          </span>
                        )}
                      </div>
                    ))}
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
                      Tiếp tục
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.submitSuccessMessage}>
                  <div className={styles.submitSuccessIcon}>
                    <FaCheck />
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