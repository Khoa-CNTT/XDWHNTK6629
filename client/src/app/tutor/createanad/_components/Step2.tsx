'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLightbulb, FaCheck } from 'react-icons/fa';
import styles from './Step2.module.css';

// Các bước trong luồng tạo quảng cáo
const steps = [
  { id: 1, label: 'Môn học & Lớp' },
  { id: 2, label: 'Tiêu đề & Mô tả' },
  { id: 3, label: 'Giới thiệu bài học' },
  { id: 4, label: 'Địa điểm dạy học' },
  { id: 5, label: 'Giá theo giờ' },
];

export default function Step2() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  // Lấy thông tin đã chọn từ bước 1
  useEffect(() => {
    const storedSubject = localStorage.getItem('selectedSubject');
    const storedGrades = localStorage.getItem('selectedGrades');

    if (storedSubject) {
      setSelectedSubject(storedSubject);
    } else {
      // Nếu không có thông tin đã chọn, quay lại bước 1
      router.push('/tutor/createanad/step1');
    }

    if (storedGrades) {
      setSelectedGrades(JSON.parse(storedGrades));
    }

    // Kiểm tra tiêu đề mô tả đã lưu trước đó
    const storedTitle = localStorage.getItem('adTitle');
    const storedDescription = localStorage.getItem('adDescription');

    if (storedTitle) {
      setTitle(storedTitle);
    }

    if (storedDescription) {
      setDescription(storedDescription);
    }
  }, [router]);

  // Lấy tên môn học từ ID
  const getSubjectName = (subjectId: string) => {
    const subjectMap: { [key: string]: string } = {
      'math': 'Toán học',
      'literature': 'Văn học',
      'english': 'Tiếng Anh',
      'physics': 'Vật lý',
      'chemistry': 'Hóa học',
    };

    return subjectMap[subjectId] || 'Môn học';
  };

  // Lấy tên lớp từ ID
  const getGradeName = (gradeId: string) => {
    const gradeNumber = gradeId.replace('grade', '');
    return `Lớp ${gradeNumber}`;
  };

  const validateTitle = () => {
    // if (title.trim() === '') {
    //   setTitleError('Vui lòng nhập tiêu đề quảng cáo');
    //   return false;
    // }

    // if (title.length < 10) {
    //   setTitleError('Tiêu đề quá ngắn, vui lòng nhập ít nhất 10 ký tự');
    //   return false;
    // }

    // if (title.length > 100) {
    //   setTitleError('Tiêu đề quá dài, vui lòng nhập tối đa 100 ký tự');
    //   return false;
    // }

    setTitleError('');
    return true;
  };

  const validateDescription = () => {
    // if (description.trim() === '') {
    //   setDescriptionError('Vui lòng nhập mô tả quảng cáo');
    //   return false;
    // }

    // if (description.length < 50) {
    //   setDescriptionError('Mô tả quá ngắn, vui lòng nhập ít nhất 50 ký tự');
    //   return false;
    // }

    // if (description.length > 1000) {
    //   setDescriptionError('Mô tả quá dài, vui lòng nhập tối đa 1000 ký tự');
    //   return false;
    // }

    setDescriptionError('');
    return true;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) validateTitle();
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (descriptionError) validateDescription();
  };

  const handleBack = () => {
    // Lưu thông tin đã nhập để khi quay lại không bị mất
    localStorage.setItem('adTitle', title);
    localStorage.setItem('adDescription', description);

    // Quay lại bước 1
    router.push('/tutor/createanad/step1');
  };

  const handleContinue = () => {
    // Lưu thông tin đã nhập
    localStorage.setItem('adTitle', title);
    localStorage.setItem('adDescription', description);

    // Chuyển đến bước tiếp theo
    router.push('/tutor/createanad/step3');
  };

  // Hiển thị thanh tiến trình các bước
  const renderProgressSteps = () => {
    return (
      <div className={styles.stepsProgress}>
        {steps.map((step) => (
          <div key={step.id} className={styles.step}>
            <div
              className={`${styles.stepCircle} ${step.id < 2 ? styles.completed : step.id === 2 ? styles.active : ''
                }`}
            >
              {step.id < 2 ? <FaCheck /> : step.id}
            </div>
            <div
              className={`${styles.stepLabel} ${step.id === 2 ? styles.active : ''
                }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Tạo gợi ý tiêu đề tự động dựa trên môn học và lớp đã chọn
  const generateTitleSuggestion = () => {
    if (!selectedSubject) return '';

    const subjectName = getSubjectName(selectedSubject);
    let gradeText = '';

    if (selectedGrades && selectedGrades.length > 0) {
      if (selectedGrades.length === 1) {
        gradeText = getGradeName(selectedGrades[0]);
      } else if (selectedGrades.length === 2) {
        gradeText = `${getGradeName(selectedGrades[0])} và ${getGradeName(selectedGrades[1])}`;
      } else {
        gradeText = `${getGradeName(selectedGrades[0])} đến ${getGradeName(selectedGrades[selectedGrades.length - 1])}`;
      }
    }

    return `Gia sư ${subjectName} kinh nghiệm chuyên dạy ${gradeText}`;
  };

  const handleUseDefaultTitle = () => {
    const defaultTitle = generateTitleSuggestion();
    setTitle(defaultTitle);
    setTitleError('');
  };

  return (
    <div className={styles.step2Container}>
      <Container fluid>
        <Row className={styles.contentRow}>
          {/* Phần bên trái - Mô tả hướng dẫn */}
          <Col md={4} className={styles.instructionColumn}>
            <div className={styles.instructionContent}>
              <FaLightbulb className={styles.instructionIcon} />
              <h2 className={styles.instructionTitle}>Thông tin hữu ích</h2>
              <p className={styles.instructionText}>
                Tiêu đề và mô tả hấp dẫn sẽ giúp học sinh dễ dàng tìm thấy bạn. Hãy nêu bật trình độ, kinh nghiệm và phong cách giảng dạy của bạn.
              </p>
              <div className={styles.infoBox}>
                <p className={styles.infoText}>
                  <strong>Lưu ý:</strong> Một tiêu đề tốt thường bao gồm môn học, trình độ chuyên môn và đối tượng dạy.
                  Mô tả nên chứa phương pháp giảng dạy, kinh nghiệm và thành tích của bạn.
                </p>
              </div>
            </div>
          </Col>

          {/* Phần bên phải - Form nhập liệu */}
          <Col md={8} className={styles.formColumn}>
            <div className={styles.formColumnContent}>
              {/* Hiển thị thanh tiến trình các bước */}
              {renderProgressSteps()}

              <div className={styles.header}>
                <h1 className={styles.title}>Bước 2: Tiêu đề & Mô tả Quảng Cáo</h1>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="adTitle" className={styles.formLabel}>Tiêu đề quảng cáo</label>
                <input
                  type="text"
                  id="adTitle"
                  className={styles.formInput}
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Ví dụ: Gia sư Toán có 5 năm kinh nghiệm dạy học sinh cấp 2"
                  maxLength={100}
                />
                {titleError && <div className={styles.errorText}>{titleError}</div>}
                <div className={styles.counter}>
                  <span className={title.length > 90 ? styles.warning : ''}>
                    {title.length}/100
                  </span>
                </div>
                <div className={styles.hint}>
                  Bạn có thể sử dụng{' '}
                  <button
                    type="button"
                    onClick={handleUseDefaultTitle}
                    style={{ background: 'none', border: 'none', color: '#e53e3e', textDecoration: 'underline', padding: 0, cursor: 'pointer' }}
                  >
                    tiêu đề gợi ý
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="adDescription" className={styles.formLabel}>Mô tả quảng cáo</label>
                <textarea
                  id="adDescription"
                  className={styles.formTextarea}
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Mô tả kinh nghiệm, phương pháp giảng dạy và điểm mạnh của bạn..."
                  rows={6}
                  maxLength={1000}
                ></textarea>
                {descriptionError && <div className={styles.errorText}>{descriptionError}</div>}
                <div className={styles.counter}>
                  <span className={description.length > 900 ? styles.warning : ''}>
                    {description.length}/1000
                  </span>
                </div>
                <div className={styles.hint}>
                  Nên đề cập đến: trình độ học vấn, kinh nghiệm giảng dạy, phương pháp dạy học, thành tích học sinh của bạn.
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
                  onClick={handleContinue}

                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}