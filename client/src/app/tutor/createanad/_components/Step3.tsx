'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSmile, FaCheck, FaLightbulb } from 'react-icons/fa';
import styles from './Step3.module.css';


// Các bước trong luồng tạo quảng cáo
const steps = [
  { id: 1, label: 'Môn học & Lớp' },
  { id: 2, label: 'Tiêu đề & Mô tả' },
  { id: 3, label: 'Giới thiệu bài học' },
  { id: 4, label: 'Địa điểm dạy học' },
  { id: 5, label: 'Giá theo giờ' },
];

export default function Step3() {
  const router = useRouter();
  const [lessonDescription, setLessonDescription] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lấy thông tin đã nhập từ các bước trước
  useEffect(() => {
    // Kiểm tra nếu người dùng đã hoàn thành các bước trước đó
    // const storedSubject = localStorage.getItem('selectedSubject');
    // const storedTitle = localStorage.getItem('adTitle');

    // if (!storedSubject || !storedTitle) {
    //   // Nếu thiếu thông tin từ các bước trước, quay lại
    //   router.push('/tutor/createanad/step1');
    // }

    // Kiểm tra thông tin bài học đã lưu trước đó
    const storedLessonDescription = localStorage.getItem('lessonDescription');
    if (storedLessonDescription) {
      setLessonDescription(storedLessonDescription);
      countWords(storedLessonDescription);
    }
  }, [router]);

  const countWords = (text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
    return words;
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setLessonDescription(text);
    countWords(text);

    if (error && text.trim().length >= 40) {
      setError('');
    }
  };

  const handleBack = () => {
    // Lưu thông tin đã nhập để khi quay lại không bị mất
    localStorage.setItem('lessonDescription', lessonDescription);

    // Quay lại bước 2
    router.push('/tutor/createanad/step2');
  };

  const handleSubmit = () => {
    // const words = countWords(lessonDescription);

    // if (words < 40) {
    //   setError('Vui lòng nhập ít nhất 40 từ để giới thiệu về bài học của bạn');
    //   return;
    // }

    // Lưu thông tin về bài học
    localStorage.setItem('lessonDescription', lessonDescription);

    // Chuyển đến bước 4
    router.push('/tutor/createanad/step4');
  };

  const handleComplete = () => {
    // Điều hướng đến trang dashboard hoặc trang xác nhận
    router.push('/');
  };

  // Hiển thị thanh tiến trình các bước
  const renderProgressSteps = () => {
    return (
      <div className={styles.stepsProgress}>
        {steps.map((step) => (
          <div key={step.id} className={styles.step}>
            <div
              className={`${styles.stepCircle} ${step.id < 3 ? styles.completed : step.id === 3 ? styles.active : ''
                }`}
            >
              {step.id < 3 ? <FaLightbulb /> : step.id}
            </div>
            <div
              className={`${styles.stepLabel} ${step.id === 3 ? styles.active : ''
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
    <div className={styles.step3Container}>
      <Container fluid>
        <Row className={styles.contentRow}>
          {/* Phần bên trái - Mô tả hướng dẫn */}
          <Col md={4} className={styles.instructionColumn}>
            <div className={styles.instructionContent}>
              <FaLightbulb className={styles.instructionIcon} />

              <h2 className={styles.instructionTitle}>Thông tin hữu ích</h2>
              <p className={styles.instructionText}>
                Giải thích cách tiếp cận của bạn với vai trò gia sư và cách bạn chia sẻ kiến thức:
              </p>
              <ul className={styles.instructionList}>
                <li>- Phương pháp và kỹ thuật giảng dạy của bạn</li>
                <li>- Một kế hoạch bài học điển hình</li>
                <li>- Điều gì làm bạn trở nên khác biệt với tư cách là một gia sư</li>
                <li>- Bài học của bạn dành cho ai (trình độ, lớp học, đặc điểm cụ thể, v.v.)</li>
              </ul>

              <div className={styles.infoBox}>
                <p className={styles.infoText}>
                  <strong>LƯU Ý:</strong> Không đưa thông tin liên hệ hoặc URL vào nội dung của bạn.
                </p>
              </div>
            </div>
          </Col>

          {/* Phần bên phải - Form nhập liệu */}
          <Col md={8} className={styles.formColumn}>
            {/* Hiển thị thanh tiến trình các bước */}
            {renderProgressSteps()}

            <div className={styles.header}>
              <h1 className={styles.title}>Bước 3: Giới thiệu về bài học <span className={styles.highlight}>của bạn</span></h1>
              <p className={styles.subtitle}>(tối thiểu 40 từ)</p>
            </div>

            {!isSubmitted ? (
              <>
                <div className={styles.formGroup}>
                  <textarea
                    id="lessonDescription"
                    className={styles.formTextarea}
                    value={lessonDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Đây là lúc để thuyết phục học viên tương lai tại sao họ nên chọn học với bạn!"
                    rows={10}
                  ></textarea>
                  {error && <div className={styles.errorText}>{error}</div>}
                  <div className={styles.counter}>
                    <span className={wordCount < 40 ? styles.warning : ''}>
                      {wordCount}/40
                    </span>
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
                  Quay lại trang chủ
                </button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}