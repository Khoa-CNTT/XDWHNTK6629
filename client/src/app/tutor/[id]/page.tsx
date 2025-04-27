'use client';
import { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { RequireRole } from '@/components/ui';
import { useCurrentUser, useUserWithRole } from '@/hooks/useCurrentUser';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './TutorDetail.module.css';

export default function TutorDetailPage({ params }: { params: { id: string } }) {
    const [showMore, setShowMore] = useState(false);
    const [showMoreLesson, setShowMoreLesson] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Trong môi trường thực tế, sử dụng useCurrentUser() thay vì useUserWithRole()
    // const user = useCurrentUser();
    const user = useUserWithRole('student'); // Thay đổi giá trị để test các vai trò khác nhau

    // Mock data - trong ứng dụng thực tế sẽ lấy từ API
    const tutor = {
        id: params.id,
        name: 'Emily',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        title: 'Giáo viên Tiếng Anh IELTS & TOEIC',
        rating: 5,
        totalReviews: 128,
        totalStudents: 75,
        hourlyRate: 350000,
        responseTime: '1h',
        location: 'Trực tuyến',
        tags: ['IELTS', 'TOEIC', 'Tiếng Anh giao tiếp', 'Ngữ pháp', 'Phát âm'],
        about: `Xin chào!

Tôi là Emily, giáo viên tiếng Anh với hơn 7 năm kinh nghiệm giảng dạy cho sinh viên và người đi làm. Tôi tốt nghiệp Đại học Cambridge với bằng Cử nhân ngành Ngôn ngữ Anh và có chứng chỉ CELTA (Certificate in Teaching English to Speakers of Other Languages).

Bên cạnh việc giảng dạy, tôi từng làm biên dịch và phiên dịch cho nhiều công ty đa quốc gia, giúp tôi hiểu rõ những khó khăn thực tế khi sử dụng tiếng Anh trong môi trường công việc.

Tôi đặc biệt giỏi trong việc giảng dạy IELTS và TOEIC, với phương pháp đã giúp học viên của tôi đạt điểm số cao (IELTS 7.0+ và TOEIC 850+). Tôi cũng có kinh nghiệm giảng dạy tiếng Anh giao tiếp, giúp học viên tự tin trong các tình huống hàng ngày và công việc.

Tôi tin rằng việc học ngôn ngữ nên là một trải nghiệm thú vị và thực tế. Phương pháp giảng dạy của tôi tập trung vào việc áp dụng ngôn ngữ vào các tình huống thực tế, giúp học viên không chỉ nắm vững ngữ pháp mà còn biết cách sử dụng ngôn ngữ một cách tự nhiên và hiệu quả.`,
        aboutLesson: `Các buổi học của tôi được thiết kế phù hợp với mục tiêu và trình độ của từng học viên, dù bạn đang chuẩn bị cho kỳ thi IELTS/TOEIC hay chỉ muốn cải thiện kỹ năng giao tiếp.

Phương pháp giảng dạy của tôi:
- Phân tích kỹ điểm mạnh và điểm yếu của học viên để xây dựng lộ trình học tập hiệu quả
- Sử dụng tài liệu đa dạng và cập nhật, bao gồm báo chí, podcast, video và các tài liệu học thuật
- Tạo môi trường học tập thoải mái nhưng thử thách, khuyến khích học viên sử dụng tiếng Anh tối đa
- Cung cấp phản hồi chi tiết và bài tập phù hợp để học viên có thể tiếp tục học tập giữa các buổi học

Về cấu trúc buổi học:
Mỗi buổi học kéo dài 90 phút và thường bao gồm:
1. Ôn tập và kiểm tra kiến thức đã học (15 phút)
2. Giới thiệu và thực hành kiến thức mới (45 phút)
3. Hoạt động áp dụng thực tế (20 phút)
4. Tổng kết và giao bài tập về nhà (10 phút)`,
        ambassador: true,
        headline: "Nâng cao kỹ năng tiếng Anh với phương pháp hiệu quả và thực tế. Chuyên luyện thi IELTS, TOEIC và tiếng Anh giao tiếp cho công việc và cuộc sống!",
        features: {
            hourlyRate: "350.000đ",
            responseTime: "1h",
            numberOfStudents: "75+"
        }
    };

    // Mock data cho các gia sư khác
    const otherTutors = [
        {
            id: '101',
            name: 'Michael',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
            location: 'Hà Nội & Trực tuyến',
            isNew: true,
            hourlyRate: 300000,
            firstLessonFree: true
        },
        {
            id: '102',
            name: 'Sophie',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
            location: 'TP.HCM',
            isNew: true,
            hourlyRate: 320000,
            firstLessonFree: true
        },
        {
            id: '103',
            name: 'David',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
            location: 'TP.HCM & Trực tuyến',
            isNew: false,
            hourlyRate: 280000,
            firstLessonFree: true
        },
        {
            id: '104',
            name: 'Linda',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
            location: 'Hà Nội & Trực tuyến',
            isNew: true,
            hourlyRate: 350000,
            firstLessonFree: true
        },
        {
            id: '105',
            name: 'Robert',
            avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&h=200&fit=crop',
            location: 'Đà Nẵng',
            isNew: false,
            hourlyRate: 290000,
            firstLessonFree: true
        }
    ];

    const handlePrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            if (sliderRef.current) {
                const cardWidth = sliderRef.current.querySelector('div')?.offsetWidth || 0;
                sliderRef.current.scrollLeft -= cardWidth + 16; // 16 là khoảng cách giữa các card
            }
        }
    };

    const handleNext = () => {
        if (currentSlide < otherTutors.length - 4) {
            setCurrentSlide(currentSlide + 1);
            if (sliderRef.current) {
                const cardWidth = sliderRef.current.querySelector('div')?.offsetWidth || 0;
                sliderRef.current.scrollLeft += cardWidth + 16; // 16 là khoảng cách giữa các card
            }
        }
    };

    return (
        <Container fluid className={`py-5 ${styles.tutorDetailPage}`}>
            {/* Badges/Tags */}
            <Container>
                <div className={styles.tags}>
                    {tutor.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </Container>

            {/* Main Headline */}
            <Container>
                <div className={styles.headline}>
                    <h1>{tutor.headline}</h1>
                </div>
            </Container>

            {/* Main content area */}
            <Container>
                <Row>
                    {/* Left content */}
                    <Col lg={8}>
                        {/* Lesson location */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Địa điểm dạy</h2>
                            <div className={styles.locationBadge}>
                                <span className={styles.badgeIcon}>🌐</span> {tutor.location}
                            </div>
                        </section>
                        
                        {/* Ambassador badge */}
                        {tutor.ambassador && (
                            <section className={styles.ambassadorSection}>
                                <div className={styles.ambassadorBadge}>
                                    <span className={styles.badgeIcon}>🌟</span> Gia sư nổi bật
                                </div>
                                <p className={styles.ambassadorText}>
                                    Một trong những gia sư tốt nhất của chúng tôi. Hồ sơ chất lượng, kinh nghiệm trong lĩnh vực, bằng cấp được xác minh và thời gian phản hồi nhanh chóng. {tutor.name} sẽ rất vui khi sắp xếp buổi học {tutor.tags[0]} đầu tiên của bạn.
                                </p>
                            </section>
                        )}

                        {/* About tutor */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Về {tutor.name}</h2>
                            <div className={styles.aboutContent}>
                                <div className={showMore ? styles.fullText : styles.truncatedText}>
                                    {tutor.about.split('\n').map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                                <Button 
                                    variant="link" 
                                    className={styles.seeMoreButton} 
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? 'Rút gọn' : 'Xem thêm'} ▼
                                </Button>
                            </div>
                        </section>

                        {/* About the lesson */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Về buổi học</h2>
                            <div className={styles.lessonOptions}>
                                <span className={styles.levelBadge}>Mọi cấp độ</span>
                                <span className={styles.languageBadge}>Tiếng Việt & Tiếng Anh</span>
                            </div>
                            <div className={styles.aboutContent}>
                                <div className={showMoreLesson ? styles.fullText : styles.truncatedText}>
                                    {tutor.aboutLesson.split('\n').map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                                <Button 
                                    variant="link" 
                                    className={styles.seeMoreButton} 
                                    onClick={() => setShowMoreLesson(!showMoreLesson)}
                                >
                                    {showMoreLesson ? 'Rút gọn' : 'Xem thêm'} ▼
                                </Button>
                            </div>
                        </section>
                    </Col>

                    {/* Right sidebar */}
                    <Col lg={4}>
                        <div className={styles.sidebar}>
                            {/* Tutor profile card */}
                            <Card className={styles.profileCard}>
                                <div className={styles.profileHeader}>
                                    <div className={styles.avatarContainer}>
                                        <Image
                                            src={tutor.avatar}
                                            alt={tutor.name}
                                            width={120}
                                            height={120}
                                            className={styles.avatar}
                                        />
                                    </div>
                                    <div className={styles.tutorInfo}>
                                        <h2 className={styles.tutorName}>{tutor.name}</h2>
                                        <div className={styles.tutorRating}>
                                            <span className={styles.stars}>{'★'.repeat(Math.round(tutor.rating))}</span>
                                            <span className={styles.reviewCount}>({tutor.totalReviews} đánh giá)</span>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <Button variant="outline-secondary" className={styles.favoriteButton}>
                                            ♡
                                        </Button>
                                        <Button variant="outline-secondary" className={styles.shareButton}>
                                            ↗
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className={styles.tutorFeatures}>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureLabel}>Giá mỗi giờ</div>
                                        <div className={styles.featureValue}>{tutor.hourlyRate.toLocaleString()}đ</div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureLabel}>Thời gian phản hồi</div>
                                        <div className={styles.featureValue}>{tutor.responseTime}</div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureLabel}>Số học viên</div>
                                        <div className={styles.featureValue}>{tutor.totalStudents}+</div>
                                    </div>
                                </div>

                                <div className={styles.contactContainer}>
                                    <Button variant="primary" className={styles.contactButton}>
                                        <span className={styles.contactIcon}>💬</span> Liên hệ
                                    </Button>
                                </div>
                                
                                <div className={styles.firstLessonFree}>
                                    <span className={styles.freeLabel}>Buổi học đầu tiên miễn phí</span>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Other tutors section */}
            <Container className="mt-5">
                <div className={styles.otherTutorsHeader}>
                    <h2 className={styles.otherTutorsTitle}>Những gia sư tiếng Anh khác</h2>
                    <div className={styles.sliderControls}>
                        <span className={styles.slideCount}>{currentSlide + 1}/{Math.min(otherTutors.length, 5)}</span>
                        <Button 
                            variant="light"
                            className={styles.sliderButton}
                            onClick={handlePrevious}
                            disabled={currentSlide === 0}
                        >
                            <BsChevronLeft />
                        </Button>
                        <Button 
                            variant="light"
                            className={styles.sliderButton}
                            onClick={handleNext}
                            disabled={currentSlide >= otherTutors.length - 4}
                        >
                            <BsChevronRight />
                        </Button>
                    </div>
                </div>

                <div className={styles.tutorCarousel} ref={sliderRef}>
                    {otherTutors.map((otherTutor) => (
                        <div key={otherTutor.id} className={styles.tutorCard}>
                            <Link href={`/tutor/${otherTutor.id}`} className={styles.tutorCardLink}>
                                <div className={styles.tutorCardImage}>
                                    <Image 
                                        src={otherTutor.avatar}
                                        alt={otherTutor.name}
                                        width={200}
                                        height={200}
                                        className={styles.tutorCardAvatar}
                                    />
                                </div>
                                <div className={styles.tutorCardContent}>
                                    <h3 className={styles.tutorCardName}>{otherTutor.name}</h3>
                                    <p className={styles.tutorCardLocation}>{otherTutor.location}</p>
                                    
                                    <div className={styles.tutorCardFooter}>
                                        {otherTutor.isNew && (
                                            <span className={styles.newBadge}>Mới</span>
                                        )}
                                        <div className={styles.tutorCardPrice}>
                                            <span className={styles.price}>{otherTutor.hourlyRate.toLocaleString()}đ/h</span>
                                            {otherTutor.firstLessonFree && (
                                                <span className={styles.firstFree}>Buổi đầu miễn phí</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </Container>
    );
}