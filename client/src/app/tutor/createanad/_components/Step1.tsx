'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCalculator, FaBookOpen, FaGlobeAmericas, FaAtom, FaFlask, FaArrowLeft, FaSmile, FaCheck } from 'react-icons/fa';
import styles from './Step1.module.css';
import { FaLightbulb } from 'react-icons/fa';

// Danh sách 5 môn học
const subjects = [
  {
    id: 'math',
    name: 'Toán học',
    icon: <FaCalculator className={styles.subjectIcon} />,
  },
  {
    id: 'literature',
    name: 'Văn học',
    icon: <FaBookOpen className={styles.subjectIcon} />,
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    icon: <FaGlobeAmericas className={styles.subjectIcon} />,
  },
  {
    id: 'physics',
    name: 'Vật lý',
    icon: <FaAtom className={styles.subjectIcon} />,
  },
  {
    id: 'chemistry',
    name: 'Hóa học',
    icon: <FaFlask className={styles.subjectIcon} />,
  },
];

// Danh sách các lớp học
const grades = [
  { id: 'grade1', name: 'Lớp 1' },
  { id: 'grade2', name: 'Lớp 2' },
  { id: 'grade3', name: 'Lớp 3' },
  { id: 'grade4', name: 'Lớp 4' },
  { id: 'grade5', name: 'Lớp 5' },
  { id: 'grade6', name: 'Lớp 6' },
  { id: 'grade7', name: 'Lớp 7' },
  { id: 'grade8', name: 'Lớp 8' },
  { id: 'grade9', name: 'Lớp 9' },
  { id: 'grade10', name: 'Lớp 10' },
  { id: 'grade11', name: 'Lớp 11' },
  { id: 'grade12', name: 'Lớp 12' },
];

// Các bước trong luồng tạo quảng cáo
const steps = [
  { id: 1, label: 'Môn học & Lớp' },
  { id: 2, label: 'Tiêu đề & Mô tả' },
  { id: 3, label: 'Giới thiệu bài học' },
  { id: 4, label: 'Địa điểm dạy học' },
  { id: 5, label: 'Giá theo giờ' },
];

export default function Step1() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [showGradeSelection, setShowGradeSelection] = useState(false);

  const handleSubjectSelection = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setShowGradeSelection(true);
  };

  const toggleGradeSelection = (gradeId: string) => {
    setSelectedGrades((prevSelected) => {
      if (prevSelected.includes(gradeId)) {
        return prevSelected.filter((id) => id !== gradeId);
      } else {
        return [...prevSelected, gradeId];
      }
    });
  };

  const handleBackToSubjects = () => {
    setShowGradeSelection(false);
    setSelectedSubject(null);
    setSelectedGrades([]);
  };

  const handleContinue = () => {
    if (selectedSubject && selectedGrades.length > 0) {
      // Lưu môn học và lớp học đã chọn vào localStorage để sử dụng ở bước tiếp theo
      localStorage.setItem('selectedSubject', selectedSubject);
      localStorage.setItem('selectedGrades', JSON.stringify(selectedGrades));

      // Chuyển đến bước tiếp theo
      router.push('/tutor/createanad/step2');
    }
  };

  const getSelectedSubjectName = () => {
    if (!selectedSubject) return '';
    const subject = subjects.find(s => s.id === selectedSubject);
    return subject ? subject.name : '';
  };

  // Nội dung phần mô tả cho mỗi bước
  const renderInstructionContent = () => {
    if (!showGradeSelection) {
      // Mô tả cho bước chọn môn học
      return (
        <div className={styles.instructionContent}>
          <FaLightbulb className={styles.instructionIcon} />
          <h2 className={styles.instructionTitle}>Thông tin hữu ích</h2>
          <p className={styles.instructionText}>
            Chọn môn học mà bạn có chuyên môn và muốn giảng dạy.
            Bạn sẽ được kết nối với những học sinh đang tìm kiếm gia sư cho môn học này.
          </p>
          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              <strong>Lưu ý:</strong> Bạn chỉ có thể chọn một môn học tại một thời điểm.
              Sau khi hoàn thành quy trình này, bạn có thể thêm các môn học khác trong hồ sơ của mình.
            </p>
          </div>
        </div>
      );
    } else {
      // Mô tả cho bước chọn lớp học
      return (
        <div className={styles.instructionContent}>

          <FaLightbulb className={styles.instructionIcon} />
          <h2 className={styles.instructionTitle}>Thông tin hữu ích</h2>
          <p className={styles.instructionText}>
            Chọn các lớp học mà bạn muốn dạy cho môn <strong>{getSelectedSubjectName()}</strong>.
            Bạn có thể chọn nhiều lớp học khác nhau.
          </p>
          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              <strong>Lưu ý:</strong> Việc chọn nhiều lớp học sẽ giúp tăng cơ hội kết nối với học sinh,
              nhưng hãy đảm bảo bạn thực sự có kỹ năng và kinh nghiệm để giảng dạy cho các lớp đó.
            </p>
          </div>
        </div>
      );
    }
  };

  // Hiển thị thanh tiến trình các bước
  const renderProgressSteps = () => {
    return (
      <div className={styles.stepsProgress}>
        {steps.map((step) => (
          <div key={step.id} className={styles.step}>
            <div
              className={`${styles.stepCircle} ${step.id === 1 ? styles.active : ''
                }`}
            >
              {step.id === 1 ? '1' : step.id}
            </div>
            <div
              className={`${styles.stepLabel} ${step.id === 1 ? styles.active : ''
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
    <div className={styles.subjectSelection}>
      <Container fluid>
        <Row className={styles.selectionRow}>
          {/* Phần bên trái - Mô tả hướng dẫn */}
          <Col md={4} className={styles.instructionColumn}>
            {renderInstructionContent()}
          </Col>

          {/* Phần bên phải - Lựa chọn */}
          <Col md={8} className={styles.selectionColumn}>
            <div className={styles.selectionColumnContent}>
              {/* Hiển thị thanh tiến trình các bước */}
              {renderProgressSteps()}

              {!showGradeSelection ? (
                // Hiển thị màn hình chọn môn học
                <>
                  <div className={styles.header}>
                    <h1 className={styles.title}>Bước 1: Chọn môn học</h1>
                  </div>

                  <div className={styles.subjectsGrid}>
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className={styles.subjectCard}
                        onClick={() => handleSubjectSelection(subject.id)}
                      >
                        {subject.icon}
                        <h3 className={styles.subjectName}>{subject.name}</h3>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // Hiển thị màn hình chọn lớp học
                <>
                  <div className={styles.header}>
                    <h1 className={styles.title}>Bước 1.2: Chọn lớp học</h1>
                  </div>

                  <div className={`${styles.subjectsGrid} ${styles.gradesGrid}`}>
                    {grades.map((grade) => (
                      <div
                        key={grade.id}
                        className={`${styles.subjectCard} ${styles.gradeCard} ${selectedGrades.includes(grade.id) ? styles.selected : ''
                          }`}
                        onClick={() => toggleGradeSelection(grade.id)}
                      >
                        <h3 className={styles.subjectName}>{grade.name}</h3>
                      </div>
                    ))}
                  </div>

                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.backButton}
                      onClick={handleBackToSubjects}
                    >
                      <FaArrowLeft /> Quay lại
                    </button>
                    <button
                      className={styles.button}
                      disabled={selectedGrades.length === 0}
                      onClick={handleContinue}
                    >
                      Tiếp tục
                    </button>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}